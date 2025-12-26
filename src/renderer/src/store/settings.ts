import { useStorage } from '@vueuse/core'
import { watch } from 'vue'

export const settingsStore = useStorage('pog-settings', {
  theme: 'picopad', // 'picopad' or 'picopad-light'
  disableAnimations: false,
  showGrid: true
})

// Watcher to apply theme
watch(
  () => settingsStore.value.theme,
  (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  },
  { immediate: true }
)

// Watcher to apply animations setting
watch(
  () => settingsStore.value.disableAnimations,
  (disabled) => {
    if (disabled) {
      document.body.classList.add('no-animations')
    } else {
      document.body.classList.remove('no-animations')
    }
  },
  { immediate: true }
)

// Watcher to apply grid setting
watch(
  () => settingsStore.value.showGrid,
  (show) => {
    if (show) {
      document.body.classList.remove('no-grid')
    } else {
      document.body.classList.add('no-grid')
    }
  },
  { immediate: true }
)
