<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1>Login</h1>
      <input v-model="access" type="text" placeholder="Access" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#app'
import { definePageMeta } from '#imports'
import { sanitizeAccess, sanitizePassword } from '../utils/sanitization'

definePageMeta({ layout: 'blank' })

const router = useRouter()
const access = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  const sanitizedAccess = sanitizeAccess(access.value)
  const sanitizedPassword = sanitizePassword(password.value)
  type LoginResponse = { success: true; token: string } | { success: false };
  try {
    const { data } = await useFetch<LoginResponse>('/api/login', {
      method: 'POST',
      body: {
        access: sanitizedAccess,
        password: sanitizedPassword
      }
    })
    if (!data.value?.success) {
      errorMessage.value = 'Credenciais inválidas'
      return
    }
    const tokenCookie = useCookie('auth_token', {
      maxAge: 60 * 60 * 24,
      httpOnly: false,
      secure: true,
      sameSite: 'strict'
    })
    tokenCookie.value = data.value.token
    router.push('/deashboard')
  } catch (e) {
    errorMessage.value = 'Erro interno. Tente novamente.'
    console.error(e)
  }
}
</script>


<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f3f3f3;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
