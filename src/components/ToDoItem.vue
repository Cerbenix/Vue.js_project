<template>
  <div class="flex">
    <input type="checkbox" :id="item.id" :checked="item.isFinished" @change="handleChange" />
    <div v-if="isEditing" class="flex px-2">
      <form @keyup.esc="endEditing" class="flex">
      <CustomInput v-model:value="item.name" class="text-black" />

      <button @click="confirmEdit" class="text-green-500 ml-2">
        Confirm
      </button>
      </form>
    </div>
    <label v-if="!isEditing"
        class="text-lg px-2"
        :for="item.id"
        :class="{
        'line-through': item.isFinished,
      }"
    >
      {{ item.name }}
    </label>
  </div>
<div class="flex">
    <button @click="startEditing" v-if="!isEditing" class="text-blue-500 ml-2">
      Edit
    </button>

    <button @click="$emit('handleDelete', item.id)" class="text-red-500 ml-2">
      <CloseIcon class="w-6 h-6" />
    </button>
</div>

</template>

<script setup lang="ts">
import type { Todo } from '@/views/HomeView.vue'
import CloseIcon from './icons/Close.vue'
import CustomInput from "@/components/CustomInput.vue";
import { ref } from 'vue'

const inputValue = ref('')
const isEditing = ref(false)
let originalValue = ''

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  item: Todo
}>()

const emit = defineEmits<{
  (e: 'handleDelete', id: string): void
  (e: 'update:isCompleted', newValue: boolean): void
  (e: 'updateTodoName', newValue: string): void
}>()

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emit('update:isCompleted', value)
}

const startEditing = () => {
  isEditing.value = true
  originalValue = props.item.name
}

const endEditing = () => {
  isEditing.value = false
  props.item.name = originalValue
}

const confirmEdit = () => {
  isEditing.value = false
  emit("updateTodoName", inputValue.value)
}
</script>