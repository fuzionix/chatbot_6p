<template>
  <router-view></router-view>
  <Toaster />
</template>

<script>
import Toaster from '@/components_shadcn/ui/toast/Toaster.vue'

export default {
  name: 'App',
  components: {
    Toaster
  },
  metaInfo: {
    meta: [
      {
        name: 'description',
        content: 'The chatbot aims to provide personalized guidance for academic writing aligned with the six phases of the 6P Pedagogical Framework.'
      },
      {
        name: 'keywords',
        content: 'AI,interface,chatbot,generator,llama,llm,academic,writing'
      }
    ]
  }
}
</script>

<style>

</style>
