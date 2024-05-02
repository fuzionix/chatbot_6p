import { defineStore } from 'pinia'

export const usePromptStore = defineStore('promptStore', {
  state: () => {
    return { 
      prompt: {
        planningApproach: ''
      }
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