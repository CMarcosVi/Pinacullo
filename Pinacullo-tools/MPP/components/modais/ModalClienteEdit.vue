<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Editar Cliente</h2>
      <input v-model="form.name_enterprise" placeholder="Nome da empresa" />
      <input v-model="form.id_customer" placeholder="ID do cliente" disabled />
      <input v-model.number="form.sell_price" type="number" placeholder="Preço de venda" />
      <div class="modal-actions">
        <button @click="confirmar">Salvar</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface ClienteForm {
  name_enterprise: string
  id_customer: string
  sell_price: string
}

const props = defineProps<{
  show: boolean
  cliente: ClienteForm | null
}>()

const emit = defineEmits<{
  (e: 'update', payload: ClienteForm): void
  (e: 'close'): void
}>()

const form = ref<ClienteForm>({
  name_enterprise: '',
  id_customer: '',
  sell_price: '0'
})

watch(
  () => props.cliente,
  (novoCliente) => {
    if (novoCliente) {
      form.value = { ...novoCliente }
    }
  },
  { immediate: true }
)

const confirmar = () => {
  if (form.value.name_enterprise.trim() && form.value.sell_price) {
    emit('update', form.value)
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
