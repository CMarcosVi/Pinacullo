import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return { success: false, message: 'Método não suportado' }
  }

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { data, error } = await supabase
    .from('Projetos')
    .select('*')
    .order('nome', { ascending: true })

  return error
    ? { success: false, message: 'Erro ao buscar projetos' }
    : { success: true, projetos: data }
})
