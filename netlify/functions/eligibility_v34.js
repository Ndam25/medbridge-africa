// netlify/functions/eligibility_v34.js — ELIG-v3.4 (always returns id)
const { randomUUID } = require("crypto");

const json = (status, body) => ({
  statusCode: status,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-store",
    "x-sig": "ELIG-v3.4"
  },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return json(200, { ok: true, note: "eligibility API alive" });
  }
  if (event.httpMethod !== "POST") {
    return json(405, { ok:false, error:"METHOD_NOT_ALLOWED" });
  }

  // parse sûre
  let p = {};
  try { p = JSON.parse(event.body || "{}"); } catch {}

  // on génère l'id AVANT tout le reste pour l’avoir quoi qu’il arrive
  const id = (typeof randomUUID === "function")
    ? randomUUID()
    : `loc-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  // validations NON bloquantes (on veut surtout voir l’id côté client)
  const full_name = (p.full_name || "").toString().trim();
  const email     = (p.email || "").toString().trim();
  if (!full_name || !email) {
    return json(200, { ok:true, status:"debug_no_validation", id, ver:"v3.4" });
  }

  // (Optionnel) Insert DB + Email — ne DOIT PAS empêcher de renvoyer l'id
  try {
    // … tes intégrations réelles ici
  } catch {}

  return json(201, { ok:true, status:"notified", id, ver:"v3.4" });
};
