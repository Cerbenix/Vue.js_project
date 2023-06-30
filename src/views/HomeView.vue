<template>
  <main>
    <div class="flex justify-center p-8">
      <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <ul class="flex justify-evenly mb-4">
          <li v-for="option in filterOptions" :key="option">
            <CustomButton
                @customClick="selectedFilter = option"
                :class="{
            'bg-cyan-500 hover:text-white': isActiveFilter(option)
          }"
            >
              {{ option }}
            </CustomButton>
          </li>
        </ul>

        <h1 class="text-white text-center text-2xl mb-4">TODO</h1>

        <ul class="flex flex-col gap-4">
          <li
              v-for="item in filterdTodosList"
              :key="item.id"
              class="bg-slate-700 text-slate-200 p-3 flex justify-between gap-x-4"
          >
            <TodoItem
                :item="item"
                @handleDelete="(id) => deleteItem(id)"
                @update-todo-name="(newValue) => (item.name = newValue)"
                v-model:isCompleted="item.isFinished"
                class="bg-blue-400"
            />
          </li>
        </ul>

        <form
            @submit.prevent="handleSubmit"
            class="flex gap-x-4 rounded p-4"
        >
          <CustomInput v-model:value="inputValue" />
          <CustomButton type="submit"> Submit </CustomButton>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomButton from '../components/CustomButton.vue'
import CustomInput from '../components/CustomInput.vue'
import TodoItem from '../components/TodoItem.vue'

export type Todo = {
  id: string
  name: string
  isFinished: boolean
}

type Filter = 'all' | 'finished' | 'unfinished'
const filterOptions = ['all', 'finished', 'unfinished'] as const

const selectedFilter = ref<Filter>('all')

const count = ref(0)


const filterdTodosList = computed(() => {
  if (selectedFilter.value === 'finished') {
    return todos.value.filter((item) => item.isFinished)
  }

  if (selectedFilter.value === 'unfinished') {
    return todos.value.filter((item) => !item.isFinished)
  }

  return todos.value
})

const handleClick = () => {
  count.value++
}

// Updated computed
const isActiveFilter = computed(() => {
  return (filter: Filter) => filter === selectedFilter.value
})

const todos = ref([
  {id: 1, name: 'Buy food', isFinished: false},
])

const inputValue = ref('')

const handleSubmit = () => {
  todos.value.push({
    id: todos.value.length + 1,
    name: inputValue.value,
    isFinished: false
  })
  inputValue.value = ''
}

const deleteItem = (itemId: number) => {
  todos.value = todos.value.filter((item) => item.id !== itemId)
}

</script>



