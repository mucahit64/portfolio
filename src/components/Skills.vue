<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'

const { t } = useI18n()
const { isDark } = useDark()

interface Skill {
  name: string
  icon: string
  invertInDark?: boolean
}

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const skills: Skill[] = [
  { name: 'TypeScript', icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'JavaScript', icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'Vue.js', icon: `${CDN}/vuejs/vuejs-original.svg` },
  { name: 'Nuxt', icon: `${CDN}/nuxtjs/nuxtjs-original.svg` },
  { name: 'Node.js', icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'Express', icon: `${CDN}/express/express-original.svg`, invertInDark: true },
  { name: 'C#', icon: `${CDN}/csharp/csharp-original.svg` },
  { name: 'PostgreSQL', icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'MS SQL Server', icon: `${CDN}/microsoftsqlserver/microsoftsqlserver-plain.svg`, invertInDark: true },
  { name: 'Git', icon: `${CDN}/git/git-original.svg` },
]

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.08 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())

function cardDelay(index: number): string {
  return `${index * 60}ms`
}
</script>

<template>
  <div
    id="section-3"
    class="flex flex-col w-full min-h-svh justify-center items-center pt-24 pb-16 transition-colors duration-300"
    :class="isDark ? 'bg-[#212121] text-white' : 'bg-white text-gray-700'"
  >
    <!-- Section title -->
    <div
      class="text-xl sm:text-2xl mb-12 text-center font-semibold"
      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
    >
      {{ t('skills.title') }}
    </div>

    <!-- Skills flat grid -->
    <div ref="sectionRef" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl px-4 sm:px-6">
      
      <div
        v-for="(skill, index) in skills"
        :key="skill.name"
        class="flex flex-row items-center justify-start rounded-2xl cursor-default shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200
               gap-4 px-5 py-4 sm:gap-5 sm:px-8 sm:py-6 md:px-10 md:py-8
               w-full max-w-[260px] sm:max-w-none mx-auto"
        :class="[
          isDark ? 'bg-[#2e2e2e]' : 'bg-gray-100',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        ]"
        :style="{
          transitionProperty: 'opacity, transform, box-shadow, background-color',
          transitionDuration: isVisible ? '600ms' : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: isVisible ? cardDelay(index) : '0ms',
        }"
      >
        <img
          :src="skill.icon"
          :alt="skill.name"
          class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain shrink-0"
          :class="skill.invertInDark && isDark ? 'invert' : ''"
          loading="lazy"
        />
        
        <span
          class="text-sm sm:text-base font-medium leading-tight whitespace-nowrap"
          :class="isDark ? 'text-gray-200' : 'text-gray-700'"
        >
          {{ skill.name }}
        </span>
      </div>
      
    </div>
  </div>
</template>
