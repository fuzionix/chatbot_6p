<template>
  <NavigationBar />
  <section id="writing-with-ai" class="overflow-hidden writing-with-ai">
    <div id="writing-with-ai-container" class="flex flex-col items-center flex-1 w-full p-7 pt-[calc(1rem+var(--header))] 
      sm:px-20">
      <div class="flex flex-col lg:flex-row w-full max-w-[1024px]">
        <div ref="sideinfo" class="relative mb-6 lg:w-[250px] lg:mr-16">
          <h4 class="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
            Academic Writing Assistant
          </h4>
          <h1 class="text-[2rem] sm:text-[3rem] scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Writing With AI
          </h1>
          <p class="text-sm mt-6">This chatbot guides students through the 6P pedagogy for academic writing. <a href="https://www.lttc.eduhk.hk/papers/6p.pdf" class="underline" target="_blank">Papers</a></p>
          <button @click="$router.push('/demo')" class="flex items-center w-full py-2 px-3 mt-6 rounded-lg border-x-theme-gridlight border duration-200 hover:bg-theme-light active:bg-theme-grid">
            <MessageSquareText size="20" :strokeWidth="1.5" class="mr-8" />
            <span class="mb-[0.125rem] font-medium text-sm">AI Chatbot</span>
          </button>
          <Alert v-if="connectError" class="my-8" variant="destructive">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Failed To Connect!</AlertTitle>
            <AlertDescription>
              {{ connectErrorMessage }}
            </AlertDescription>
          </Alert>
        </div>
        
        <div class="flex-1">
          <div class="flex">
            <form 
              @submit.prevent="" 
              class="w-full [&>*]:duration-300 [&>*:last-child]:border-[#fff0] [&>*:last-child]:opacity-25 [&>*:last-child]:pointer-events-none [&>*:last-child]:select-none"
            >
              <button 
                ref="formbutton"
                type="submit" 
                class="hidden"
                hidden
              >
              </button>
            
              <!-- 1. Plan -->
              <Card v-if="panelProgress >= 1" class="mb-6">
                <CardHeader>
                  <CardTitle class="font-semibold text-base">
                    <ClipboardPenLine class="mb-2" />
                    <span>Plan</span>
                  </CardTitle>
                  <CardDescription>Please tell me the intended topic of your writing. I will guide you through the steps of the 6P pedagogy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField v-slot="{ componentField }" name="topic">
                    <FormItem class="mb-8">
                      <FormLabel>Your Topic</FormLabel>
                      <FormControl>
                        <div class="relative">
                          <Input 
                            @input="updatePanel('plan')"
                            type="text" 
                            class="h-[50px] pl-6 pr-12 bg-theme-light text-md" 
                            placeholder="" 
                            v-bind="componentField" 
                            maxlength="100" 
                            autofocus 
                          />
                          <button type="submit" class="absolute top-[50%] right-0 translate-y-[-50%] mr-6">
                            <WandSparkles width="16" height="16" alt="" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField name="">
                    <FormItem>
                      <div class="flex justify-between items-center">
                        <FormLabel>Planning Approach</FormLabel>
                        <button 
                          class="hover:-rotate-180 duration-200"
                          @click.prevent=""
                        >
                          <RotateCcw width="16" height="16" />
                        </button>
                      </div>
                      
                      <div class="!mb-8 !mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="plan">
                    <FormItem class="pt-6 border-t border-t-theme-gray">
                      <FormLabel>Your Plan</FormLabel>
                      <FormControl>
                        <Textarea
                          @input="updatePanel('plan')"
                          placeholder=""
                          class="bg-theme-light text-md"
                          rows="4"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormDescription class="text-xs">
                        Plan the content and structure of the writing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </CardContent>
                <CardFooter class="text-xs text-theme-black">
                  <Button 
                    @click="updatePanelProgress(1)" 
                    class="flex items-center w-full h-[40px] py-2 px-3 mb-2 rounded-lg"
                  >
                    <ClipboardCheck size="20" :strokeWidth="1.5" class="mr-8" />
                    <span class="font-medium text-sm">Okay, I Finished</span>
                  </Button>
                </CardFooter>
              </Card>

              <!-- 2. Prompt -->
              <Card v-if="panelProgress >= 2" class="mb-6">
                <CardHeader>
                  <CardTitle class="font-semibold text-base">
                    <Sparkles class="mb-2" />
                    <span>Prompt</span>
                  </CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField 
                    v-for="i in formSchemaPromptAmount" 
                    :key="i" 
                    v-slot="{ componentField }" 
                    :name="`prompt${i}`"
                  >
                    <FormItem class="mb-4">
                      <FormControl>
                        <div class="relative">
                          <Input 
                            @input="updatePanel('prompt')" 
                            type="text" 
                            class="h-[50px] pl-6 pr-12 bg-theme-light text-sm z-0" 
                            :placeholder="`Prompt ${i}`" 
                            v-bind="componentField" 
                            maxlength="300" 
                            autofocus 
                          />
                          <button type="submit" class="absolute top-[50%] right-0 translate-y-[-50%] mr-6">
                            <WandSparkles width="16" height="16" alt="" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </CardContent>
                <CardFooter class="flex flex-col text-xs text-theme-black md:flex-row">
                  <Button 
                    @click="$router.push('/demo')" 
                    class="flex items-center w-full h-[40px] py-2 px-3 mb-2 md:mr-2 rounded-lg border border-x-theme-gridlight bg-white hover:bg-theme-light active:bg-theme-grid"
                  >
                    <MessageSquareText size="20" :strokeWidth="1.5" class="mr-8" />
                    <span class="font-medium text-sm">AI Chatbot</span>
                  </Button>
                  <Button 
                    @click="updatePanelProgress(2)" 
                    class="flex items-center w-full h-[40px] py-2 px-3 mb-2 md:ml-2 rounded-lg"
                  >
                    <ClipboardCheck size="20" :strokeWidth="1.5" class="mr-8" />
                    <span class="font-medium text-sm">Okay, I Finished</span>
                  </Button>
                </CardFooter>
              </Card>

              <!-- 3. Preview -->
              <Card v-if="panelProgress >= 3" class="mb-6">
                <CardHeader>
                  <CardTitle class="font-semibold text-base">
                    <Eye class="mb-2" />
                    <span>Preview</span>
                  </CardTitle>
                  <CardDescription>Please tell me the intended topic of your writing. I will guide you through the steps of the 6P pedagogy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField v-slot="{ componentField }" name="preview">
                    <FormItem class="mb-8">
                      <div class="flex justify-between items-center">
                        <FormLabel>Preview Panel</FormLabel>
                        <button 
                          class="hover:-rotate-180 duration-200"
                          @click.prevent=""
                        >
                          <RotateCcw width="16" height="16" />
                        </button>
                      </div>
                      <FormControl>
                        <Textarea
                          @input="updatePanel('preview')"
                          placeholder=""
                          class="bg-theme-light text-md"
                          rows="10"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormDescription>
                        <span class="text-xs">The result will be automatically generated, but you can still make edits to it.</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="refinements">
                    <FormItem class="mb-8">
                      <FormLabel>Suggestion of Refinements</FormLabel>
                      <FormControl>
                        <div class="relative">
                          <Input 
                            @input="updatePanel('preview')" 
                            type="text" 
                            class="h-[50px] pl-6 pr-12 bg-theme-light text-md" 
                            placeholder="" 
                            v-bind="componentField" 
                            maxlength="300" 
                            autofocus 
                          />
                          <button type="submit" class="absolute top-[50%] right-0 translate-y-[-50%] mr-6">
                            <WandSparkles width="16" height="16" alt="" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </CardContent>
                <CardFooter class="text-xs text-theme-black">
                  <Button 
                    @click="updatePanelProgress(3)" 
                    class="flex items-center w-full h-[40px] py-2 px-3 mb-2 rounded-lg"
                  >
                    <ClipboardCheck size="20" :strokeWidth="1.5" class="mr-8" />
                    <span class="font-medium text-sm">Okay, I Finished</span>
                  </Button>
                </CardFooter>
              </Card>

              <!-- 4. Produce -->
              <Card v-if="panelProgress >= 4" class="mb-6">
                <CardHeader>
                  <CardTitle class="font-semibold text-base">
                    <BookOpenCheck class="mb-2" />
                    <span>Produce</span>
                  </CardTitle>
                  <CardDescription>Please tell me the intended topic of your writing. I will guide you through the steps of the 6P pedagogy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField name="">
                    <FormItem>
                      <div class="flex justify-between items-center">
                        <FormLabel>Result</FormLabel>
                        <button 
                          class="hover:-rotate-180 duration-200"
                          @click.prevent=""
                        >
                          <RotateCcw width="16" height="16" />
                        </button>
                      </div>
                      
                      <div class="!mb-8 !mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </CardContent>
              </Card>

              <div v-if="panelProgress >= 5" class="flex flex-col md:flex-row">
                <!-- 5. Peer Review -->
                <Card class="mb-6 flex-1 border-none">
                  <CardHeader>
                    <CardTitle class="font-semibold text-base">
                      <UserRoundSearch class="mb-2" />
                      <span>Peer Review</span>
                    </CardTitle>
                    <CardDescription>Please tell me the intended topic of your writing. I will guide you through the steps of the 6P pedagogy.</CardDescription>
                  </CardHeader>
                </Card>

                <!-- 6. Portfolio Tracking -->
                <Card class="mb-6 flex-1 border-none">
                  <CardHeader>
                    <CardTitle class="font-semibold text-base">
                      <FolderOpen class="mb-2" />
                      <span>Portfolio Tracking</span>
                    </CardTitle>
                    <CardDescription>Please tell me the intended topic of your writing. I will guide you through the steps of the 6P pedagogy.</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWritingBotStore } from '@/store/WritingBotStore'
