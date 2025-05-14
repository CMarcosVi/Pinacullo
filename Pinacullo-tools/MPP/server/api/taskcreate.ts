import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name_task,id_project, infos } = body

  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)

  const { error } = await supabase
    .from('Tasks')
    .insert({ name_task,id_project, infos })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true }
})
