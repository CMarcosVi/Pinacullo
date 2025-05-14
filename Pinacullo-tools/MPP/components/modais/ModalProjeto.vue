<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Novo Projeto</h2>

      <form @submit.prevent="criarProjeto">
        <label>Nome do Projeto</label>
        <input v-model="form.name_project" type="text" required />

        <label>ID do Cliente</label>
        <input v-model="form.id_costumer" type="text" required />

        <label>Data Inicial</label>
        <input v-model="form.date_initial" type="date" required />

        <label>Data de Finalização</label>
        <input v-model="form.date_finalization" type="date" required />

        <label>Custo do Projeto</label>
        <input v-model.number="form.cost_project" type="number" required />

        <div class="modal-actions">
          <button type="submit">Salvar</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{ show: boolean }>()
const emit = defineEmits(['add', 'close'])

const form = reactive({
  name_project: '',
  id_costumer: '',
  date_initial: '',
  date_finalization: '',
  cost_project: 0
})

const criarProjeto = async () => {
  const res = await $fetch<{ success: boolean }>('/api/projectscreate', {
    method: 'POST',
    body: { ...form }
  })

  if (res?.success) {
    emit('add', { ...form })
    emit('close')
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}
.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
