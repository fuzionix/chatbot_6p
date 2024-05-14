<template>
  <menu 
    id="sidemenu" 
    ref="sidemenu" 
    class="absolute z-30 max-w-[--menu] overflow-y-scroll w-full h-full pb-[--header] border-r border-theme-grid bg-white duration-300 [&>*]:select-none"
    :class="store.sidemenuStatus ? 'left-0' : 'left-[calc(var(--menu)*-1)]'"
  >
    <section id="menu-header" class="fixed w-[--menu] h-[--header] border-b border-r border-theme-grid bg-white z-10">
      <div class="absolute flex w-full h-full px-7 justify-between items-center">
        <button>
          <img src="@/assets/logo/eduhk_logo.svg" class="w-8" alt="eduhk logo">
        </button>
        <img 
          @click="closeSidemenu"
          src="@/assets/icon/close_square.svg" 
          class="w-6 h-6 cursor-pointer duration-200 hover:scale-125" 
          alt="close button"
        >
      </div>
    </section>
    <section id="navigation" class="mt-[--header] p-7 pb-0">
      <div class="flex flex-col pb-2">
        <button @click="$router.push('/')" class="flex items-center py-2 px-3 mb-2 rounded-lg border-x-theme-gridlight border duration-200 hover:bg-theme-light active:bg-theme-grid">
          <NotebookPen size="20" :strokeWidth="1.5" class="mr-8" />
          <span class="mb-[0.125rem] font-medium text-sm">Writing With AI</span>
        </button>
        <button @click="$router.push('/demo')" class="flex items-center py-2 px-3 mb-2 rounded-lg border-x-theme-gridlight border duration-200 hover:bg-theme-light active:bg-theme-grid">
          <MessageSquareText size="20" :strokeWidth="1.5" class="mr-8" />
          <span class="mb-[0.125rem] font-medium text-sm">AI Chatbot</span>
        </button>
      </div>
    </section>
    <section id="journey" class="flex flex-col">
      <div class="flex justify-between items-center pt-4 ">
        <h5 class="pl-7 text-sm text-theme-darklight font-semibold">YOUR PROMPTS</h5>
        <button @click="$router.push('/')" class="group flex items-center pr-7 opacity-90 hover:opacity-100">
          <img src="@/assets/icon/plus.svg" class="w-5 mr-1.5 group-hover:scale-110 duration-200" alt="add button">
          <span class="mt-[0.125rem] text-xs font-semibold">NEW</span>
        </button>
      </div>
      
      <div v-if="Object.keys(panelHistoryPrompt).length" class="my-4 border-y border-y-theme-gridlight">
        <button 
          v-for="(value, key, index) in panelHistoryPrompt" 
          :key="key" 
          @click="sendMessageFromQuestion(value)"
          class="group relative flex flex-col justify-center w-full px-10 py-2 border-b border-b-theme-gridlight hover:bg-theme-light last:border-0"
        >
          <h3 class="pb-2 text-sm font-semibold max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">Question {{ index + 1 }}</h3>
          <p class="text-xs text-left opacity-70">{{ value }}</p>
          <img src="@/assets/icon/more_square.svg" class="hidden absolute right-2 top-2 w-5 rounded-full group-hover:block hover:bg-[#0001] active:bg-theme-darklight" alt="more">
        </button>
      </div>
      <div v-else class="my-4 border-y border-y-theme-gridlight">
        <p class="w-full py-6 text-center text-xs opacity-70">No Prompt</p>
      </div>
      <p class="text-xs text-center font-semibold">Click question item to ask AI assistant</p>
    </section>
    <section id="internal-link" class="flex flex-wrap justify-center mx-7 pt-7 pb-3 text-xs border-b border-theme-darklight
    [&>a]:opacity-75 [&>a]:text-theme-black [&>a]:mx-1.5 [&>a]:my-0.5 hover:[&>a]:underline hover:[&>a]:opacity-100">
      <router-link to="/about">About</router-link>
      <router-link to="/privacy-policy">Privacy Policy</router-link>
      <router-link to="/terms-of-use">Terms of Use</router-link>
      <router-link to="/contact-us">Contact Us</router-link>
      <router-link to="/feedback">Feedback</router-link>
    </section>
    <section id="external-link" class="flex justify-evenly p-4 [&>*>img]:w-6">
      <a href="https://github.com/TaylonChan/chatbot6p" target="_blank">
        <img src="@/assets/logo/github.svg" alt="github logo">
      </a>
    </section>
    <section id="profile-panel" class="fixed bottom-0 w-[--menu] h-[--header] border-t border-r bg-white z-10">
      <div class="flex justify-between items-center h-full w-full px-7">
        <button class="-mr-4">
          <img src="@/assets/avatar/Shape=10, Color=Pedigrey.svg" class="w-10" alt="">
        </button>
        <div class="">
          <h3 class="text-sm font-semibold">Normal User</h3>
          <h5 class="text-xs opacity-75">Student - <span class="text-theme-dark font-semibold">Change</span></h5>
        </div>
        <button class="">
          <img src="@/assets/icon/logout.svg" class="w-6" alt="">
        </button>
      </div>
    </section>
  </menu>
</template>

<script>
import { useStatusStore } from '@/store/StatusStore'
import { useWritingBotStore } from '@/store/WritingBotStore'

import { 
  NotebookPen,
  MessageSquareText 
} from 'lucide-vue-next'

export default {
    name: 'Sidemenu',
    components: {
      NotebookPen,
      MessageSquareText 
    },
    props: [
      'openSidemenu'
    ],
    emits: ["sendMessageFromQuestion"],
    data() {
      return {
        store: useStatusStore(),
        writingBotStore: useWritingBotStore(),
      }
    },
    computed: {
      panelHistoryPrompt() {
        let promptList = this.writingBotStore.getPanelHistory[1]
        if (promptList) {
          return Object.fromEntries(Object.entries(promptList).filter((v) => { return v[0].startsWith('prompt') }))
        }
        return {}
      }
    },
    created() {
      this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          window.location.reload()
        }
      )
    },
    methods: {
      closeSidemenu() {
        this.store.sidemenuStatus = false
      },
      sendMessageFromQuestion(value) {
        this.$emit('sendMessageFromQuestion', value)
      }
    }
}
</script>

<style>

</style>