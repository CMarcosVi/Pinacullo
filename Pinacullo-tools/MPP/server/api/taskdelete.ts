import { createClient } from '@supabase/supabase-js'
import { sanitizeText } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'DELETE') {
    return { success: false, message: 'Método não suportado' }
  }

  const body = await readBody<{ id_project: string }>(event)
  const id_projeto = sanitizeText(body.id_project)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { error } = await supabase
    .from('Projetos')
    .delete()
    .eq('id_projeto', id_projeto)

  return error
    ? { success: false, message: 'Erro ao deletar projeto' }
    : { success: true }
})
