<template>
  <article class="bg-white border-2 border-slate-400 rounded-lg shadow-lg overflow-hidden group m-8 dark:bg-black dark: text-white">
    <img
        :src="characterInfo.image"
        :alt="characterInfo.name"
        class="w-full group-hover:scale-105 transition-transform duration-200"
    />
    <div class="p-4">
      <h2 class="text-xl text-black font-bold dark:text-white">{{ characterInfo.name }}</h2>
      <p class="text-gray-500">{{ characterInfo.species }}</p>
    </div>
  </article>
</template>
<script setup lang="ts">
import type {Character} from "@/views/CharactersView.vue";

defineProps<{
  characterInfo: Character
}>()

</script>