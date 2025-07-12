<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted } from 'vue'

const todoStore = useTodoStore()

onMounted(async () => {
  await todoStore.loadTodos()
  console.log(todoStore.list)
})
</script>
<template></template>
