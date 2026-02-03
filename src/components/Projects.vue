<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import barcodeLogo from '@/assets/images/barcode.avif'
import lockMasterLogo from '@/assets/images/lockMaster-logo.png'

const { isDark } = useDark()
const { t } = useI18n()

const projects = [
  { img: lockMasterLogo, titleKey: 'projects.lockmaster.title', descKey: 'projects.lockmaster.description', percent: 100 },
  { img: barcodeLogo, titleKey: 'projects.barcodec.title', descKey: 'projects.barcodec.description', percent: 100 },
  { img: '/agri-sense.png', titleKey: 'projects.agrisense.title', descKey: 'projects.agrisense.description', percent: 60 },
  { img: '/pracby.png', titleKey: 'projects.pracby.title', descKey: 'projects.pracby.description', percent: 20 },
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
      class="text-xl sm:text-2xl mb-8 text-center "
      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
    >
      {{ t('projects.title') }}
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-7xl">
      <div
        v-for="proj in projects"
        :key="proj.titleKey"
        class="flex items-center p-4 gap-5 rounded-2xl transition-all duration-300 hover:scale-102 shadow-md hover:shadow-lg"
        :class="isDark ? 'bg-[#2e2e2e]' : 'bg-gray-100'"
      >
        <!-- Image -->
        <img
          :src="proj.img"
          :alt="t(proj.titleKey)"
          class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-contain sm:p-2 lg:p-2"
        />

        <!-- Text -->
        <div
          class="flex flex-col justify-between w-50 sm:w-80 h-full"
          :class="isDark ? 'text-gray-300' : 'text-gray-700'"
        >
          <div class="text-lg sm:text-xl">
            {{ t(proj.titleKey) }}
          </div>
          <div class="text-xs sm:text-sm opacity-80">
            {{ t(proj.descKey) }}
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full pr-4 pb-2">
            <div class="flex justify-end mb-1">
              <span class="text-xs font-semibold">{{ proj.percent }}%</span>
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