import { defineStore } from 'pinia'

export const useWritingBotStore = defineStore('writingBotStore', {
  state: () => {
    return { 
      panelHistory: [],
      panelProgress: 0,
      isPanelHistoryEmpty: [],
      predictions: {}
    }
  },
  getters: {
    getPanelHistory() {
      return this.panelHistory
    },
    getPanelProgress() {
      return this.panelProgress
    },
    getIsPanelHistoryEmpty() {
      return this.isPanelHistoryEmpty
    },
    getPredictions() {
      return this.predictions
    }
  },
  actions: {
    updatePanelItem(item) {
      const itemIndex = this.panelHistory.findIndex((pitem) => pitem['name'] === item['name'])
      if (itemIndex === -1) {
        this.panelHistory.push(item)
      } else {
        this.panelHistory[itemIndex] = item
      }
    },
    updatePanelProgress(pnum) {
      if (pnum > this.panelProgress) {
        this.panelProgress = pnum
      }
    },
    updatePanelHistoryEmpty(index) {
      this.isPanelHistoryEmpty[index] = !Object.values(this.panelHistory[index]).some((v) => !v)
    },
    updatePredictions(output, field) {
      this.predictions[field] = output
      return this.predictions
    }
  }
})