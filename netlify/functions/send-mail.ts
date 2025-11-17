// netlify/functions/send-mail.ts

import type { Config } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EvalPayload = {
  score?: number;
  programGuess?: string;
  profile?: {
    full_name?: string;
    email?: string;
    country?: string;
    education?: string;
    years?: number;
    program?: string;
    summary?: string;
  };
  metrics?: {
    pubs?: number;
    cites?: number;
    awards?: string;
  };
  project?: {
    sector?: string;
    place?: string;
    summary?: string;
  };
  recommendations?: string[];
};

export async function handler(event: { body: any; httpMethod: string }) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data: EvalPayload;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const email = data.profile?.email;
  const name = data.profile?.full_name || "Candidat(e)";
  const score = data.score ?? 0;
  const programGuess =
    data.programGuess || "Pré-évaluation EB-1A / EB-2 NIW (indicative)";
  const pubs = data.metrics?.pubs ?? 0;
  const cites = data.metrics?.cites ?? 0;
  const awards = data.metrics?.awards;
  const sector = data.project?.sector || "Non précisé";
  const place = data.project?.place || "Non précisé";
  const projSummary = data.project?.summary || "";

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing profile.email in payload" }),
    };
  }

  const recoList =
    data.recommendations && data.recommendations.length > 0
      ? `<ul>${data.recommendations
          .map((r) => `<li>${r}</li>`)
          .join("")}</ul>`
      : "<p>Aucune recommandation détaillée n’a été générée dans cette version du rapport.</p>";

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
      <h1 style="color:#0f766e;">MedBridge Africa — Rapport de pré-évaluation</h1>
      <p>Bonjour ${name},</p>
      <p>
        Merci d’avoir complété la pré-évaluation EB-1A / EB-2 NIW via MedBridge Africa.
        Vous trouverez ci-dessous un résumé de vos résultats. Ce rapport est
        <strong>purement indicatif</strong> et ne constitue pas un avis juridique.
      </p>

      <h2 style="margin-top:24px;">1. Score global</h2>
      <p>
        <strong style="font-size:1.3rem;">${score} / 100</strong><br/>
        <em>${programGuess}</em>
      </p>

      <h2 style="margin-top:24px;">2. Profil et contexte</h2>
      <p>
        Pays / contexte principal : <strong>${
          data.profile?.country || "Non précisé"
        }</strong><br/>
        Niveau académique : <strong>${data.profile?.education || "Non précisé"}</strong><br/>
        Expérience post-diplôme : <strong>${
          data.profile?.years ?? "Non précisé"
        } an(s)</strong>
      </p>
      ${
        data.profile?.summary
          ? `<p><strong>Résumé du parcours :</strong><br/>${data.profile.summary}</p>`
          : ""
      }

      <h2 style="margin-top:24px;">3. Indicateurs académiques et professionnels</h2>
      <ul>
        <li>Publications : <strong>${pubs}</strong></li>
        <li>Citations : <strong>${cites}</strong></li>
        <li>Prix / distinctions : <strong>${
          awards ? "Oui (à documenter)" : "Non renseigné"
        }</strong></li>
      </ul>

      <h2 style="margin-top:24px;">4. Projet et impact proposé</h2>
      <p>
        Secteur : <strong>${sector}</strong><br/>
        Lieu / contexte ciblé : <strong>${place}</strong>
      </p>
      ${
        projSummary
          ? `<p><strong>Résumé du projet :</strong><br/>${projSummary}</p>`
          : "<p>Le projet n’a pas encore été décrit en détail dans le formulaire.</p>"
      }

      <h2 style="margin-top:24px;">5. Recommandations indicatives</h2>
      ${recoList}

      <hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0;"/>

      <p style="font-size:0.9rem; color:#64748b;">
        Ce rapport ne remplace pas une analyse complète de votre dossier. Pour une revue
        détaillée (CV, preuves, projet) et la construction d’une stratégie personnalisée
        EB-1A / EB-2 NIW, il est recommandé de réserver une consultation.
      </p>

      <p style="margin-top:12px;">
        🔗 <strong>Étapes possibles :</strong><br/>
        • Réserver un appel de 30 minutes : 
        <a href="https://calendly.com/adama-ndir/30min" target="_blank">
          Calendly MedBridge Africa
        </a><br/>
        • Envoyer votre CV : 
        <a href="mailto:contact@healthacademia.shop">contact@healthacademia.shop</a><br/>
        • Poser vos questions sur WhatsApp : 
        <a href="https://wa.me/221771609016" target="_blank">+221 77 160 90 16</a>
      </p>

      <p style="margin-top:24px;">
        Bien cordialement,<br/>
        <strong>L’équipe MedBridge Africa</strong>
      </p>

      <p style="margin-top:16px;font-size:0.8rem;color:#94a3b8;">
        MedBridge Africa n’est pas un cabinet d’avocats et ne fournit pas de conseil juridique.
        Notre rôle est de vous aider à structurer votre parcours, vos preuves et votre projet
        dans une logique d’excellence et de lisibilité pour vos interlocuteurs.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "MedBridge Africa <no-reply@medbridge.africa>",
      to: [email, "contact@healthacademia.shop"],
      subject: `Votre pré-évaluation MedBridge Africa — Score ${score} / 100`,
      html,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (e) {
    console.error("Resend Error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
}

export const config: Config = {
  path: "/.netlify/functions/send-mail",
  method: "POST",
};
