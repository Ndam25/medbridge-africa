// netlify/functions/eligibility_submit.js — ELIG-v4.0 (CommonJS)
const { createClient } = require("@supabase/supabase-js");
const { randomUUID } = require("crypto");

const safe = (s, max=10000) =>
  (typeof s === "string" ? s.slice(0,max) : s==null ? "" : String(s).slice(0,max));

exports.handler = async (event) => {
  // Health check
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { "content-type":"application/json", "x-sig":"ELIG-v4.0" },
      body: JSON.stringify({ ok:true, note:"eligibility_submit API alive" })
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type":"application/json" },
      body: JSON.stringify({ ok:false, error:"METHOD_NOT_ALLOWED" })
    };
  }

  const id = randomUUID(); // toujours renvoyé pour l’UX
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let p = {};
  try { p = JSON.parse(event.body || "{}"); }
  catch {
    return {
      statusCode: 400,
      headers: { "content-type":"application/json" },
      body: JSON.stringify({ ok:false, error:"BAD_JSON" })
    };
  }

  const record = {
    id, // on force notre id côté serveur
    program: safe(p.program),
    country: safe(p.country),
    full_name: safe(p.full_name),
    email: safe(p.email),
    phone: safe(p.phone),
    field: safe(p.field),
    education: safe(p.education),
    years: Number.isFinite(p.years) ? p.years : null,
    summary: safe(p.summary),
    pubs: Number.isFinite(p.pubs) ? p.pubs : null,
    cites: Number.isFinite(p.cites) ? p.cites : null,
    awards: safe(p.awards),
    jury: safe(p.jury),
    leadership: safe(p.leadership),
    media: safe(p.media),
    project_sector: safe(p.project_sector),
    project_place: safe(p.project_place),
    project_summary: safe(p.project_summary),
    letters: safe(p.letters),
    partners: safe(p.partners),
    lang: safe(p.lang),
    source: safe(p.source),
    notes: safe(p.notes),
  };

  if (!record.full_name || !record.email) {
    return {
      statusCode: 400,
      headers: { "content-type":"application/json" },
      body: JSON.stringify({ ok:false, error:"VALIDATION", detail:"Nom et email requis." })
    };
  }

  // Si Supabase est configuré → on insère (sinon on renvoie quand même l’id)
  if (url && key) {
    try {
      const supabase = createClient(url, key, { auth:{ persistSession:false } });
      await supabase.from("eligibility_submissions").insert(record);
    } catch (e) {
      // on ignore l’erreur d’insert pour garder l’UX (id renvoyé)
    }
  }

  return {
    statusCode: 201,
    headers: { "content-type":"application/json", "x-sig":"ELIG-v4.0" },
    body: JSON.stringify({ ok:true, data:{ id }, ver:"v4.0" })
  };
};
