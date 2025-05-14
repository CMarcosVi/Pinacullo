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
        <button @click="alternarStatus(index)">
          {{ tarefa.feito ? 'Desfazer' : 'Concluir' }}
        </button>
        <button @click="remover(index)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalTarefa from '@/components/modais/ModalTarefa.vue'
import { definePageMeta } from '#imports'



interface Tarefa {
  titulo: string
  descricao: string
  feito: boolean
}

const abrir = ref(false)
const tarefas = ref<Tarefa[]>([])

const adicionarTarefa = (tarefa: Tarefa) => {
  tarefas.value.push(tarefa)
}

const alternarStatus = (index: number) => {
  tarefas.value[index].feito = !tarefas.value[index].feito
}

const remover = (index: number) => {
  tarefas.value.splice(index, 1)
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
