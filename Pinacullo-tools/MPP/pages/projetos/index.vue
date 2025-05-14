<template>
  <div class="container">
    <h1>Projetos</h1>
    <button @click="mostrarModal = true">Adicionar Projeto</button>

    <ModalProjeto
      :show="mostrarModal"
      @close="mostrarModal = false"
      @add="adicionarProjeto"
    />

    <ModalProjetoEdit
      :show="mostrarModalEdit"
      :projeto="projetoSelecionado"
      @close="fecharModalEdit"
      @update="editarProjeto"
    />

    <ul v-if="projetos.length > 0">
      <li
        v-for="projeto in projetos"
        :key="projeto.id_project"
      >
        <strong>{{ projeto.name_project }}</strong><br>
        Cliente ID: {{ projeto.id_costumer }}<br>
        Custo: R$ {{ projeto.cost_project }}<br>
        Início: {{ projeto.date_initial }} | Final: {{ projeto.date_finalization }}<br>

        <button @click="abrirModalEditar(projeto)">Editar</button>
        <button @click="deletarProjeto(projeto.id_project)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModalProjeto from '@/components/modais/ModalProjeto.vue'
import ModalProjetoEdit from '@/components/modais/ModalProjetoEdit.vue'
import { useFetch } from '#app'

const mostrarModal = ref(false)
const mostrarModalEdit = ref(false)
const projetoSelecionado = ref(null)
const projetos = ref<any[]>([])

const carregarProjetos = async () => {
  const { data } = await useFetch('/api/projetosall') // endpoint de listagem
  if (data.value) projetos.value = data.value
}

const adicionarProjeto = (novoProjeto: any) => {
  projetos.value.push(novoProjeto)
  mostrarModal.value = false
}

const abrirModalEditar = (projeto: any) => {
  projetoSelecionado.value = { ...projeto }
  mostrarModalEdit.value = true
}

const fecharModalEdit = () => {
  mostrarModalEdit.value = false
  projetoSelecionado.value = null
}

const editarProjeto = (projetoEditado: any) => {
  const index = projetos.value.findIndex(p => p.id_project === projetoEditado.id_project)
  if (index !== -1) projetos.value[index] = projetoEditado
  fecharModalEdit()
}

const deletarProjeto = async (id: string) => {
  const { data } = await useFetch('/api/delete', {
    method: 'DELETE',
    body: { id_project: id }
  })
  if (data.value?.success) {
    projetos.value = projetos.value.filter(p => p.id_project !== id)
  }
}

onMounted(() => {
  carregarProjetos()
})
</script>

<style scoped>
.container {
  padding: 20px;
}
.container button {
  margin: 10px 5px;
}
li {
  margin-bottom: 15px;
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
