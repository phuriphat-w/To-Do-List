<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)

const todoStore = useTodoStore()

onMounted(async () => {
  try {
    todoId.value = parseInt(route.params.id)
    console.log(todoStore.selectedTodo)
    await todoStore.loadTodo(todoId.value)
    isLoaded.value = true
  } catch (error) {
    console.log('Failed to load data')
  }
})

const editTodo = async (selectedTodo) => {
  try {
    const updateData = {
      name: selectedTodo.name,
      status: selectedTodo.status,
    }
    console.log('Sending name = ', updateData.name)
    console.log('Sending status = ', updateData.status)

    await todoStore.editTodo(updateData, todoId.value)
    alert('Edit completed!')
  } catch (error) {
    console.log('Failed to edit status')
  }
}
</script>

<template>
  <div>
    <div>Edit</div>
    <div v-if="isLoaded">id {{ todoId }}</div>
    <div v-else>Loading...</div>
    <div>
      Name
      <input type="text" v-model="todoStore.selectedTodo.name" />
    </div>
    <div>
      Status
      <select v-model="todoStore.selectedTodo.status">
        <option>Select status</option>
        <option v-for="status in todoStore.status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>
    <button @click="editTodo(todoStore.selectedTodo)">Save</button>
  </div>
</template>
