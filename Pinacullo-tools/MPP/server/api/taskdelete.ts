import { createClient } from '@supabase/supabase-js'
import { sanitizeText } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'DELETE') {
    return { success: false, message: 'Método não suportado' }
  }

  const body = await readBody<{ name_task: string }>(event)
  const name_task = sanitizeText(body.name_task)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { error } = await supabase
    .from('Tasks')
    .delete()
    .eq('name_task', name_task)

  return error
    ? { success: false, message: 'Erro ao deletar projeto' }
    : { success: true }
})
