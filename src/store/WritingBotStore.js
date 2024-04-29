import { defineStore } from 'pinia'

export const useWritingBotStore = defineStore('writingBotStore', {
  state: () => {
    return { 
      panelHistory: [],
      panelProgress: 0
    }
  },
  getters: {
    getPanelHistory() {
      return this.panelHistory
    },
    getPanelProgress() {
      return this.panelProgress
    }
  },
  actions: {
    updatePanelItem(item) {
      this.panelHistory.push(item)
    },
    updatePanelProgress(pnum) {
      if (pnum > this.panelProgress) {
        this.panelProgress = pnum
      }
    }
  }
})