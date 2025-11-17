import type { Config } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EvalPayload = {
  lang?: "fr" | "en";
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
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const email = data.profile?.email;
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing profile.email" }),
    };
  }

  const lang: "fr" | "en" = data.lang === "en" ? "en" : "fr";
  const score = Math.round(data.score ?? 0);
  const programGuess =
    data.programGuess ||
    (score >= 80
      ? lang === "en"
        ? "Strong EB-1A / EB-2 NIW potential (to be confirmed)"
        : "Profil avec fort potentiel EB-1A / EB-2 NIW (à confirmer)"
      : score >= 60
      ? lang === "en"
        ? "Potential EB-2 NIW profile (elements to strengthen)"
        : "Profil avec potentiel EB-2 NIW (éléments à renforcer)"
      : lang === "en"
      ? "Early-stage profile — significant strengthening needed"
      : "Profil en phase initiale — renforcement important nécessaire");

  const name = data.profile?.full_name || (lang === "en" ? "Candidate" : "Candidat(e)");
  const country = data.profile?.country || "";
  const education = data.profile?.education || "";
  const years = data.profile?.years;
  const summary = data.profile?.summary || "";
  const program = data.profile?.program || "";

  const pubs = data.metrics?.pubs ?? 0;
  const cites = data.metrics?.cites ?? 0;
  const awards = data.metrics?.awards;

  const sector = data.project?.sector || "";
  const place = data.project?.place || "";
  const projSummary = data.project?.summary || "";

  const recommendations =
    data.recommendations && data.recommendations.length
      ? data.recommendations
      : [];

  const html =
    lang === "en"
      ? buildHtmlEn({
          name,
          score,
          programGuess,
          email,
          country,
          education,
          years,
          summary,
          program,
          pubs,
          cites,
          awards,
          sector,
          place,
          projSummary,
          recommendations,
        })
      : buildHtmlFr({
          name,
          score,
          programGuess,
          email,
          country,
          education,
          years,
          summary,
          program,
          pubs,
          cites,
          awards,
          sector,
          place,
          projSummary,
          recommendations,
        });

  const subject =
    lang === "en"
      ? `Your MedBridge Africa pre-evaluation — Score ${score} / 100`
      : `Votre pré-évaluation MedBridge Africa — Score ${score} / 100`;

  try {
    await resend.emails.send({
      from: "MedBridge Africa <no-reply@medbridge.africa>",
      to: [email, "contact@healthacademia.shop"],
      subject,
      html,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (e) {
    console.error("Resend error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}

type HtmlParams = {
  name: string;
  score: number;
  programGuess: string;
  email: string;
  country: string;
  education: string;
  years?: number;
  summary: string;
  program: string;
  pubs: number;
  cites: number;
  awards?: string;
  sector: string;
  place: string;
  projSummary: string;
  recommendations: string[];
};

function buildHtmlFr(p: HtmlParams): string {
  const recoList =
    p.recommendations.length > 0
      ? `<ul>${p.recommendations.map((r) => `<li>${r}</li>`).join("")}</ul>`
      : "<p>Aucune recommandation détaillée n’a été fournie dans cette version du rapport.</p>";

  return `
  <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
    <h1 style="color:#0f766e;">MedBridge Africa — Rapport de pré-évaluation</h1>
    <p>Bonjour ${p.name},</p>
    <p>
      Merci d’avoir complété la pré-évaluation EB-1A / EB-2 NIW via MedBridge Africa.
      Ce rapport est <strong>indicatif</strong> et ne constitue pas un avis juridique.
    </p>

    <h2 style="margin-top:24px;">1. Score global</h2>
    <p>
      <strong style="font-size:1.3rem;">${p.score} / 100</strong><br/>
      <em>${p.programGuess}</em>
    </p>

    <h2 style="margin-top:24px;">2. Profil et contexte</h2>
    <p>
      Pays / contexte principal : <strong>${p.country || "Non précisé"}</strong><br/>
      Niveau académique : <strong>${p.education || "Non précisé"}</strong><br/>
      Expérience post-diplôme : <strong>${typeof p.years === "number" ? p.years + " an(s)" : "Non précisé"}</strong><br/>
      Programme visé : <strong>${p.program || "Non précisé"}</strong>
    </p>
    ${
      p.summary
        ? `<p><strong>Résumé du parcours :</strong><br/>${p.summary}</p>`
        : ""
    }

    <p style="font-size:0.9rem;color:#64748b;">
      Email : ${p.email} • Ce rapport reste indicatif et devra être revu avec un conseiller MedBridge Africa.
    </p>

    <h2 style="margin-top:24px;">3. Indicateurs académiques et professionnels</h2>
    <ul>
      <li>Publications : <strong>${p.pubs}</strong></li>
      <li>Citations : <strong>${p.cites}</strong></li>
      <li>Prix / distinctions : <strong>${
        p.awards ? "au moins un élément renseigné" : "aucun élément renseigné"
      }</strong></li>
    </ul>

    <h2 style="margin-top:24px;">4. Projet et impact proposé</h2>
    <p>
      Secteur : <strong>${p.sector || "Non précisé"}</strong><br/>
      Lieu / contexte ciblé : <strong>${p.place || "Non précisé"}</strong>
    </p>
    ${
      p.projSummary
        ? `<p><strong>Résumé du projet :</strong><br/>${p.projSummary}</p>`
        : "<p>Le projet n’a pas encore été décrit en détail dans le formulaire.</p>"
    }

    <h2 style="margin-top:24px;">5. Recommandations indicatives</h2>
    ${recoList}

    <p style="font-size:0.9rem;color:#64748b;margin-top:16px;">
      Ce rapport ne remplace pas une analyse complète de votre dossier. Pour une revue détaillée
      (CV, preuves, projet) et la construction d’une stratégie EB-1A / EB-2 NIW, il est conseillé de réserver
      une consultation.
    </p>

    <p style="margin-top:12px;">
      🔗 <strong>Étapes possibles :</strong><br/>
      • Réserver un appel de 30 minutes :
      <a href="https://calendly.com/adama-ndir/30min" target="_blank">Calendly MedBridge Africa</a><br/>
      • Envoyer votre CV :
      <a href="mailto:contact@healthacademia.shop">contact@healthacademia.shop</a><br/>
      • Poser vos questions via WhatsApp :
      <a href="https://wa.me/221771609016" target="_blank">+221 77 160 90 16</a>
    </p>

    <p style="margin-top:24px;">
      Bien cordialement,<br/>
      <strong>L’équipe MedBridge Africa</strong>
    </p>

    <p style="margin-top:16px;font-size:0.8rem;color:#94a3b8;">
      MedBridge Africa n’est pas un cabinet d’avocats et ne fournit pas de conseil juridique.
      Notre rôle est de vous aider à structurer votre parcours, vos preuves et votre projet
      dans une logique d’excellence et de lisibilité.
    </p>
  </div>`;
}

function buildHtmlEn(p: HtmlParams): string {
  const recoList =
    p.recommendations.length > 0
      ? `<ul>${p.recommendations.map((r) => `<li>${r}</li>`).join("")}</ul>`
      : "<p>No detailed recommendations were provided in this version of the report.</p>";

  return `
  <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
    <h1 style="color:#0f766e;">MedBridge Africa — Pre-Evaluation Report</h1>
    <p>Dear ${p.name},</p>
    <p>
      Thank you for completing the EB-1A / EB-2 NIW pre-evaluation with MedBridge Africa.
      This report is <strong>indicative only</strong> and does not constitute legal advice.
    </p>

    <h2 style="margin-top:24px;">1. Overall Score</h2>
    <p>
      <strong style="font-size:1.3rem;">${p.score} / 100</strong><br/>
      <em>${p.programGuess}</em>
    </p>

    <h2 style="margin-top:24px;">2. Profile & Context</h2>
    <p>
      Main country / context: <strong>${p.country || "Not specified"}</strong><br/>
      Academic level: <strong>${p.education || "Not specified"}</strong><br/>
      Post-graduation experience: <strong>${
        typeof p.years === "number" ? p.years + " year(s)" : "Not specified"
      }</strong><br/>
      Target program: <strong>${p.program || "Not specified"}</strong>
    </p>
    ${
      p.summary
        ? `<p><strong>Profile summary:</strong><br/>${p.summary}</p>`
        : ""
    }

    <p style="font-size:0.9rem;color:#64748b;">
      Email: ${p.email} • This report is indicative and should be discussed with MedBridge Africa
      if you wish to move forward.
    </p>

    <h2 style="margin-top:24px;">3. Academic & Professional Indicators</h2>
    <ul>
      <li>Publications: <strong>${p.pubs}</strong></li>
      <li>Citations: <strong>${p.cites}</strong></li>
      <li>Awards / distinctions: <strong>${
        p.awards ? "at least one element reported" : "none reported yet"
      }</strong></li>
    </ul>

    <h2 style="margin-top:24px;">4. Proposed Project & Impact</h2>
    <p>
      Sector: <strong>${p.sector || "Not specified"}</strong><br/>
      Target context / location: <strong>${p.place || "Not specified"}</strong>
    </p>
    ${
      p.projSummary
        ? `<p><strong>Project summary:</strong><br/>${p.projSummary}</p>`
        : "<p>The project has not been described in detail in the form yet.</p>"
    }

    <h2 style="margin-top:24px;">5. Indicative Recommendations</h2>
    ${recoList}

    <p style="font-size:0.9rem;color:#64748b;margin-top:16px;">
      This report does not replace a full case review. For a detailed assessment of your CV,
      evidence and project, and to build a realistic EB-1A / EB-2 NIW strategy, we recommend
      scheduling a consultation.
    </p>

    <p style="margin-top:12px;">
      🔗 <strong>Next possible steps:</strong><br/>
      • Book a 30-minute consultation:
      <a href="https://calendly.com/adama-ndir/30min" target="_blank">MedBridge Africa Calendly</a><br/>
      • Send your CV:
      <a href="mailto:contact@healthacademia.shop">contact@healthacademia.shop</a><br/>
      • Ask questions via WhatsApp:
      <a href="https://wa.me/221771609016" target="_blank">+221 77 160 90 16</a>
    </p>

    <p style="margin-top:24px;">
      Best regards,<br/>
      <strong>The MedBridge Africa team</strong>
    </p>

    <p style="margin-top:16px;font-size:0.8rem;color:#94a3b8;">
      MedBridge Africa is not a law firm and does not provide legal advice.
      Our role is to help you structure your trajectory, evidence and project in a clear,
      high-quality way for your advisors and reviewers.
    </p>
  </div>`;
}

export const config: Config = {
  path: "/.netlify/functions/send-mail",
  method: "POST",
};
