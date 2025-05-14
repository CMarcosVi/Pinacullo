<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Editar Projeto</h2>

      <form @submit.prevent="salvarEdicao">
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

        <div class="buttons">
          <button type="submit">Salvar Alterações</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'

const props = defineProps<{
  show: boolean
  projeto: {
    id_project: string
    name_project: string
    id_costumer: string
    date_initial: string
    date_finalization: string
    cost_project: number
  } | null
}>()

const emit = defineEmits(['close', 'update'])

const form = reactive({
  id_project: '',
  name_project: '',
  id_costumer: '',
  date_initial: '',
  date_finalization: '',
  cost_project: 0
})

watch(() => props.projeto, (novoProjeto) => {
  if (novoProjeto) {
    Object.assign(form, novoProjeto)
  }
})

const salvarEdicao = async () => {
  const res = await $fetch('/api/projetoedit', {
    method: 'PUT',
    body: {
      id_project: form.id_project,
      name_project: form.name_project,
      date_initial: form.date_initial,
      date_finalization: form.date_finalization,
      cost_project: String(form.cost_project), // pois o backend espera como string
    }
  })

  if (res?.success) {
    emit('update', { ...form })
  }

  emit('close')
}
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
