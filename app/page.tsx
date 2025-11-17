import Hero from './components/Hero'

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />

<section className="mx-auto max-w-5xl px-6 py-12 text-center">
  <h2 className="text-xl font-semibold text-slate-900">Bienvenue 👋</h2>
  <p className="mt-3 text-sm md:text-base text-slate-700">
    MedBridge Africa accompagne les professionnels de santé, chercheurs et
    entrepreneurs africains dans la préparation de leurs projets
    d&apos;immigration qualifiée vers les États-Unis, avec un focus sur les
    catégories EB-1A et EB-2 NIW.
  </p>
</section>

    </main>
  )
}




