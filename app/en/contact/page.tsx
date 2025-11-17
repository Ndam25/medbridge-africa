export default function ContactPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact</h1>
      <p className="text-slate-700">
        You can contact MedBridge Africa to discuss your profile, request a
        pre-evaluation review or explore potential collaboration.
      </p>

      <div className="space-y-2 text-slate-700">
        <p>
          📧 Email:{" "}
          <a
            href="mailto:contact@healthacademia.shop"
            className="text-emerald-700 font-semibold hover:underline"
          >
            contact@healthacademia.shop
          </a>
        </p>
        <p>
          💬 WhatsApp:{" "}
          <a
            href="https://wa.me/221771609016"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 font-semibold hover:underline"
          >
            +221 77 160 90 16
          </a>
        </p>
        <p>
          📅 Book a 30-minute call:{" "}
          <a
            href="https://calendly.com/adama-ndir/30min"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Calendly MedBridge Africa
          </a>
        </p>
      </div>
    </main>
  );
}
