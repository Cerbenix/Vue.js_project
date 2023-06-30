import { reactive } from 'vue';

type Theme = 'light' | 'dark'

export const state = reactive({
  theme: 'light' as Theme,
  updateTheme: () => {
    
    if (state.theme ==="light"){
      document.body.classList.add("dark")
      state.theme = 'dark'
    }else {
      document.body.classList.remove("dark")
      state.theme = 'light'
    }
  }
})