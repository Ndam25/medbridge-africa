const { createClient } = require("@supabase/supabase-js");
const safe = (s, max=10000) => (typeof s === "string" ? s.slice(0,max) : s==null ? "" : String(s).slice(0,max));

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return { statusCode: 200, headers:{'content-type':'application/json'},
      body: JSON.stringify({ ok:true, note:'eligibility API alive' }) };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok:false, error:'METHOD_NOT_ALLOWED' }) };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { statusCode:500, body: JSON.stringify({ ok:false, error:'ENV_MISSING' }) };

  let p = {};
  try { p = JSON.parse(event.body || "{}"); } catch { return { statusCode:400, body: JSON.stringify({ ok:false, error:'BAD_JSON' }) } }

  // Champs de base (ajuste/complete librement)
  const record = {
    full_name: safe(p.full_name),
    email: safe(p.email),
    phone: safe(p.phone),
    country: safe(p.country),
    profile: safe(p.profile),          // ex: entrepreneur, clinicien, étudiant, hôpital, ONG...
    goals: safe(p.goals),              // besoins/objectif
    budget: safe(p.budget),            // plages ou chiffre
    notes: safe(p.notes),
    source: safe(p.source),            // ex: web / referral / événement
  };
  if (!record.full_name || !record.email) {
    return { statusCode:400, body: JSON.stringify({ ok:false, error:'VALIDATION', detail:'Nom et email requis.' }) };
  }

  const supabase = createClient(url, key, { auth:{ persistSession:false } });
  const { error } = await supabase.from('eligibility_submissions').insert(record);
  if (error) {
    return { statusCode:500, body: JSON.stringify({ ok:false, error:'DB_INSERT_FAILED', detail: error.message }) };
  }

  // Notification email (optionnel)
  const RESEND = process.env.RESEND_API_KEY, TO = process.env.ALERT_TO_EMAIL, FROM = process.env.ALERT_FROM_EMAIL;
  if (RESEND && TO && FROM) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method:'POST',
        headers:{ Authorization:`Bearer ${RESEND}`, 'Content-Type':'application/json' },
        body: JSON.stringify({
          from: FROM, to:[TO],
          subject: `[Eligibility] ${record.full_name} — ${record.email}`,
          html: `
            <h2>Nouvelle demande d’éligibilité</h2>
            <p><b>Nom:</b> ${record.full_name}</p>
            <p><b>Email:</b> ${record.email}</p>
            ${record.phone ? `<p><b>Tél:</b> ${record.phone}</p>`:''}
            ${record.country ? `<p><b>Pays:</b> ${record.country}</p>`:''}
            ${record.profile ? `<p><b>Profil:</b> ${record.profile}</p>`:''}
            ${record.budget ? `<p><b>Budget:</b> ${record.budget}</p>`:''}
            ${record.goals ? `<p><b>Besoins:</b><br/>${record.goals.replace(/\n/g,'<br/>')}</p>`:''}
            ${record.notes ? `<p><b>Notes:</b><br/>${record.notes.replace(/\n/g,'<br/>')}</p>`:''}
            ${record.source ? `<p><b>Origine:</b> ${record.source}</p>`:''}
          `
        })
      });
      if (!r.ok) return { statusCode:201, body: JSON.stringify({ ok:true, status:'stored_only' }) };
      return { statusCode:201, body: JSON.stringify({ ok:true, status:'notified' }) };
    } catch {
      return { statusCode:201, body: JSON.stringify({ ok:true, status:'stored_only' }) };
    }
  }
  return { statusCode:201, body: JSON.stringify({ ok:true, status:'stored_only' }) };
};
