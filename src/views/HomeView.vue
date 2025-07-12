<script setup>
import { useTodoStore } from '../stores/todo'
import { ref, onMounted } from 'vue'

const todoStore = useTodoStore()
const todoText = ref('')

onMounted(async () => {
  try {
    await todoStore.loadTodos()
  } catch (error) {
    console.log('Failed to load data')
  }
})

const addTodo = async (todoText) => {
  try {
    await todoStore.addTodo(todoText)
  } catch (error) {
    console.log('Failed to add data')
  }
}

const deleteTodo = async (todoId) => {
  try {
    await todoStore.removeTodo(todoId)
    await todoStore.loadTodos()
  } catch (error) {
    console.log('Failed to remove data')
  }
}

const editStatus = async (todoId, todoData) => {
  try {
    const updateData = {
      name: todoData.name,
      status: todoData.status,
    }
    console.log('Sending name = ', updateData.name)
    console.log('Sending status = ', updateData.status)

    await todoStore.editTodo(updateData, todoId)
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
        <button>Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
