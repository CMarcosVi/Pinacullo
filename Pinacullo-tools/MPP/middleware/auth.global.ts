// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie, useRuntimeConfig } from '#imports'
import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  // Permitir acesso à página de login sem verificação
  if (to.path === '/login') return

  // Acessar o cookie 'auth_token'
  const token = useCookie('auth_token')

  // Se o token não existir, redirecionar para a página de login
  if (!token.value) {
    return navigateTo('/login')
  }
  // Verificação adicional no lado do servidor
  if (import.meta.env.SSR) {
    const config = useRuntimeConfig()
    const supabase = createClient(config.supabaseUrl, config.supabaseKey)

    // Verificar se o token existe na tabela 'Users'
    const { data, error } = await supabase
      .from('Users')
      .select('id')
      .eq('token', token.value)
      .single()

    if (error || !data) {
      return navigateTo('/login')
    }
  }
})
