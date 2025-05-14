// server/api/clientesall.ts
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
    .from('Tasks')
    .select('*')
    .order('name_task', { ascending: true })

  return error
    ? { success: false, message: 'Erro ao buscar clientes' }
    : { success: true, clientes: data }
})
