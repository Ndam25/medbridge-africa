// netlify/functions/eligibility_get.js  (CommonJS)
exports.handler = async (event, context) => {
  try {
    const id = event.queryStringParameters?.id || "unknown";

    // Démo: renvoyer un payload exemple (remplace par lookup Supabase plus tard)
    const demo = {
      id,
      program: "EB2-NIW",
      full_name: "John/Jane Doe",
      email: "john@example.com",
      score: 72,
      recommendations: [
        "Consolider les lettres de recommandation (US si possible).",
        "Documenter l’impact national et l’alignement avec priorités US.",
        "Planifier 12–18 mois de publications/communications."
      ],
    };

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store"
      },
      body: JSON.stringify({ ok: true, data: demo })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(e) })
    };
  }
};