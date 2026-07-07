import { ref, watch } from 'vue'

function getInitialTheme(): boolean {
  try {
    return localStorage.getItem('theme') === 'dark'
  } catch {
    return false
  }
}

const isDark = ref(getInitialTheme())

watch(isDark, (val) => {
  try {
    localStorage.setItem('theme', val ? 'dark' : 'light')
  } catch { /* storage unavailable */ }
  document.documentElement.classList.toggle('dark', val)
}, { immediate: true })

export function useDark() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggle
  }
}
