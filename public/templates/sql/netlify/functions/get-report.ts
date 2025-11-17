// netlify/functions/get-report.ts
import { createClient } from '@supabase/supabase-js'

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

// (Optionnel mais recommandé) Protège l’accès via un token partagé
// Ajoute REPORTS_ACCESS_TOKEN dans Netlify → Environment variables
function isAuthorized(event: any) {
  const required = process.env.REPORTS_ACCESS_TOKEN
  if (!required) return true // pas de protection si non défini
  const provided =
    event.headers?.['x-access-token'] ||
    event.headers?.['X-Access-Token'] ||
    event.queryStringParameters?.token
  return provided === required
}

export const handler = async (event: any) => {
  try {
    // CORS basique
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: {
          ...JSON_HEADERS,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Access-Token',
        },
        body: '',
      }
    }

    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) }
    }

    if (!isAuthorized(event)) {
      return { statusCode: 401, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Unauthorized' }) }
    }

    const id = event.queryStringParameters?.id
    if (!id) {
      return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Missing id parameter' }) }
    }

    // Durée de validité (secondes) — par défaut 7 jours
    const expires = Number(event.queryStringParameters?.expires || 60 * 60 * 24 * 7)

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SERVICE_ROLE) {
      return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Supabase env vars missing' }) }
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE)

    // Emplacement du fichier : reports/<evaluation_id>.html
    const filePath = `reports/${id}.html`

    // Vérifie si le fichier existe (optionnel mais utile)
    const { data: list, error: listErr } = await supabase.storage.from('reports').list('', {
      search: `${id}.html`,
      limit: 1,
    })
    if (listErr) {
      // On ignore l’erreur de list pour rester tolérant (possible selon policies)
    }

    // Crée l’URL signée
    const { data: signed, error: signErr } = await supabase.storage
      .from('reports')
      .createSignedUrl(filePath, expires)

    if (signErr || !signed?.signedUrl) {
      return {
        statusCode: 404,
        headers: JSON_HEADERS,
        body: JSON.stringify({ error: 'Report not found or cannot sign url', details: signErr }),
      }
    }

    return {
      statusCode: 200,
      headers: {
        ...JSON_HEADERS,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        ok: true,
        id,
        url: signed.signedUrl,
        expires,
      }),
    }
  } catch (e: any) {
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: 'Unexpected error', message: e?.message }),
    }
  }
}
