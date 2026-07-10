<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import barcodeLogo from '@/assets/images/barcode-logo.svg'
import barcodeLogoDark from '@/assets/images/barcode-logo-white.svg'
import lockMasterLogo from '@/assets/images/lock-master-logo.svg'
import agriSenseLogo from '@/assets/images/agri-sense.png'
import pracbyLogo from '@/assets/images/pracby.png'
import pracbyLogoDark from '@/assets/images/pracby-white.png'

const { isDark } = useDark()
const { t } = useI18n()

const projects = [
  { img: lockMasterLogo, imgDark: lockMasterLogo, titleKey: 'projects.lockmaster.title', descKey: 'projects.lockmaster.description', percent: 100, link: '' },
  { img: barcodeLogo, imgDark: barcodeLogoDark, titleKey: 'projects.barcodec.title', descKey: 'projects.barcodec.description', percent: 100 , link: '' },
  { img: agriSenseLogo, imgDark: agriSenseLogo, titleKey: 'projects.agrisense.title', descKey: 'projects.agrisense.description', percent: 85, link: 'https://agri-sense.mucahit-yaman.workers.dev' },
  { img: pracbyLogo, imgDark: pracbyLogoDark, titleKey: 'projects.pracby.title', descKey: 'projects.pracby.description', percent: 45, link: 'https://pracby.com' },
]

const openProject = (link: string) => {
  if (!link) return
  window.open(link, '_blank', 'noopener,noreferrer')
}

const getImage = (proj: { img: string; imgDark: string }) => isDark.value ? proj.imgDark : proj.img
</script>

<template>
  <div
    id="section-4"
    class="flex flex-col w-full min-h-svh justify-center items-center pt-24 pb-16 transition-colors duration-300"
    :class="isDark ? 'bg-[#212121] text-white' : 'bg-white text-gray-700'"
  >
    <!-- Title -->
    <div
      class="text-xl sm:text-2xl mb-12 text-center font-semibold"
      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
    >
      {{ t('projects.title') }}
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-7xl">
      <div
        v-for="proj in projects"
        :key="proj.titleKey"
        class="flex items-center p-4 gap-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
        :class="isDark ? 'bg-[#2e2e2e]' : 'bg-gray-100'"
        @click="openProject(proj.link)"
        >
        <!-- Image -->
        <img
          :src="getImage(proj)"
          :alt="t(proj.titleKey)"
          class="w-16 h-16 sm:w-32 sm:h-32 object-contain sm:p-2 lg:p-2"
        />

        <!-- Text -->
        <div
          class="flex flex-col justify-center w-48 sm:w-80 h-full"
          :class="isDark ? 'text-gray-300' : 'text-gray-700'"
        >
          <div class="text-lg sm:text-xl pb-2">
            <div class="flex justify-between items-center">
            {{ t(proj.titleKey) }}
            <button 
              v-if="proj.link" 
              class="text-xs font-semibold border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 cursor-pointer"
              @click.stop="openProject(proj.link)"
            >{{ t('projects.visit') }}</button>
            </div>
          </div>
          <div class="text-xs sm:text-sm opacity-80 pb-2">
            {{ t(proj.descKey) }}
          </div>
          
          <div v-if="proj.percent < 100">
            <!-- Progress Bar -->
            <div class="w-full pb-2">
              <div class="flex justify-end mb-1">
                <span class="text-xs">{{ proj.percent }}%</span>
              </div>

              <div 
                class="h-2 rounded-full overflow-hidden"
                :class="isDark ? 'bg-gray-700' : 'bg-gray-300'"
              >
                <div 
                  class="relative h-full rounded-full transition-all duration-1000 ease-out overflow-hidden"
                  :style="{ width: proj.percent + '%' }"
                  :class="proj.percent === 100 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'"
                >
                  <!-- Shimmer -->
                  <div 
                    class="absolute inset-0 w-[300%] bg-gradient-to-r 
                            from-transparent via-white/40 to-transparent 
                            animate-shimmer"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 1s linear infinite;
}
</style>