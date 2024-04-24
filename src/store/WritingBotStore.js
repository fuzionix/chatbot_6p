import { defineStore } from 'pinia'

export const useWritingBotStore = defineStore('writingBotStore', {
  state: () => {
    return { 
      panelHistory: [
        {
            userInput: '',
            result: '',
            trigger: true
        }
      ]
    }
  },
  getters: {
    getPanelHistory() {
      return this.panelHistory
    }
  },
  actions: {
    
  }
})