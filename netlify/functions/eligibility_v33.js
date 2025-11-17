// netlify/functions/eligibility_v33.js — ELIG-v3.3 (CommonJS)
const { createClient } = require("@supabase/supabase-js");
let randomUUID; try { ({ randomUUID } = require("crypto")); } catch (_) { randomUUID = null; }

const SIG = "ELIG-v3.3";
const safe = (v, max=10000)=> typeof v==="string" ? v.slice(0,max) : v==null ? "" : String(v).slice(0,max);
const json = (code, body)=>({
  statusCode: code,
  headers: { "content-type":"application/json", "x-sig": SIG, "cache-control":"no-store" },
  body: JSON.stringify(body)
});

async function handler(event) {
  if (event.httpMethod === "GET") return json(200, { ok:true, note:"eligibility API alive" });
  if (event.httpMethod !== "POST") return json(405, { ok:false, error:"METHOD_NOT_ALLOWED" });

  let p={}; try { p = JSON.parse(event.body||"{}"); } catch { return json(400,{ok:false,error:"BAD_JSON"}); }
  const record = {
    full_name: safe(p.full_name), email: safe(p.email), phone: safe(p.phone),
    country: safe(p.country), profile: safe(p.profile), goals: safe(p.goals),
    budget: safe(p.budget), notes: safe(p.notes), source: safe(p.source),
  };
  if (!record.full_name || !record.email) return json(400,{ok:false,error:"VALIDATION",detail:"Nom et email requis."});

  // id garanti, même sans DB
  let id = (randomUUID && typeof randomUUID==="function")
    ? randomUUID()
    : `loc-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  // Supabase (best-effort)
  let stored = false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    try {
      const supabase = createClient(url, key, { auth:{ persistSession:false } });
      const { data, error } = await supabase
        .from("eligibility_submissions")
        .insert({ id, ...record })
        .select("id")
        .single();
      if (!error && data?.id) { id = data.id; stored = true; }
    } catch {}
  }

  // Resend (best-effort)
  let status = stored ? "created" : "accepted";
  const RESEND = process.env.RESEND_API_KEY, TO = process.env.ALERT_TO_EMAIL, FROM = process.env.ALERT_FROM_EMAIL;
  if (RESEND && TO && FROM) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method:"POST",
        headers:{ Authorization:`Bearer ${RESEND}`, "Content-Type":"application/json" },
        body: JSON.stringify({
          from: FROM, to:[TO],
          subject:`[Eligibility] ${record.full_name} — ${record.email}`,
          html: `
            <h2>Nouvelle demande d’éligibilité</h2>
            <p><b>ID:</b> ${id}</p>
            <p><b>Nom:</b> ${record.full_name}</p>
            <p><b>Email:</b> ${record.email}</p>
            ${record.phone ? `<p><b>Tél:</b> ${record.phone}</p>` : ""}
            ${record.country ? `<p><b>Pays:</b> ${record.country}</p>` : ""}
            ${record.profile ? `<p><b>Profil:</b> ${record.profile}</p>` : ""}
            ${record.budget ? `<p><b>Budget:</b> ${record.budget}</p>` : ""}
            ${record.goals ? `<p><b>Besoins:</b><br/>${record.goals.replace(/\n/g,"<br/>")}</p>` : ""}
            ${record.notes ? `<p><b>Notes:</b><br/>${record.notes.replace(/\n/g,"<br/>")}</p>` : ""}
            ${record.source ? `<p><b>Origine:</b> ${record.source}</p>` : ""}
          `
        })
      });
      if (r.ok) status = stored ? "notified" : "accepted_notified";
    } catch {}
  }

  return json(201, { ok:true, status, id });
}

// ✅ Export explicite pour Netlify
exports.handler = handler;
module.exports = { handler };
