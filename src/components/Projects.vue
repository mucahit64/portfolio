<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import barcodeLogo from '@/assets/images/barcode.avif'
import lockMasterLogo from '@/assets/images/lockMaster-logo.png'

const { isDark } = useDark()
const { t } = useI18n()

const projects = [
  { img: lockMasterLogo, titleKey: 'projects.lockmaster.title', descKey: 'projects.lockmaster.description' },
  { img: barcodeLogo, titleKey: 'projects.barcodec.title', descKey: 'projects.barcodec.description' },
  { img: '/agri-sense.png', titleKey: 'projects.agrisense.title', descKey: 'projects.agrisense.description' },
  { img: '/pracby.png', titleKey: 'projects.pracby.title', descKey: 'projects.pracby.description' },
]
</script>

<template>
  <div
    id="section-3"
    class="flex flex-col w-full min-h-screen justify-center items-center pt-24"
    :class="isDark ? 'bg-[#212121] text-white' : 'bg-white text-gray-700'"
  >
    <!-- Title -->
    <div
      class="text-xl sm:text-2xl mb-4 text-center"
      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
    >
      {{ t('projects.title') }}
    </div>

    <!-- Projects -->
    <div
      v-for="proj in projects"
      :key="proj.titleKey"
      class="flex items-center mb-4 last:mb-0 p-4 gap-5 rounded-[150px_40px_40px_150px] transition-colors duration-300"
      :class="isDark
        ? 'bg-[#383838] hover:bg-[#404040]'
        : 'bg-[#e9e9e9] hover:bg-[#e2e2e2]'
      "
    >
      <!-- Image -->
      <img
        :src="proj.img"
        :alt="t(proj.titleKey)"
        class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-contain transition-transform hover:scale-105"
      />

      <!-- Text -->
      <div
        class="flex flex-col w-40 sm:w-80 justify-center"
        :class="isDark ? 'text-gray-300' : 'text-gray-700'"
      >
        <div class="text-base sm:text-xl">
          {{ t(proj.titleKey) }}
        </div>
        <div class="text-sm sm:text-base mt-2 opacity-80">
          {{ t(proj.descKey) }}
        </div>
      </div>
    </div>
  </div>
</template>
