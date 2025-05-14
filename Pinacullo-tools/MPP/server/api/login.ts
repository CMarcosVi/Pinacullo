import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { access, password } = body

  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)

  // 1. Verifica se o usuário existe
  const { data: user, error } = await supabase
    .from('Users')
    .select('*')
    .eq('access', access)
    .eq('password', password)
    .single()

  if (error || !user) {
    return { success: false }
  }

  // 2. Gera token
  const token = crypto.randomUUID()

  // 3. Atualiza o usuário com o token gerado
  const { error: updateError } = await supabase
    .from('Users')
    .update({ token })
    .eq('access', access)

  if (updateError) {
    console.error('Erro ao salvar token:', updateError)
    return { success: false }
  }

  // 4. Retorna o token para uso (ex: armazenar em cookie)
  return {
    success: true,
    token
  }
})
