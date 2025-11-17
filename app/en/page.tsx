import Link from "next/link";

export default function HomePageEn() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 space-y-12">
      {/* Badge */}
      <div className="inline-block rounded-full bg-emerald-50 px-4 py-1 border border-emerald-200 text-emerald-800 text-sm font-semibold">
        New · EB-1A &amp; EB-2 NIW Pre-Evaluation
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
        Bridging African health talents with academic and professional
        opportunities in the United States.
      </h1>

      {/* Intro */}
      <p className="text-lg text-slate-700 max-w-3xl">
        MedBridge Africa supports physicians, researchers, data scientists and
        public health leaders in securing U.S. skilled-immigration pathways
        (EB-1A, EB-2 NIW) and building sustainable international careers.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/en/evaluation"
          className="rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold hover:bg-emerald-800"
        >
          Start the pre-evaluation
        </Link>

        <Link
          href="/en/services"
          className="rounded-xl border border-slate-300 px-6 py-3 text-slate-800 font-semibold hover:bg-slate-50"
        >
          Discover our services
        </Link>
      </div>

      {/* Key bullets */}
      <div className="space-y-3 text-slate-700">
        <p>✔ Quick indication of your EB-1A / EB-2 NIW potential</p>
        <p>✔ Clear roadmap to strengthen your profile and evidence</p>
        <p>✔ Tailored approach for African health and research professionals</p>
      </div>

      {/* Who for */}
      <section className="space-y-6 mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Who is this for?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>Medical doctors, pharmacists, specialized nurses</li>
          <li>Epidemiologists, biostatisticians, data scientists</li>
          <li>Researchers, faculty, and global health experts</li>
          <li>Health entrepreneurs and program leaders</li>
        </ul>
      </section>

      {/* Welcome */}
      <section className="space-y-4 pt-10 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">Welcome 👋</h2>
        <p className="text-slate-700 max-w-3xl">
          MedBridge Africa helps African health professionals, researchers and
          innovators navigate U.S. immigration categories such as EB-1A and
          EB-2 NIW. We focus on aligning your achievements, evidence and
          project with what decision-makers expect to see.
        </p>
      </section>
    </main>
  );
}
