<template>
  <div class="error-page">
    <h1>Erro {{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404">
      Página não encontrada.
    </p>
    <p v-else>
      Ocorreu um erro inesperado.
    </p>

    <NuxtLink to="/deashboard" class="btn-voltar">Voltar para o início</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()
</script>

<style scoped>
.error-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
}

.error-page h1 {
  font-size: 5rem;
  color: #ff4444;
}

.btn-voltar {
  padding: 10px 20px;
  background-color: #222;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
.btn-voltar:hover {
  background-color: #444;
}
</style>
