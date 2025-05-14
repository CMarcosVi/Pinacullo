import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export const supabase = (): SupabaseClient => {
  if (client) return client

  const config = useRuntimeConfig()

  return createClient(
    config.supabaseUrl,
    config.supabaseKey
  )
}
