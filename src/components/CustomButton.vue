<template>
  <button
      @click="handleClick"
      :type="props.type"
      :disabled="props.isDisabled"
      class="{
        border text-white px-4 py-2 text-xl hover:text-orange-400 transition-colors duration-200 rounded bg-cyan-500
        :!props.isDisabled, 'opacity-50 cursor-not-allowed': props.isDisabled
      }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    isDisabled?: boolean
  }>(),
  {
    type: 'button',
    isDisabled: false
  }
)

const emit = defineEmits<{
  (e: 'customClick'): void
}>()

const handleClick = () => {
  emit('customClick')
}
</script>