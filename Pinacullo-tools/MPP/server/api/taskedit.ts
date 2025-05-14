import { createClient } from '@supabase/supabase-js'
import { sanitizeText } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'PUT') {
    return { success: false, message: 'Método não suportado' }
  }

  const body = await readBody<{
    id_project: string
    name_project: string
    date_initial: string
    date_finalization: string
    cost_project: string
  }>(event)

  const id_projeto = sanitizeText(body.id_project)
  const name_project = sanitizeText(body.name_project)
  const date_initial = sanitizeText(body.date_initial)
  const date_finalization = sanitizeText(body.date_finalization)
  const cost_project = sanitizeText(body.cost_project)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { error } = await supabase
    .from('Projetos')
    .update({ name_project, date_initial, date_finalization, cost_project })
    .eq('id_projeto', id_projeto)

  return error
    ? { success: false, message: 'Erro ao editar projeto' }
    : { success: true }
})
