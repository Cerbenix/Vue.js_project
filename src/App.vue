<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { state } from './globalState'
</script>

<template>
  <header class="flex justify-between bg-gray-900 shadow-lg p-2">
    <nav class="flex flex-col sm:flex-row">

      <RouterLink
          class="text-white text-lg px-4 py-2 mx-2 hover:text-orange-400" to="/">
        Home
      </RouterLink>

      <RouterLink
          class="text-white text-lg px-4 py-2 mx-2 hover:text-orange-400" to="/characters">
        Characters
      </RouterLink>

      <RouterLink class="text-white text-lg px-4 py-2 mx-2 hover:text-orange-400" to="/form">
        Form
      </RouterLink>

      
    </nav>
    <div>
      <div class="text-white text-lg px-4 py-2 mx-2">
        Current theme: <button class="hover:text-orange-400" @click="state.updateTheme">{{ state.theme }}</button>
       </div>
      
    </div>
    
  </header>
  

  <RouterView />
</template>

