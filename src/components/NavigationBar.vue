<template>
  <nav id="navigation-bar" class="absolute flex justify-between items-center w-full h-[75px] px-7">
    <div>
      <router-link to="/">
        <img src="@/assets/logo/eduhk_logo.svg" width="32" alt="eduhk logo" class="w-8">
      </router-link>
    </div>
    <div class="">
      <a 
        class="flex items-center font-semibold border px-6 py-3 bg-white hover:bg-theme-verylight" 
        href="https://github.com/TaylonChan/chatbot6p" 
        target="_blank"
      >
        <span class="text-sm pr-4">GITHUB</span>
        <img src="@/assets/logo/github.svg" width="20" alt="Github logo" class="w-5">
      </a>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
    components: {
      
    },
    props: {
      
    },
    data() {
      return {
        
      }
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style>

</style>