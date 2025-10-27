// /app/[lang]/(main)/evaluation/page.tsx

import { FormEvaluation } from './components/FormEvaluation'
import { getDictionary, Locale } from '@/lib/i18n'
import { Metadata } from 'next'

// Metadata bilingue
export const generateMetadata = ({ params }: { params: { lang: Locale } }): Metadata => {
    const t = getDictionary(params.lang)
    return {
        title: t.evaluation_page.title + ' | MedBridge Africa'
    }
}

export default function EvaluationPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang)

  return (
    <div className="bg-mba-light py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-mba-blue">{t.evaluation_page.title}</h1>
          <p className="mt-3 text-lg text-gray-600">{t.evaluation_page.subtitle}</p>
        </div>
        
        {/* Intégration du composant de formulaire */}
        <FormEvaluation lang={params.lang} />
        
        {/* Note sur la confidentialité */}
        <p className="mt-8 text-center text-sm text-gray-500">
            {params.lang === 'fr' ? 'Vos données sont traitées de manière confidentielle et sécurisée (Supabase).' : 'Your data is processed confidentially and securely (Supabase).'}
        </p>
      </div>
    </div>
  )
}
