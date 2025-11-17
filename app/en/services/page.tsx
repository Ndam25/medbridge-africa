export default function ServicesPageEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Services</h1>

      <section className="space-y-8">
        {/* Block 1 */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            EB-1A / EB-2 NIW Pre-Evaluation & Strategy
          </h2>
          <p className="text-slate-700">
            A clear, structured analysis of your academic, scientific and
            professional achievements to determine eligibility and define the
            best immigration pathway.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Eligibility scoring</li>
            <li>Strengths & gaps analysis</li>
            <li>Personalized action plan</li>
          </ul>
        </div>

        {/* Block 2 */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            Career & Case-Building Coaching
          </h2>
          <p className="text-slate-700">
            Hands-on guidance to strengthen your case: publications, citations,
            letters of recommendation, project impact, and visibility strategy.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li>Publication & dissemination strategy</li>
            <li>Impact & national importance alignment</li>
            <li>Recommendation letters guidance</li>
          </ul>
        </div>

        {/* Block 3 */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            Advisory for Institutions & Health Programs
          </h2>
          <p className="text-slate-700">
            Support to universities, research groups, NGOs and health programs
            on scientific communication, evaluation frameworks, and program
            design.
          </p>
        </div>
      </section>
    </main>
  );
}

