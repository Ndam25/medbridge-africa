// /app/[lang]/(main)/rapport-demo/page.tsx

import { Suspense } from 'react'
import { ReportView } from './components/ReportView' // Composant d'affichage de rapport
import { getDictionary, Locale } from '@/lib/i18n'
import { AlertCircle } from 'lucide-react'

// Wrapper pour utiliser les useSearchParams
const ReportPageContent = ({ lang }: { lang: Locale }) => {
    const t = getDictionary(lang)
    
    return (
        <div className="bg-white py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-mba-blue">{t.common.evaluation} — Résultats Provisoires</h1>
                    <p className="mt-2 text-gray-600">
                        {lang === 'fr' ? 'Ceci est l\'affichage des métadonnées de votre évaluation soumise (ID du brouillon).' : 'This is the metadata display of your submitted evaluation (Draft ID).'}
                    </p>
                </div>
                
                {/* ReportView doit lire le paramètre 'id' de l'URL pour fetcher les scores 
                  depuis Supabase et afficher un aperçu du rapport.
                */}
                <ReportView lang={lang} /> 
                
                <div className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                        {lang === 'fr' ? "Le rapport complet (modèle PDF/HTML interactif) est stocké et sera analysé par un conseiller MedBridge. Vous serez recontacté sous 48h." : "The full report (interactive PDF/HTML template) is stored and will be analyzed by a MedBridge advisor. You will be contacted within 48 hours."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function RapportDemoPage({ params }: { params: { lang: Locale } }) {
    return (
        <Suspense fallback={<div className="text-center p-12 text-mba-blue">Chargement...</div>}>
            <ReportPageContent lang={params.lang} />
        </Suspense>
    )
}
