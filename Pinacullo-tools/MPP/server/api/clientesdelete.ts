import { createClient } from '@supabase/supabase-js'
import { sanitizeText } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'DELETE') {
    return { success: false, message: 'Método não suportado' }
  }

  const { id_customer } = await readBody(event)
  const idSanitized = sanitizeText(id_customer)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { error } = await supabase
    .from('Customers')
    .delete()
    .eq('id_customer', idSanitized)

  return error ? { success: false, message: 'Erro ao excluir cliente' } : { success: true }
})
