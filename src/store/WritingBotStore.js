import { defineStore } from 'pinia'

export const useWritingBotStore = defineStore('writingBotStore', {
  state: () => {
    return { 
      panelHistory: [
        {
          name: 'planning',
          userInput: '',
          result: '',
          triggered: true
        },
        {
          name: 'prompting',
          userInput: '',
          result: '',
          triggered: false
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