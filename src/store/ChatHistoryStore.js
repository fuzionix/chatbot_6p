import { defineStore } from 'pinia'

export const useChatHistoryStore = defineStore('chatHistoryStore', {
  state: () => {
    return { 
      chatHistory: [
        {
          name: 'Expert',
          message: 'I am an expert of math. Feel free to ask me anything about math 😊',
          user: false
        }
      ]
    }
  },
  getters: {
    getChatHistory() {
      return this.chatHistory
    }
  },
  actions: {
    addChatItem(item) {
      this.chatHistory.push(item)
    },
    assignChatItem(item) {
      Object.assign(this.chatHistory.slice(-1)[0], item)
    },
    popChatItem() {
      this.chatHistory.pop()
    }
  }
})