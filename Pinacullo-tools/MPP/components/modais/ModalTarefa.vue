<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Nova Tarefa</h2>
      <input v-model="titulo" placeholder="Título da tarefa" />
      <input v-model="descricao" placeholder="Descrição da tarefa" />
      <div class="modal-actions">
        <button @click="confirmar">Salvar</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const titulo = ref('')
const descricao = ref('')
const emit = defineEmits(['add', 'close'])
const props = defineProps<{ show: boolean }>()

const confirmar = () => {
  if (titulo.value.trim() && descricao.value.trim()) {
    emit('add', {
      titulo: titulo.value.trim(),
      descricao: descricao.value.trim(),
      feito: false
    })
    titulo.value = ''
    descricao.value = ''
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
}
.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
