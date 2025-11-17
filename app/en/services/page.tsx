export default function ServicesPageEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 space-y-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Services</h1>

      <section className="space-y-8">
        {/* 1. Pre-evaluation / Strategy */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            EB-1A / EB-2 NIW Pre-Evaluation &amp; Strategy
          </h2>
          <p className="text-slate-700">
            A structured review of your academic, scientific and professional
            background to assess potential eligibility and define the most
            realistic pathway.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Score-based indication of EB-1A / EB-2 NIW potential</li>
            <li>Strengths and gaps analysis</li>
            <li>Tailored action plan to reinforce your profile</li>
          </ul>
        </div>

        {/* 2. Coaching */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            Case-Building &amp; Career Coaching
          </h2>
          <p className="text-slate-700">
            We help you organize your evidence, improve your visibility and
            align your career trajectory with immigration requirements.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Publication and citation strategy</li>
            <li>Leadership, impact and national importance framing</li>
            <li>Guidance on recommendation letters and documentation</li>
          </ul>
        </div>

        {/* 3. Institutional advisory */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            Advisory for Institutions &amp; Programs
          </h2>
          <p className="text-slate-700">
            Support for universities, research units, NGOs and health programs
            working with African talent and international mobility.
          </p>
          <p className="text-slate-700 text-sm">
            Focus areas may include scientific communication, evaluation
            frameworks, capacity building and strategic positioning.
          </p>
        </div>
      </section>
    </main>
  );
}
