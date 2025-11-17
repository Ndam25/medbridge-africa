// app/en/login/page.tsx

export default function LoginPageEn() {
  return (
    <main className="max-w-xl mx-auto px-4 py-24 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Sign in to your MedBridge Africa space
      </h1>

      <p className="text-slate-700">
        This private area will soon allow clients and accompanied individuals to
        follow their EB-1A / EB-2 NIW case, access resources and receive
        personalized updates.
      </p>

      <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm space-y-4">
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          🚧 Feature under development. Online login will be available in a
          future release.
        </p>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-800">Email address</label>
            <input
              disabled
              placeholder="Your email (coming soon)"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-slate-800">Password</label>
            <input
              disabled
              type="password"
              placeholder="Your password (coming soon)"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
            />
          </div>

          <button
            disabled
            className="w-full rounded-xl bg-slate-300 py-2 text-slate-700 cursor-not-allowed"
          >
            Login coming soon
          </button>
        </form>
      </div>

      <div className="text-sm text-slate-700 space-y-2">
        <p>In the meantime, you can:</p>
        <ul className="list-disc list-inside">
          <li>
            Complete the{" "}
            <a
              href="/en/evaluation"
              className="font-semibold text-emerald-700 hover:underline"
            >
              EB-1A / EB-2 NIW pre-evaluation
            </a>
          </li>
          <li>Book a call to discuss your case and objectives.</li>
        </ul>
      </div>
    </main>
  );
}
