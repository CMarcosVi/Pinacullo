import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name_project, id_costumer, id_project, date_initial, date_finalization, cost_project } = body

  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)

  const { error } = await supabase
    .from('Projects')
    .insert({ name_project, id_costumer, id_project, date_initial, date_finalization, cost_project })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true }
})
