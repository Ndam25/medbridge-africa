export const dynamic = 'force-dynamic'; // ou 'auto'
export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}
