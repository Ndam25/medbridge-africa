// app/en/services/page.tsx

export default function ServicesPageEN() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Our EB-1A / EB-2 NIW advisory services
        </h1>
        <p className="text-slate-700">
          MedBridge Africa helps physicians, researchers, data scientists,
          epidemiologists, biostatisticians and public health leaders transform
          their track record into a strong qualified immigration case to the
          United States.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          1. Structured pre-evaluation & personalized roadmap
        </h2>
        <p className="text-slate-700">
          We review your CV, publications and impact to identify strengths,
          gaps and realistic timelines for an EB-1A / EB-2 NIW strategy.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Review of your academic and professional background.</li>
          <li>
            Assessment of your publications, communications and leadership
            responsibilities.
          </li>
          <li>
            Personalized roadmap over 6–24 months (publications, visibility,
            roles, US-based project).
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Ideal for professionals who are exploring whether EB-1A / NIW is a
          realistic path and on what timeline.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          2. Scientific coaching & profile positioning
        </h2>
        <p className="text-slate-700">
          We help you bring out the strongest version of your scientific and
          professional journey, in a language that is understandable for review
          committees and attorneys.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Support for drafting articles, abstracts, posters and conference
            presentations.
          </li>
          <li>
            Structuring your professional narrative (positioning, impact,
            leadership, niche).
          </li>
          <li>
            Guidance on responsible use of AI to accelerate scientific work
            (without plagiarism).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          3. Non-legal EB-1A / EB-2 NIW case support
        </h2>
        <p className="text-slate-700">
          We act as a technical and strategic bridge between your real-world
          impact and the evidentiary language expected in an EB-1A / NIW case.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Organizing your evidence according to recognition, impact and
            leadership criteria.
          </li>
          <li>
            Drafting impact summaries, timelines and structured evidence
            matrices.
          </li>
          <li>
            Assisting with technical content for recommendation letters
            (substance, angle, level of detail).
          </li>
          <li>
            Interfacing with partner attorneys when legal advice is required.
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Important: MedBridge Africa is not a law firm and does not provide
          legal advice. We act as experts in career, scientific impact and
          evidence structuring.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          4. Data, AI & public health for institutions
        </h2>
        <p className="text-slate-700">
          Beyond individual cases, MedBridge Africa also supports universities,
          training programs and public health institutions.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Advisory on AI solutions for research, training and public health.
          </li>
          <li>
            Design of training modules for universities, schools of public
            health and FETP networks.
          </li>
          <li>
            Tailored projects for ministries of health, agencies and
            international partners.
          </li>
        </ul>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Ready to structure your EB-1A / EB-2 NIW journey?
        </h2>
        <p className="text-slate-700 mb-4">
          Most collaborations start with a structured pre-evaluation of your
          profile, followed by a 30–60 minute session to define a realistic and
          tailored strategy.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="https://calendly.com/adama-ndir/30min"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            target="_blank"
            rel="noreferrer"
          >
            📅 Book a 30-minute call
          </a>
          <a
            href="https://wa.me/221771609016"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            target="_blank"
            rel="noreferrer"
          >
            💬 Chat on WhatsApp
          </a>
          <a
            href="mailto:contact@healthacademia.shop"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            📧 Send your CV for an initial review
          </a>
        </div>
      </section>
    </main>
  );
}