import { ref, toRaw, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import NavigationBar from '@/components/NavigationBar.vue'

import { Alert, AlertDescription, AlertTitle } from '@/components_shadcn/ui/alert'
import { Button } from '@/components_shadcn/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components_shadcn/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components_shadcn/ui/form'
import { Input } from '@/components_shadcn/ui/input'
import { Textarea } from '@/components_shadcn/ui/textarea'
import { useToast } from '@/components_shadcn/ui/toast/use-toast'

import { 
  AlertCircle,
  ClipboardPenLine, 
  Sparkles,
  Plus,
  View,
  RotateCcw,
  MessageSquareText, 
  SendHorizontal,
  ClipboardCheck,
  WandSparkles,
  Eye,
  BookOpenCheck,
  UserRoundSearch,
  FolderOpen     
} from 'lucide-vue-next'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import axios from 'axios'

const writingBotStore = useWritingBotStore()
const panelHistory = toRaw(writingBotStore.getPanelHistory)
const panelProgress = ref(writingBotStore.getPanelProgress + 2)

const router = useRouter()
const { toast } = useToast()

const formSchemaPromptAmount = 3
const formSchemaObject = {
  topic: z.string().min(1, 'Topic cannot be empty').max(100 - 1, 'At most 100 charactors').optional().default(panelHistory[0]?.topic),
  plan: z.string().min(1, 'Your plan cannot be empty').max(1000 - 1, 'At most 1000 charactors').optional().default(panelHistory[0]?.plan),
  preview: z.string().min(1, 'Preview cannot be empty').max(5000 - 1, 'At most 5000 charactors').optional().default(panelHistory[2]?.preview),
  refinements: z.string().max(300 - 1, 'At most 300 charactors').optional().default(panelHistory[2]?.refinements),
}

for (let i = 1; i <= formSchemaPromptAmount; i++) {
  formSchemaObject[`prompt${i}`] = z.string().max(300 - 1, 'At most 300 charactors').optional().default(panelHistory[1]?.[`prompt${i}`])
}

const formSchema = toTypedSchema(z.object(formSchemaObject))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const connectError = ref(false)
const connectErrorMessage = ref('')
const sideinfo = ref(null)
const formbutton = ref(null)

onMounted(() => {
  const scroll = window.addEventListener("scroll", handleScroll)
  const resize = window.addEventListener("resize", handleScroll)

  function handleScroll() {
    if (window.innerWidth >= 1024) {
      sideinfo.value.style.top = `${window.scrollY}px`
    } else {
      sideinfo.value.style.top = `0px`
    }
  }
})

const onSubmit = handleSubmit((values) => {
  return values
})

function updatePanel(phase) {
  formbutton.value.click()
  onSubmit().then((values) => {
    if (values) {
      switch (phase) {
        case 'plan':
          writingBotStore.updatePanelItem({
            name: phase,
            topic: values.topic,
            plan: values.plan
          })
          break
        case 'prompt':
          writingBotStore.updatePanelItem({
            name: phase,
            ...Object.fromEntries(Object.entries(values).filter((v) => { return v[0].startsWith('prompt') }))
          })
          break
        case 'preview':
          writingBotStore.updatePanelItem({
            name: phase,
            preview: values.preview,
            refinements: values.refinements
          })
          break
      }
    }
  })
}

function updatePanelProgress(pnum) {
  formbutton.value.click()
  onSubmit().then((values) => {
    if (values) {
      writingBotStore.updatePanelProgress(pnum)
      panelProgress.value = writingBotStore.getPanelProgress + 2
    }
  })
  
}

</script>

<style>

</style>