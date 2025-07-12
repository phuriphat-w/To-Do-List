<script setup>
import { useTodoStore } from '../stores/todo'
import { ref, onMounted } from 'vue'

const todoStore = useTodoStore()
const todoText = ref('')

onMounted(async () => {
  await todoStore.loadTodos()
})

const addTodo = async (todoText) => {
  await todoStore.addTodo(todoText)
}
</script>
<template>
  <div>
    <div>
      <input type="text" v-model="todoText" />
      <button @click="addTodo(todoText)">Add</button>
    </div>
    <ul>
      <li v-for="todo in todoStore.list">
        {{ todo.name }} {{ todo.status }}
        <button>Edit</button>
        <button>Delete</button>
      </li>
    </ul>
  </div>
</template>
