<template>
  <section 
    id="info-panel" 
    :class="store.infomenuStatus ? 'right-0' : 'right-[calc(var(--info)*-1)]'"
    class="absolute top-0 z-20 max-w-[--info] overflow-y-auto w-full h-full border-l border-theme-grid duration-300 bg-white xl:right-0"
  >
    <section id="panel-header" class="fixed w-[--info] h-[--header] border-b border-r border-theme-grid bg-white z-10 sm:w-full">
      <div class="absolute flex w-full h-full px-7 justify-between items-center">
        <img 
          @click="closeInfomenu"
          src="@/assets/icon/close_square.svg" 
          class="w-6 h-6 cursor-pointer duration-200 hover:scale-125 xl:hidden" 
          alt="close button"
        >
      </div>
    </section>
    <section id="panel-content" class="pt-[--header] pb-7">
      <div>
        <div class="h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
          <button 
            :data-state="tabState.about && 'active'"
            @click="changeTab('about')" 
            class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            About Us
          </button>
          <button 
            :data-state="tabState.framework && 'active'"
            @click="changeTab('framework')"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Framework
          </button>
        </div>
        <div v-if="tabState.about" id="about">
          <div class="px-7 pt-7">
            <h2 class="font-medium text-xl">Text</h2>
            <p class="pt-2 text-sm opacity-70">Text</p>
            <div class="flex my-7 py-7 border-y">
              <div class="flex-1 pr-2">
                <h5 class="pb-1 text-sm font-semibold text-theme-darklight">Operated by</h5>
                <p class="text-sm leading-relaxed">Text</p>
              </div>
            </div>
            <div>
              <h5 class="pb-4 text-sm font-semibold text-theme-darklight">Information</h5>
              <p class="text-sm leading-relaxed">It is an experimental project that aims to provide a creative and engaging conversational experience. However, it is not perfect and there may be errors and inaccuracies in its responses. </p>
              <br>
              <p class="text-sm leading-relaxed">We appreciate your comments and suggestions on how we can improve the chatbot. Please send your feedback to hyincheung@eduhk.hk. Thank you for your participation and understanding.</p>        
            </div>
          </div>
        </div>
        <div v-if="tabState.framework" value="framework">
          <div v-if="true" class="p-7">
            
          </div>
          <div v-else class="p-7">
            <Alert class="mb-8" variant="destructive">
              <AlertCircle class="w-4 h-4" />
              <AlertTitle>Loading Error</AlertTitle>
              <AlertDescription>
                <p>Failed To Receive Framework Info</p>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { useStatusStore } from '@/store/StatusStore'

import { Alert, AlertDescription, AlertTitle } from '@/components_shadcn/ui/alert'

import { 
  UserRoundPlus,
  AtSign,
  MessageSquareText,
  AlertCircle
} from 'lucide-vue-next';

export default {
    name: 'InfoPanel',
    components: {
      UserRoundPlus,
      AtSign,
      MessageSquareText,
      AlertCircle,
      Alert, 
      AlertDescription, 
      AlertTitle
    },
    props: [
    ],
    data() {
      return {
        store: useStatusStore(),
        tabState: {
          about: false,
          framework: true
        }
      }
    },
    computed: {
    },
    methods: {
      closeInfomenu() {
        this.store.infomenuStatus = false
      },
      changeTab(tabname) {
        Object.keys(this.tabState).map((item) => {
          if (item === tabname) {
            this.tabState[item] = true
          } else {
            this.tabState[item] = false
          }
        })
      }
    }
}
</script>

<style>

</style>