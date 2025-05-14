// server/api/clientescreate.ts
import { createClient } from '@supabase/supabase-js'
import { sanitizeText, sanitizeNumber } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  interface ClienteForm {
    name_enterprise: string
    id_customer: string
    sell_price: number
  }

  const body = await readBody<ClienteForm>(event)

  const name_enterprise_sanitize = sanitizeText(body.name_enterprise)
  const id_customer_sanitize = sanitizeText(body.id_customer)
  const sell_price_sanitize = sanitizeNumber(body.sell_price)

  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)

  // Verifica se já existe cliente com o mesmo ID
  const { data: clienteExistente, error: errorConsulta } = await supabase
    .from('Customers')
    .select('id')
    .eq('id_customer', id_customer_sanitize)
    .maybeSingle()

  if (errorConsulta) {
    return { success: false, message: 'Erro ao adicionar cliente' }
  }

  if (clienteExistente) {
    return { success: false, message: 'Erro ao adicionar cliente' }
  }

  const { error: erroInsercao } = await supabase
    .from('Customers')
    .insert({
      name_enterprise: name_enterprise_sanitize,
      id_customer: id_customer_sanitize,
      sell_price: sell_price_sanitize
    })

  if (erroInsercao) {
    return { success: false, message: 'Erro ao adicionar cliente' }
  }

  return { success: true }
})
