<script setup>
import { useTodoStore } from '../stores/todo'
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false
  } catch (error) {
    console.log('Failed to load data')
  }
})

const addTodo = async (todoText) => {
  try {
    isLoading.value = true
    await todoStore.addTodo(todoText)
    isLoading.value = false
  } catch (error) {
    console.log('Failed to add data')
  }
}

const deleteTodo = async (todoId) => {
  try {
    isLoading.value = true
    await todoStore.removeTodo(todoId)
    await todoStore.loadTodos()
    isLoading.value = false
  } catch (error) {
    console.log('Failed to remove data')
  }
}

const editStatus = async (todoId, todoData) => {
  try {
    isLoading.value = true
    const updateData = {
      name: todoData.name,
      status: todoData.status,
    }
    console.log('Sending name = ', updateData.name)
    console.log('Sending status = ', updateData.status)

    await todoStore.editTodo(updateData, todoId)
    isLoading.value = false
  } catch (error) {
    console.log('Failed to edit status')
  }
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
        {{ todo.name }}
        <select v-model="todo.status" @change="editStatus(todo.id, todo)">
          <option>Select status</option>
          <option v-for="status in todoStore.status" :value="status">
            {{ status }}
          </option>
        </select>
        <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }">
          <button>Edit</button>
        </RouterLink>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <div v-if="isLoading">
      <h2>Loading</h2>
    </div>
  </div>
</template>
