// /netlify/functions/send-mail.ts

import type { Config } from '@netlify/functions'
import { Resend } from 'resend'

// Clé API à mettre dans les variables d'environnement Netlify
const resend = new Resend(process.env.RESEND_API_KEY)

type EvalPayload = {
  score?: number
  programGuess?: string
  profile?: {
    full_name?: string
    email?: string
    country?: string
    education?: string
    years?: number
    program?: string
    summary?: string
  }
  metrics?: {
    pubs?: number
    cites?: number
    awards?: string
  }
  project?: {
    sector?: string
    place?: string
    summary?: string
  }
  recommendations?: string[]
}

export async function handler(event: { body: any; httpMethod: string }) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let data: EvalPayload
  try {
    data = JSON.parse(event.body || '{}')
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const email = data.profile?.email
  const name = data.profile?.full_name || 'Candidat(e)'
  const score = data.score ?? 0
  const programGuess = data.programGuess || 'Pré-évaluation EB-1A / EB-2 NIW'
  const pubs = data.metrics?.pubs ?? 0
  const cites = data.metrics?.cites ?? 0
  const awards = data.metrics?.awards
  const sector = data.project?.sector || 'Non précisé'
  const place = data.project?.place || 'Non précisé'
  const projSummary = data.project?.summary || ''

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing profile.email in payload' }),
    }
  }

  const recoList =
    data.recommendations && data.recommendations.length > 0
      ? `<ul>${data.recommendations
          .map((r) => `<li>${r}</li>`)
          .join('')}</ul>`
      : '<p>Aucune recommandation détaillée n’a été générée.</p>'

  const html = `
    <h1>MedBridge Africa — Rapport de pré-évaluation</h1>
    <p>Bonjour ${name},</p>
    <p>
      Voici le résumé de votre pré-évaluation EB-1A / EB-2 NIW réalisée via MedBridge Africa.
      Ce rapport est purement indicatif et ne constitue pas un avis juridique.
    </p>

    <h2>Score global</h2>
    <p><strong>${score} / 100</strong><br/>
    <em>${programGuess}</em></p>

    <h2>Profil et contexte</h2>
    <p>
      Pays / contexte principal : <strong>${data.profile?.country || 'Non précisé'}</strong><br/>
      Niveau académique : <strong>${data.profile?.education || 'Non précisé'}</strong><br/>
      Expérience post-diplôme : <strong>${data.profile?.years ?? 'Non précisé'} an(s)</strong>
    </p>
    ${
      data.profile?.summary
        ? `<p><strong>Résumé du parcours :</strong><br/>${data.profile.summary}</p>`
        : ''
    }

    <h2>Indicateurs académiques et professionnels</h2>
    <ul>
      <li>Publications : <strong>${pubs}</strong></li>
      <li>Citations : <strong>${cites}</strong></li>
      <li>Prix / distinctions : <strong>${
        awards ? 'Oui (à documenter)' : 'Non renseigné'
      }</strong></li>
    </ul>

    <h2>Projet et impact proposé</h2>
    <p>
      Secteur : <strong>${sector}</strong><br/>
      Lieu / contexte ciblé : <strong>${place}</strong>
    </p>
    ${
      projSummary
        ? `<p><strong>Résumé du projet :</strong><br/>${projSummary}</p>`
        : '<p>Le projet n’a pas encore été décrit en détail dans le formulaire.</p>'
    }

    <h2>Recommandations principales (indicatives)</h2>
    ${recoList}

    <hr/>
    <p>
      Ce rapport ne remplace pas une analyse complète de votre dossier. Pour une revue détaillée
      et une stratégie personnalisée EB-1A / EB-2 NIW, vous pouvez réserver une consultation
      via MedBridge Africa.
    </p>
    <p>
      Bien cordialement,<br/>
      <strong>L’équipe MedBridge Africa</strong>
    </p>
  `

  try {
    await resend.emails.send({
      from: 'MedBridge Africa <no-reply@medbridge.africa>',
      // envoi au candidat + copie interne
      to: [email, 'contact@healthacademia.shop'],
      subject: `Votre pré-évaluation MedBridge Africa — Score ${score} / 100`,
      html,
    })

    return { statusCode: 200, body: JSON.stringify({ success: true }) }
  } catch (e) {
    console.error('Resend Error:', e)
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email.' }) }
  }
}

export const config: Config = {
  path: '/.netlify/functions/send-mail',
  method: 'POST',
}
