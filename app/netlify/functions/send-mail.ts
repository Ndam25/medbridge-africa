// /netlify/functions/send-mail.ts

import type { Config } from '@netlify/functions'
import { Resend } from 'resend'

// Utilise la variable d'environnement RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY)

export async function handler(event: { body: any; httpMethod: string }) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  // Exemple d'envoi d'email de confirmation après soumission
  const { to, subject, htmlContent } = JSON.parse(event.body || '{}')

  if (!to) return { statusCode: 400, body: JSON.stringify({ error: 'Missing recipient' }) }

  // Contenu minimal de l'email
  const defaultHtml = `<h1>Félicitations !</h1><p>Votre évaluation a été reçue. Un conseiller MedBridge vous contactera sous peu.</p>`
  
  try {
    await resend.emails.send({
      from: 'MedBridge Africa <no-reply@medbridge.africa>',
      to: [to],
      subject: subject || 'Confirmation de votre évaluation MedBridge Africa',
      html: htmlContent || defaultHtml,
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