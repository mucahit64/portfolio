<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import { scrollToSection } from '@/utils/scroll'

const { isDark, toggle } = useDark()
const { t, locale, availableLocales } = useI18n()

const name = computed(() => t('topbar.name'))
const surname = computed(() => t('topbar.surname'))
const shortText = computed(() => `${name.value.split(' ').map((n: string) => n.charAt(0)).join('')}${surname.value.charAt(0)}`)
const logoText = ref(shortText.value)
let animationTimeouts: number[] = []

function animateText() {
  animationTimeouts.forEach(clearTimeout)
  animationTimeouts = []

  const fullText = `${name.value} ${surname.value}`

  for (let i = 1; i <= fullText.length; i++) {
    const timeout = setTimeout(() => {
      logoText.value = fullText.slice(0, i)
    }, i * 30)
    animationTimeouts.push(timeout as unknown as number)
  }

  const reverseTimeout = setTimeout(reverseAnimateText, fullText.length * 20 + 1000)
  animationTimeouts.push(reverseTimeout as unknown as number)
}

function reverseAnimateText() {
  animationTimeouts.forEach(clearTimeout)
  animationTimeouts = []

  let fullText = `${name.value} ${surname.value}`
  const steps: string[] = [fullText]

  for (let i = fullText.length - 1; i > 0; i--) {
    const parts = fullText.split(' ')
    const n = parts[0] || ''
    const s = parts[1] || ''
    fullText = `${n.slice(0, i)} ${s.slice(0, i)}`
    steps.push(fullText)
  }
  steps.push(shortText.value)

  steps.forEach((text, index) => {
    const timeout = setTimeout(() => {
      logoText.value = text
    }, index * 30)
    animationTimeouts.push(timeout as unknown as number)
  })
}

const currentLocale = ref(locale.value)

function setLocale(val: string) {
  locale.value = val
  currentLocale.value = val
  localStorage.setItem('locale', val)
  logoText.value = shortText.value
  animateText()
}

const menuItems = computed(() => [
  { key: 'home', section: 'section-1' },
  { key: 'about', section: 'section-2' },
  { key: 'projects', section: 'section-3' },
  { key: 'contact', section: 'section-4' }
])

onMounted(() => {
  setTimeout(() => animateText(), 2000)
})

watch(locale, () => {
  logoText.value = shortText.value
})
</script>

<template>
  <div
    class="fixed text-3 flex items-center justify-between left-6 right-6 top-6 z-50 h-20 rounded-full transition-all px-6 duration-300 select-none"
    :class="isDark ? 'bg-[#2e2e2e] text-gray-300' : 'bg-gray-200 text-gray-700'"
  >
    <!-- Logo -->
    <div
      class="text-2xl transition-colors duration-300 cursor-pointer"
      @mouseenter="animateText"
      @click="scrollToSection('section-1')"
    >
      {{ logoText }}
    </div>

    <!-- Navigation & Controls -->
    <div class="flex items-center h-full">
      <!-- Menu Buttons (Hidden on mobile) -->
      <div class="hidden sm:flex h-full">
        <button
          v-for="item in menuItems"
          :key="item.key"
          class="text-xs p-4 transition-colors duration-300 uppercase"
        :class="isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-300'"
          @click="scrollToSection(item.section)"
        >
          {{ t(`topbar.${item.key}`) }}
        </button>
      </div>

      <!-- Language & Theme -->
      <div class="flex items-center gap-3 ml-4">
        <!-- Language Selector -->
        <select
          v-model="currentLocale"
          class="bg-transparent cursor-pointer text-sm font-medium focus:outline-none"
          @change="setLocale(currentLocale)"
        >
          <option v-for="loc in availableLocales" :key="loc" :value="loc" class="bg-gray-800 text-white">
            {{ loc.toUpperCase() }}
          </option>
        </select>

        <!-- Theme Toggle -->
        <button
          class="p-2 rounded-full hover:opacity-70 transition-opacity"
          @click="toggle"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
