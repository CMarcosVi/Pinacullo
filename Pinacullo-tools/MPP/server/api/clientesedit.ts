import { createClient } from '@supabase/supabase-js'
import { sanitizeText, sanitizeNumber } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'PUT') {
    return { success: false, message: 'Método não suportado' }
  }

  const { name_enterprise, id_customer, sell_price } = await readBody(event)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const updateResult = await supabase
    .from('Customers')
    .update({
      name_enterprise: sanitizeText(name_enterprise),
      sell_price: sanitizeNumber(sell_price)
    })
    .eq('id_customer', sanitizeText(id_customer))

  return updateResult.error ? { success: false, message: 'Erro ao editar cliente' } : { success: true }
})
