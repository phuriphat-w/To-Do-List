import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://687276eb76a5723aacd4d0ce.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    status: ['Pending', 'Doing', 'Done'],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.log('Error', error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.log('Error', error)
      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending',
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos/`, bodyData)
        console.log('Added ', response.data)
      } catch (error) {
        console.log('Error', error)
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('Edit completed', response.data)
      } catch (error) {
        console.log('Error', error)
      }
    },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('Removed', response.data)
      } catch (error) {
        console.log('Error', error)
      }
    },
  },
})
