// /netlify/functions/submit-evaluation.ts

import type { Config } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

// Poids pour le calcul des scores (Exemple basé sur l'expertise EB1/NIW)
const WEIGHTS_EB1 = { awards: 0.10, review: 0.12, leadership: 0.16, media: 0.08, pubs: 0.10, cites: 0.12, degree: 0.06, years: 0.08, sector: 0.09, project: 0.09 }
const WEIGHTS_NIW = { prong1: 0.34, prong2: 0.33, prong3: 0.33 }

// Normalisation des inputs (0-10)
function norm(x: number, max: number) { return Math.max(0, Math.min(10, (Number(x) || 0) / max * 10)) }

function scoreEB1(input: any) {
  const s = { awards: input.awards ? 8 : 0, review: input.review ? 7 : 0, leadership: input.lead ? 8 : 0, media: input.media ? 6 : 0,
    pubs: norm(input.pubs, 25), cites: norm(input.cites, 800), degree: /PhD|Doctorat|MD/i.test(input.degree || '') ? 7 : 4,
    years: norm(input.years, 20), sector: input.sector ? 6 : 0, project: input.project ? 7 : 0
  }
  const totalScore = Math.round((s.awards * WEIGHTS_EB1.awards + s.review * WEIGHTS_EB1.review + s.leadership * WEIGHTS_EB1.leadership + s.media * WEIGHTS_EB1.media + s.pubs * WEIGHTS_EB1.pubs + s.cites * WEIGHTS_EB1.cites + s.degree * WEIGHTS_EB1.degree + s.years * WEIGHTS_EB1.years + s.sector * WEIGHTS_EB1.sector + s.project * WEIGHTS_EB1.project) * 10)
  return { score: Math.min(100, Math.max(0, totalScore)) }
}

function scoreNIW(input: any) {
  const s = { prong1: norm(input.p1, 10), prong2: norm(input.p2, 10), prong3: norm(input.p3, 10) }
  const totalScore = Math.round((s.prong1 * WEIGHTS_NIW.prong1 + s.prong2 * WEIGHTS_NIW.prong2 + s.prong3 * WEIGHTS_NIW.prong3) * 10)
  return { score: Math.min(100, Math.max(0, totalScore)) }
}

function getBand(eb1: number, niw: number) {
  const finalScore = Math.max(eb1, niw)
  if (finalScore >= 90) return 'Très élevée'
  if (finalScore >= 80) return 'Élevée'
  if (finalScore >= 65) return 'Modérée'
  if (finalScore >= 50) return 'Limite'
  return 'Faible'
}

// Template HTML minimal pour le brouillon (basé sur report_base_fr.html)
const DRAFT_TEMPLATE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MedBridge Africa — Rapport</title><style>/* ... Styles simplifiés ... */</style></head><body><header style="background:#0D3B66;color:#fff;padding:18px"><h1 style="margin:0;font-size:20px">MedBridge Africa — Brouillon</h1></header><main style="max-width:920px;margin:24px auto;padding:16px"><section style="background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.05);padding:18px;margin-bottom:16px"><p><strong>Candidat :</strong> {{FULL_NAME}} ({{EMAIL}})<br><strong>Pays :</strong> {{COUNTRY}} • <strong>Programme :</strong> {{PROGRAMME}}</p></section><section style="background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.05);padding:18px;margin-bottom:16px"><h2>Résultats</h2><p><strong>EB1-A :</strong> {{SCORE_EB1}}/100</p><p><strong>EB2-NIW :</strong> {{SCORE_NIW}}/100</p><p><strong>Conclusion :</strong> {{BAND}}</p><p style="color:#6B7280;font-size:12px">*Brouillon généré automatiquement — à valider par un conseiller.</p></section></main></body></html>`


export async function handler(event: { body: any; httpMethod: string }) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }
  const body = JSON.parse(event.body || '{}')

  // Supabase Client avec Service Role Key
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // 1. Calcul des scores
  const { score: score_eb1 } = scoreEB1(body)
  const { score: score_niw } = scoreNIW(body)
  const band = getBand(score_eb1, score_niw)

  // 2. Upsert Lead
  const { data: lead, error: leadErr } = await supabase
    .from('leads')
    .upsert({ email: body.email, name: body.full_name, country: body.country, service_interest: body.programme })
    .select()
    .single()
  
  if (leadErr || !lead) {
      console.error('Lead Upsert Error:', leadErr)
      return { statusCode: 500, body: JSON.stringify({ ok: false, message: leadErr.message || 'Failed to upsert lead' }) }
  }

  // 3. Insert Evaluation
  const { data: ev, error: evErr } = await supabase
    .from('evaluations')
    .insert({ 
        lead_id: lead.id, 
        programme: body.programme, 
        score_eb1a: score_eb1, 
        score_niw: score_niw,
        total_score: Math.max(score_eb1, score_niw),
        band: band,
        payload: body, 
    })
    .select()
    .single()
    
  if (evErr || !ev) {
      console.error('Evaluation Insert Error:', evErr)
      return { statusCode: 500, body: JSON.stringify({ ok: false, message: evErr.message || 'Failed to insert evaluation' }) }
  }

  // 4. Génération et Stockage du Brouillon HTML
  const template = DRAFT_TEMPLATE
    .replace('{{FULL_NAME}}', lead.name)
    .replace('{{EMAIL}}', lead.email)
    .replace('{{COUNTRY}}', lead.country || 'N/A')
    .replace('{{PROGRAMME}}', ev.programme)
    .replace('{{SCORE_EB1}}', score_eb1.toString())
    .replace('{{SCORE_NIW}}', score_niw.toString())
    .replace('{{BAND}}', band)

  const filePath = `drafts/${ev.id}.html` 
  
  // Upload du HTML généré
  const { error: upErr } = await supabase.storage
    .from('reports') // Bucket privé 'reports'
    .upload(filePath, new Blob([template], { type: 'text/html' }), { upsert: true })

  // 5. Création de l'URL signée (valide pour 60 secondes pour la redirection immédiate)
  const { data: signed, error: signErr } = await supabase.storage
    .from('reports')
    .createSignedUrl(filePath, 60) 

  let reportUrl = null
  if (signErr) {
    console.warn('Signed URL generation failed:', signErr)
  } else {
    reportUrl = signed?.signedUrl
  }

  // 6. Déclenchement de l'email de confirmation (Non-bloquant - à implémenter dans send-mail.ts)
  // fetch('/.netlify/functions/send-mail', { ... }) 

  // 7. Réponse finale
  return { 
      statusCode: 200, 
      body: JSON.stringify({ 
          ok: true, 
          evaluation_id: ev.id, 
          report_url: reportUrl,
      }) 
  }
}

export const config: Config = {
  path: '/.netlify/functions/submit-evaluation',
  method: 'POST',
}