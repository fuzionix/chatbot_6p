<template>
  <section id="demo-page" class="absolute w-full h-full overflow-hidden grid-background">
    <sidemenu />
    <main 
      :class="store.sidemenuStatus ? '' : 'md:!pl-0'"
      class="w-full h-[100dvh] duration-300 md:pl-[--menu] xl:pr-[--info]"
    >
      <header class="relative flex items-center justify-between h-[--header] border-b bg-[#0000] p-7 backdrop-blur z-20">
        <img 
          v-if="!fillIcon"
          @mouseover="changeIcon(true)"
          :class="store.sidemenuStatus ? '' : 'md:!visible'"
          src="@/assets/icon/arrow_left_circle.svg" 
          class="visible w-6 h-6 rotate-180 cursor-pointer md:invisible" 
          alt="open menu"
        >
        <img 
          v-else
          @click="openSidemenu"
          @mouseleave="changeIcon(false)"
          :class="store.sidemenuStatus ? '' : 'md:!visible'"
          src="@/assets/icon/arrow_left_circle_full.svg" 
          class="visible w-6 h-6 rotate-180 cursor-pointer md:invisible" 
          alt="open menu"
        >
        <div class="text-center px-7 mt-[-.25rem]">
          <h3 class="font-bold text-lg leading-normal">{{ chatItem['title'] }}</h3>
          <p class="text-xs opacity-70 max-w-[200px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis md:max-w-[300px]">{{ chatItem['title_description'] }}</p>
        </div>
        <img 
          @click="openInfomenu"
          src="@/assets/icon/info_square.svg" 
          class="w-6 cursor-pointer xl:invisible" 
          alt="close menu"
        >
      </header>
      <section id="chat" class="w-full h-[calc(100%-var(--chat))] overflow-hidden -mt-[--header]">
        <div id="chat-message" class="h-full overflow-y-scroll">
          <div 
            id="chat-message-container"
            ref="chatMessageBox"
            class="flex flex-col items-center px-3 py-7 pt-[calc(1rem+var(--header))] sm:px-7 [&>*:last-child]:pb-20"
          >
            <!-- Display Chat Block -->
            <div 
              id="message-block" 
              v-for="(chat, index) in chatHistory"  
              :key="index"
              class="flex items-end w-full max-w-[768px] py-4 animate-bubble-fade-in"
            >
              <div id="avatar-l" class="w-8">
                <img v-if="!chat.user" src="@/assets/avatar/Shape=10, Color=Fennel Flower.svg" alt="">
              </div>
              <div 
                id="message-bubble" 
                class="flex flex-col flex-1 mx-3"
                :class="[
                  chat.user ? 'items-end' : 'items-start',
                ]"
              >
                <h5 class="mb-2 text-sm font-semibold">{{ chat.name }}</h5>
                <div 
                  class="relative flex flex-col min-h-[2.75rem] min-w-[2.75rem] w-fit px-4 py-3 text-sm rounded-lg md:flex-row"
                  :class="[
                    chat.user ? 'bg-theme-pale shadow-edge-theme' : 'bg-theme-light shadow-edge',
                    chat.danger ? '!bg-danger text-white shadow-none' : ''
                  ]"
                >
                  <img 
                    v-if="chatLoading"
                    src="@/assets/icon/loader.svg" 
                    class="absolute w-6"
                    :class="index + 1 === chatHistory.length ? 'inline' : 'hidden'" 
                    alt="" 
                    width="24"
                  >
                  <p v-if="true" class="w-fit">{{ chat.message }}</p>
                  <!-- <p v-else class="w-fit">
                    <span v-for="word in animateText" class="inline-block animate-fade-in">{{ word }}&nbsp</span>
                  </p> -->
                  <button 
                    v-if="chat.danger" 
                    @click="sendMessage(
                      this.chatHistory.length > 1 
                      ? this.chatHistory.slice(-2)[0]['message'] 
                      : this.$router.go(), 
                      true
                    )" 
                    class="flex items-center pt-4 md:pt-0 md:pl-4 hover:opacity-80"
                  >
                    <RefreshCcw size="18" />
                    <span class="px-2">Refresh</span>
                  </button>
                </div>
              </div>
              <div id="avatar-r" class="w-8">
                <img v-if="chat.user" src="@/assets/avatar/Shape=10, Color=Lavender.svg" alt="">
              </div>
            </div>

            
            <!-- Display Chat Block -->
          </div>
        </div>
        <div 
          id="chat-input" 
          :class="store.sidemenuStatus ? 'md:w-[calc(100%-var(--menu))] xl:w-[calc(100%-var(--info)-var(--menu))]' : 'md:w-full xl:w-[calc(100%-var(--info))]'"
          class="fixed bottom-0 h-[--chat] px-7 w-full duration-300 bg-theme-verylight shadow-line focus-within:shadow-line-active"
        >
          <div class="absolute flex -top-12 right-3 p-1 bg-theme-gridlight rounded-lg">
            <button @click="chatRetry()" class="rounded p-1 hover:bg-[#0001]">
              <RotateCw :size="20" :strokeWidth="1.5"/>
            </button>
            <button @click="chatUndo()" class="rounded p-1 hover:bg-[#0001]">
              <Undo2 :size="20" :strokeWidth="1.5"/>
            </button>
          </div>
          <div id="input-frame" class="flex items-center h-full">
            <img src="@/assets/icon/magic_spark.svg" class="w-6" alt="">
            <div class="h-5 border-r border-r-theme-gray mx-7"></div>
            <form action="/" method="" @submit.prevent="sendMessage(userTextInput)" class="flex flex-1">
              <input 
                type="text" 
                v-model.trim="userTextInput"
                class="flex-1 pr-7 text-base bg-transparent min-w-0 focus:outline-0" 
                placeholder="Type Something ..." 
                value=""
                enter-key-hint="send"
              >
              <button type="submit" class="hover:opacity-75">
                <img src="@/assets/icon/voice.svg" class="w-6" alt="">
              </button>
              <button 
                type="submit" 
                class="ml-4 hover:opacity-75" 
              >
                <img src="@/assets/icon/send.svg" class="w-8" alt="">
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
    <info-panel />
  </section>
