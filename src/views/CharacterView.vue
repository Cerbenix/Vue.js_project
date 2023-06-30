<template>
  <main class="flex justify-center p-8">
    <article v-if="character"
      class=" text-black max-w-[300px] border-2 border-slate-400 rounded-lg shadow-lg overflow-hidden inline-block bg-white dark:bg-gray-800 dark:text-white">
      <img :src="character.image" :alt="character.name" class="" />
      <div class="px-4 pb-2 flex flex-col">
        <h1 class="text-2xl">{{ character.name }}</h1>
        <p>Status: {{ character.status }}</p>
        <p>Gender: {{ character.gender }}</p>
        <p>Species: {{ character.species }}</p>
        <p>Location: {{ character.location.name }}</p>
      </div>
      <div class="flex justify-between p-4">
        <CustomButton @custom-click="goToPreviousCharacter">&lt;</CustomButton>
        <CustomButton @custom-click="goToNextCharacter">></CustomButton>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Character } from './CharactersView.vue'
import CustomButton from '@/components/CustomButton.vue'

type Location = {
  name: string
}

type ExpandedCharacter = Character & {
  location: Location
  origin: string
  episode: string[]
}

const route = useRoute()
const router = useRouter()

const url = ref('https://rickandmortyapi.com/api/character/')

const id = ref<string>(route.params.id.toString())

const character = ref<ExpandedCharacter | null>(null)

const fetchSingleCharacter = async (id: string) => {
  const response = await fetch(`${url.value}${id}`)
  const data = (await response.json()) as ExpandedCharacter
  character.value = {
    id: data.id,
    name: data.name,
    status: data.status,
    species: data.species,
    gender: data.gender,
    image: data.image,
    location: data.location,
    origin: data.origin,
    episode: data.episode
  }
}

onMounted(() => {
  fetchSingleCharacter(id.value)
})

const goToNextCharacter = () => {
  const nextId = (parseInt(id.value) + 1).toString()
  router.push(`/characters/${nextId}`)
  id.value = nextId
  fetchSingleCharacter(nextId)
}

const goToPreviousCharacter = () => {
  if (+id.value <= 1) {
    return
  }
  const previousId = (parseInt(id.value) - 1).toString()
    router.push(`/characters/${previousId}`)
    id.value = previousId
    fetchSingleCharacter(previousId)
}

</script>
