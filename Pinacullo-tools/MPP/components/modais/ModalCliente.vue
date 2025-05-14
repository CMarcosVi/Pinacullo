<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-content">
      <h2>Novo Cliente</h2>
      <input v-model="form.name_enterprise" placeholder="Nome da empresa" />
      <input v-model="form.id_customer" placeholder="ID do cliente" />
      <input v-model.number="form.sell_price" type="number" placeholder="Preço de venda" />
      <div class="modal-actions">
        <button @click="confirmar">Salvar</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ClienteForm {
  name_enterprise: string
  id_customer: string
  sell_price: number
}

const emit = defineEmits<{
  (e: 'add', payload: ClienteForm): void
  (e: 'close'): void
}>()

const props = defineProps<{ show: boolean }>()

const form = ref<ClienteForm>({
  name_enterprise: '',
  id_customer: '',
  sell_price: 0
})

const confirmar = () => {
  const { name_enterprise, id_customer, sell_price } = form.value
  if (name_enterprise.trim() && id_customer.trim() && sell_price > 0) {
    emit('add', {
      name_enterprise: name_enterprise.trim(),
      id_customer: id_customer.trim(),
      sell_price
    })
    form.value = { name_enterprise: '', id_customer: '', sell_price: 0 }
    emit('close')
  } else {
    alert('Preencha todos os campos corretamente.')
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
