"use client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function ContactPage() {
  return (
    <main className="pt-20 mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#0D3B66] mb-6">
        Contactez-nous
      </h1>
      <p className="text-slate-700 mb-4">
        Cette page est en cours de développement.<br />
        Pour toute question, écrivez-nous à&nbsp;
        <a
          href="mailto:contact@medbridgeafrica.org"
          className="text-blue-600 underline"
        >
          contact@medbridgeafrica.org
        </a>.
      </p>
    </main>
  )
}