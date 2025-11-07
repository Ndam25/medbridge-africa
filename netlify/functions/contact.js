exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok:true, note:"contact handler alive (JS minimal)" })
    }
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok:false, error:"METHOD_NOT_ALLOWED" }) }
  }
  // Réponse simple pour valider le POST
  return { statusCode: 201, body: JSON.stringify({ ok:true, status:"noop" }) }
}