</template>

<script>
import Replicate from "replicate"

import Sidemenu from '@/components/Sidemenu.vue'
import InfoPanel from '@/components/InfoPanel.vue'
import Dialog from '@/components/Dialog.vue'

import { 
  RefreshCcw,
  Undo2,
  RotateCw
} from 'lucide-vue-next';

import { Button } from '@/components_shadcn/ui/button'
import { useToast } from '@/components_shadcn/ui/toast/use-toast'

import { useStatusStore } from '@/store/useStatusStore'
import { ref } from 'vue'

import axios from 'axios'

export default {
    name: 'DemoPage',
    components: {
      'sidemenu': Sidemenu,
      'info-panel': InfoPanel,
      Undo2,
      RotateCw,
      RefreshCcw,
      Button,
      Dialog
    },
    props: [
    ],
    data() {
      return {
        api_key: import.meta.env.VITE_APP_REPLICATE_API_TOKEN,

        store: useStatusStore(),
        windowWidth: ref(window.innerWidth),
        minwindowWidth: 640,
        fillIcon: false,
        isActive: false,
        chatItem: {
          title: 'Writing With AI',
          title_description: 'This chatbot guides students through the 6P pedagogy for academic writing'
        },
        chatLoading: false,
        chatLoadingSuccess: true,
        chatHistory: [],
        animateText: [],
        userTextInput: '',
        userTextInputTemp: '',
        isLeaving: false, // TODO
        toast: useToast().toast
      }
    },
    computed: {
    },
    created() {
      if (this.windowWidth <= this.minwindowWidth) {
        this.store.sidemenuStatus = false
      }

      this.chatHistory.push({
        name: '',
        message: '',
        user: false
      })

      this.chatLoading = true

      axios({
        method: 'post',
        url: '/api',
        data: {
          input: {
            top_k: 0,
            top_p: 1,
            prompt: "Can you write a poem about open source machine learning? Let's make it in the style of E. E. Cummings.",
            temperature: 0.5,
            system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
            length_penalty: 1,
            max_new_tokens: 500,
            min_new_tokens: -1,
            prompt_template: "<s>[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
            presence_penalty: 0
          }
        },
        headers: {
          'Authorization': `Bearer ${this.api_key}`,
          'Content-Type': 'application/json'
        },
      }).then(async response => {
        this.getPredictions(response.data.id)
      }).catch(error => {
        console.error(error)
      })
    },
    mounted() {
      window.addEventListener('resize', this.detectWindowSize);
    },
    unmounted() {
      window.removeEventListener('resize', this.detectWindowSize);
    },
    beforeRouteLeave(to, from) {
      // prevent popup if no data fetched
      if (this.chatLoadingSuccess) {
        const answer = window.confirm('Are you sure you want to leave? Confirm to exit')
        if (!answer) return false
      }
    },
    methods: {
      openSidemenu() {
        this.store.sidemenuStatus = true
      },
      openInfomenu() {
        this.store.infomenuStatus = true
      },
      detectWindowSize() {
        if (ref(window.innerWidth).value <= this.minwindowWidth) {
          this.store.sidemenuStatus = false
        } else {
          this.store.sidemenuStatus = true
        }
      },
      changeIcon(status) {
        this.fillIcon = status
      },
      sendMessage(textInput, refresh = false) {
        if (textInput && !this.isActive) {
          this.isActive = true

          if (this.chatHistory.slice(-1)[0]?.['danger'] == true) {
            this.chatHistory.pop()
          }

          textInput = textInput.replace(/@(\w+)/g, '').trim()

          // insert message into chat history. display new chat bubble automatically
          if (!refresh) {
            this.chatHistory.push({
              name: 'You',
              message: textInput,
              user: true
            })
          }
          
          this.chatHistory.push({
            name: '',
            message: '',
            user: false
          })

          this.chatLoading = true

          // send user input to server
          axios({
            method: 'post',
            url: `http://127.0.0.1:8000/chat/`,
            data: {
            }
          }).then((res) => {
            this.data = res.data
            Object.assign(this.chatHistory.slice(-1)[0], {
              name: this.data['name'],
              message: this.data['message'],
              user: false
            })
            // this.displayText(this.data['message'])
          }).catch((error) => {
            Object.assign(this.chatHistory.slice(-1)[0], {
              name: 'Error System',
              message: `Someone tell him that the server side have some issues [${error}]`,
              user: false,
              danger: true
            })
            // this.displayText(this.data['message'])
          }).finally(() => {
            this.scrollToBottom()
            this.isActive = false
            this.chatLoading = false
          })

          this.userTextInputTemp = this.userTextInput
          this.userTextInput = ''
          this.scrollToBottom()
        }
        
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$refs.chatMessageBox.scrollIntoView({ 
            behavior: "smooth", 
            block: "end", 
            inline: "nearest" 
          })
        })
      },
      displayText() {
        let messageResult = this.chatHistory.slice(-1)[0]['message'].split(' ')
        let messageIndex = 0
        
        const nInterval = setInterval(() => {
          this.animateText.push(messageResult[messageIndex])
          messageIndex += 1

          if ((messageIndex >= messageResult.length) || (messageIndex > 1000)) {
            clearInterval(nInterval)
          }
        }, 50);
      },
      async getPredictions(predictionId) {
        try {
          await axios({
            method: 'get',
            url: `/get/${predictionId}`,
            headers: {
              'Authorization': `Bearer ${this.api_key}`
            },
          }).then(async response => {
            // Handle the response data
            console.log(response.data)
            const data = response.data

            // Check if predictions are succeeded
            if (data.status === 'succeeded') {
              // Predictions are succeeded, proceed with further actions
              console.log('Predictions succeeded')
              console.log('Predictions status:', data)
              this.chatHistory = [{
                name: 'Bot',
                message: data.output.join(""),
                user: false
              }]
              this.scrollToBottom()
            } else if (data.status === 'processing') {
              console.log('Predictions still pending. Waiting...')
              await this.delay(1000)
              await this.getPredictions(predictionId)
            } else {
              console.log('Predictions status:', data.status)
              console.log('Predictions status:', data)
            }
          }).catch(error => {
            // Handle the error
            console.error(error)
            this.chatLoadingSuccess = false
            Object.assign(this.chatHistory.slice(-1)[0], {
              name: 'Error System',
              message: `Cannot load the story. Please try again [${error}]`,
              user: false,
              danger: true
            })
          }).finally(() => {
            this.chatLoading = false
          })
        } catch (error) {
          console.error(error)
        }
      },
      delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
      },
      chatRetry() {
        console.log('retry')
      },
      chatUndo() {
        if (this.chatHistory.length > 1) {
          axios({
            method: 'post',
            url: `http://127.0.0.1:8000/chat/undo/`,
            data: {
              chatHistory: JSON.stringify(this.chatHistory.slice(0, -1))
            }
          }).then((res) => {
            this.chatHistory.pop()
          }).catch((error) => {
            console.error('Error: ', error)
          })
        }
      }
    }
}
</script>

<style>

</style>