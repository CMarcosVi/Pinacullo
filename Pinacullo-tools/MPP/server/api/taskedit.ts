import { createClient } from '@supabase/supabase-js'
import { sanitizeText } from '~/utils/sanitization'

export default defineEventHandler(async (event) => {
  if (event.method !== 'PUT') {
    return { success: false, message: 'Método não suportado' }
  }

  const body = await readBody<{
    name_task: string
    id_project: string
    infos: string
  }>(event)

  const name_task = sanitizeText(body.name_task)
  const id_project = sanitizeText(body.id_project)
  const infos = sanitizeText(body.infos)

  const supabase = createClient(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseKey
  )

  const { error } = await supabase
    .from('Tasks')
    .update({ name_task, id_project, infos})
    .eq('name_task', name_task)

  return error
    ? { success: false, message: 'Erro ao editar projeto' }
    : { success: true }
})
