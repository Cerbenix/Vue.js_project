<template>
  <div v-if="isLoading">Loading...</div>
  <div class="flex flex-row mx-4 mt-4">
    <CustomButton class="" v-if="pageInfo.prev" @custom-click="handlePrev">Previous</CustomButton>
    <CustomButton class="ml-auto " @custom-click="handleNext">Next</CustomButton>
  </div>
  <ul v-if="!isLoading && characters.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 dark:bg-purple-950 bg-white">
    <li v-for="character in characters" :key="character.id">
      <RouterLink :to="`/characters/${character.id}`">
        <Character :characterInfo="character" />
      </RouterLink>
    </li>
  </ul>
  <div v-if="!isLoading && error">
    <p class="text-red-500">{{ error }}</p>
    Try get data again
    <CustomButton @custom-click="getData(url)">Get data</CustomButton>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Character from '@/components/Character.vue';

export type Character = {
  id: string
  name: string
  status: string
  species: string
  gender: string
  image: string
}

type Info = {
  next: string
  prev: string
}

const characters = ref<Character[]>([])
const isLoading = ref(false)
const error = ref('')
const pageInfo = ref<Info>({'next' : '', 'prev' : ''})
const url = ref('https://rickandmortyapi.com/api/character')

const router = useRouter()
const route = useRoute()

onMounted(() => {
  const page = route.query.page || 1

  getData(`${url.value}?page=${page}`)
})

const getData = async (url: string) => {
  isLoading.value = true
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const data = await response.json()
    const { info, results } = data as { info: Info, results: Character[] }
    characters.value = results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        status: result.status,
        species: result.species,
        gender: result.gender,
        image: result.image
      }
    })

    pageInfo.value.next = info.next
    pageInfo.value.prev = info.prev

    isLoading.value = false
  } catch (e) {
    error.value = 'Something went wrong'
    isLoading.value = false
  }
}

const handleNext = () => {
  const nextPage = getPageNumberFromUrl(pageInfo.value.next);
  router.push({ query: { page: nextPage } });
  getData(pageInfo.value.next);
};


const handlePrev = () => {
  const previousPage = getPageNumberFromUrl(pageInfo.value.prev);
  router.push({ query: { page: previousPage } });
  getData(pageInfo.value.prev)
}

const getPageNumberFromUrl = (url: string): string => {
  const queryString = url.split('?')[1];
  const params = new URLSearchParams(queryString)
  const pageNumber = params.get("page")
  return pageNumber ? pageNumber : ''
}

</script>

