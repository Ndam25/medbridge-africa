// app/en/about/page.tsx

export default function AboutPageEN() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          About MedBridge Africa
        </h1>
        <p className="text-slate-700">
          MedBridge Africa is a bridge between African health professionals and
          academic and professional opportunities in the United States. We help
          healthcare professionals, researchers and public health experts build
          a strong, evidence-based path aligned with EB-1A and EB-2 NIW
          categories.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Our mission</h2>
        <p className="text-slate-700">
          Many African professionals have a real impact on the ground, but their
          contributions are rarely translated into the evidentiary language
          expected by immigration authorities and attorneys. Our mission is to
          reduce this information gap.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Highlight African career trajectories using international standards
            of excellence.
          </li>
          <li>
            Translate years of field work, research and program management into
            evidence that fits EB-1A / EB-2 NIW requirements.
          </li>
          <li>
            Help candidates make informed decisions, without unrealistic
            promises.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Who is behind MedBridge Africa?
        </h2>
        <p className="text-slate-700">
          MedBridge Africa is led by Dr. Adama NDIR (MD, MSc), physician,
          nutritionist, epidemiologist and data scientist, with over 15–20
          years of experience in:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            field epidemiology training (FETP Frontline, Intermediate, Advanced)
            in West Africa;
          </li>
          <li>
            public health research and consulting with ministries, agencies and
            international partners;
          </li>
          <li>
            using data science and AI for research, training and decision-making
            in health.
          </li>
        </ul>
        <p className="text-slate-700">
          This dual perspective (African field experience + international
          standards) allows us to translate your achievements into a narrative
          that makes sense for review committees, attorneys and US authorities.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          What makes us different
        </h2>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            A service designed specifically for African profiles, not a US
            template copy-paste.
          </li>
          <li>
            A structured approach, inspired by USCIS criteria and best practices
            in career evaluation.
          </li>
          <li>
            Clear, pedagogical language, with honest discussion about limits and
            uncertainty.
          </li>
          <li>
            Strict respect for confidentiality and for your professional
            constraints.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Who we work with</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Physicians, pharmacists, advanced practice nurses;</li>
          <li>
            Epidemiologists, biostatisticians, data scientists and digital
            health experts;
          </li>
          <li>
            Researchers, faculty members, global health and public health
            experts;
          </li>
          <li>
            Entrepreneurs and program leaders in health, innovation and health
            AI.
          </li>
        </ul>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          What would it look like to work together?
        </h2>
        <p className="text-slate-700 mb-4">
          Whether you are just exploring options or already advanced in your
          journey, we can help you clarify your strategy, prioritize actions and
          build a realistic plan.
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
            href="mailto:contact@healthacademia.shop"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            📧 Send your CV and project summary
          </a>
          <a
            href="https://wa.me/221771609016"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            target="_blank"
            rel="noreferrer"
          >
            💬 Ask your questions on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
