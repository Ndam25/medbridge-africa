// app/en/evaluation/page.tsx

export default function EvaluationEnPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        EB-1A / EB-2 NIW Pre-Evaluation
      </h1>
      <p className="text-slate-700">
        This short pre-evaluation helps estimate your eligibility for EB-1A or
        EB-2 NIW and generates an indicative report with recommendations.
      </p>

      <p className="text-sm text-slate-600">
        The full form takes around 10–15 minutes to complete. Please answer as
        honestly and precisely as possible.
      </p>

      <a
        href="/evaluation-form-en.html"
        className="inline-block mt-4 bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800"
      >
        Open the full form
      </a>

      <p className="text-xs text-slate-500 mt-4">
        The report generated is indicative only and does not constitute legal
        advice.
      </p>
    </main>
  );
}
