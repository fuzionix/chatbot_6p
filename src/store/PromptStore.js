import { defineStore } from 'pinia'

export const usePromptStore = defineStore('promptStore', {
  state: () => {
    return { 
      interpolation: '',
      prompt: {
        planningApproach: 'In first phase, please insist students to plan the content and structure of the writing to effectively respond to an issue, research question, or problem.'
      }
    }
  },
  getters: {
    getPrompt() {
      return this.prompt
    },
  },
  actions: {
    interpolatePrompt() {

    }
  }
})