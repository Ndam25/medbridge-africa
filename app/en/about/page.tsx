export default function AboutPageEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">
        About MedBridge Africa
      </h1>

      <p className="text-slate-700 leading-relaxed max-w-3xl">
        MedBridge Africa connects African health professionals, researchers and
        innovators with high-level academic and professional opportunities,
        particularly through U.S. immigration categories such as EB-1A and
        EB-2 NIW. We combine field experience in public health, epidemiology and
        data science with a structured, evidence-based approach.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
        <p className="text-slate-700">
          To help African talents transform their expertise and impact into
          clear, structured evidence that can support international mobility
          and long-term career development.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Who We Work With
        </h2>
        <ul className="list-disc list-inside space-y-1 text-slate-700">
          <li>Medical doctors, pharmacists and public health professionals</li>
          <li>Researchers, faculty, and scientific leaders</li>
          <li>Data scientists, epidemiologists, biostatisticians</li>
          <li>Health entrepreneurs and program managers</li>
        </ul>
      </section>
    </main>
  );
}
