<template>
  <div class="container">
    <h1>Clientes</h1>
    <button @click="mostrarModal = true">Adicionar Cliente</button>

    <ModalCliente
      :show="mostrarModal"
      @close="mostrarModal = false"
      @add="adicionarCliente"
    />

    <ModalClienteEdit
      :show="mostrarModalEdit"
      :cliente="clienteSelecionado"
      @close="fecharModalEdit"
      @update="editarCliente"
    />

    <ul v-if="clientes?.clientes">
      <li v-for="cliente in clientes.clientes" :key="cliente.id_customer">
        {{ cliente.name_enterprise }} - R$ {{ cliente.sell_price }}
        <button @click="abrirModalEdicao(cliente)">Editar</button>
        <button @click="deletarCliente(cliente.id_customer)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
import ModalCliente from '@/components/modais/ModalCliente.vue'
import ModalClienteEdit from '@/components/modais/ModalClienteEdit.vue'

interface ClienteForm {
  name_enterprise: string
  id_customer: string
  sell_price: string
}

const mostrarModal = ref(false)
const mostrarModalEdit = ref(false)
const clienteSelecionado = ref<ClienteForm | null>(null)

const abrirModalEdicao = (cliente: ClienteForm) => {
  clienteSelecionado.value = { ...cliente }
  mostrarModalEdit.value = true
}

const fecharModalEdit = () => {
  mostrarModalEdit.value = false
  clienteSelecionado.value = null
}

const adicionarCliente = async (dados: Omit<ClienteForm, 'sell_price'> & { sell_price: number }) => {
  try {
    const response = await fetch('/api/clientescreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const result = await response.json()

    if (result.success) {
      alert('Cliente adicionado com sucesso!')
      await refresh()
    } else {
      alert(`Erro ao adicionar cliente: ${result.message}`)
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    alert('Ocorreu um erro ao adicionar o cliente.')
  }
}

const editarCliente = async (dados: ClienteForm) => {
  try {
    const response = await fetch('/api/clientes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const result = await response.json()

    if (result.success) {
      alert('Cliente atualizado com sucesso!')
      fecharModalEdit()
      await refresh()
    } else {
      alert(`Erro ao atualizar cliente: ${result.message}`)
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    alert('Ocorreu um erro ao atualizar o cliente.')
  }
}
const deletarCliente = async (id_customer: string) => {
  if (!confirm('Tem certeza que deseja deletar este cliente?')) return

  try {
    const response = await fetch('/api/clientesdelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_customer })
    })

    const result = await response.json()

    if (result.success) {
      alert('Cliente deletado com sucesso!')
      await refresh()
    } else {
      alert(`Erro ao deletar cliente: ${result.message}`)
    }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    alert('Ocorreu um erro ao deletar o cliente.')
  }
}
// Busca segura dos clientes
const { data: clientes, refresh } = await useFetch<{
  success: boolean
  clientes: ClienteForm[]
}>('/api/clientesall', {
  method: 'POST',
  body: {},
  server: true,
  lazy: false
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
