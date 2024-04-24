import { defineStore } from 'pinia'

export const usePromptStore = defineStore('promptStore', {
  state: () => {
    return { 
      prompt: [
        "Hello"
      ]
    }
  },
  getters: {
    getPrompt() {
      return this.prompt
    }
  },
  actions: {
    
  }
})