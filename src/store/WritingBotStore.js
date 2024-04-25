import { defineStore } from 'pinia'

export const useWritingBotStore = defineStore('writingBotStore', {
  state: () => {
    return { 
      panelHistory: [
        
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