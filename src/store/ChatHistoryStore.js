import { defineStore } from 'pinia'

export const useChatHistoryStore = defineStore('chatHistoryStore', {
  state: () => {
    return { 
      chatHistory: [
        {
          name: 'Expert Pinia',
          message: 'I am an expert of. Feel free to ask me anything about 😊',
          user: false
        },
        {
          name: 'You',
          message: 'Hello there!',
          user: true
        }
      ]
    }
  },
  getters: {
  },
})