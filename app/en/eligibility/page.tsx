// app/en/eligibility/page.tsx

export default function EligibilityPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Quick Eligibility Check
      </h1>
      <p className="text-slate-700">
        This quick form allows you to share a few key elements of your profile
        so we can indicate whether an EB-1A or EB-2 NIW strategy might be
        worth exploring.
      </p>
      <p className="text-sm text-slate-600">
        You will receive a short summary and next-step suggestions based on
        the information you provide.
      </p>

      <a
        href="/evaluation-form-en.html"
        className="inline-block mt-4 bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800"
      >
        Start the quick check
      </a>
    </main>
  );
}
