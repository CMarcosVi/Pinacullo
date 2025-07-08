<template>
  <div class="container">
    <h1>Tarefas</h1>
    <button @click="abrir = true">Criar nova tarefa</button>

    <ModalTarefa :show="abrir" @add="adicionarTarefa" @close="abrir = false" />

    <ul>
      <li v-for="(tarefa, index) in tarefas" :key="index">
        <div>
          <strong>{{ tarefa.titulo }}</strong> – {{ tarefa.descricao }}
        </div>
        <div>
          <em>Status: {{ tarefa.feito ? 'Feito' : 'Pendente' }}</em>
        </div>
        <button @click="abrirEditar(tarefa, index)">Editar</button>
        <button @click="alternarStatus(index)">
          {{ tarefa.feito ? 'Desfazer' : 'Concluir' }}
        </button>
        <button @click="remover(index)">Excluir</button>
      </li>
    </ul>
    <ModalTaskEdit
      :show="mostrarEdit"
      :tarefa="tarefaEdit"
      @update="atualizarTarefa"
      @close="mostrarEdit = false"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import ModalTarefa   from '@/components/modais/ModalTask.vue'
import ModalTaskEdit from '@/components/modais/ModalTaskEdit.vue'
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'default' })

interface Tarefa {
  titulo: string
  descricao: string
  feito: boolean
}

/* ------------------ states ------------------ */
const abrirCriar  = ref(false)
const mostrarEdit = ref(false)
const tarefas     = ref<Tarefa[]>([])

/* referência à tarefa/índice que está sendo editado */
const tarefaEdit   = ref<Tarefa | null>(null)
const indiceEdit   = ref<number | null>(null)

/* ------------------ handlers ------------------ */
const adicionarTarefa = (t: Tarefa) => tarefas.value.push(t)

const alternarStatus  = (i: number) =>
  (tarefas.value[i].feito = !tarefas.value[i].feito)

const remover = (i: number) => tarefas.value.splice(i, 1)

/* abrir modal para editar uma tarefa existente */
const abrirEditar = (tarefa: Tarefa, index: number) => {
  tarefaEdit.value = { ...tarefa }   // cópia para edição local
  indiceEdit.value = index
  mostrarEdit.value = true
}

/* receber tarefa atualizada vinda do modal */
const atualizarTarefa = (tarefaAtualizada: Tarefa) => {
  if (indiceEdit.value !== null)
    tarefas.value[indiceEdit.value] = tarefaAtualizada
  mostrarEdit.value = false
}
</script>

<style scoped>
.tarefas {
  padding: 20px;
}
.form-tarefa {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.lista-tarefas {
  list-style: none;
  padding: 0;
}
.lista-tarefas li {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}
.lista-tarefas li.feita {
  background-color: #e0ffe0;
}
.lista-tarefas input {
  padding: 5px;
}
</style>
