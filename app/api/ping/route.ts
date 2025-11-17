import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({
      ok: false,
      message: '⚠️ Variables d’environnement manquantes.',
    })
  }

  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase.from('leads').select('count').limit(1)

    if (error) throw error

    return NextResponse.json({
      ok: true,
      message: '✅ Connexion Supabase réussie.',
      table: 'leads',
      sample: data,
    })
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      message: '❌ Erreur de connexion.',
      error: e.message,
    })
  }
}
