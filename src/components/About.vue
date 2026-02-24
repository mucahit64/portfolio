<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import eliLogo from '@/assets/images/eli-logo.svg'
import eliLogoDark from '@/assets/images/eli-logo-white.svg'
import eliarLogo from '@/assets/images/eliar-logo.svg'
import eliarLogoDark from '@/assets/images/eliar-logo-white.svg'
import nisantasiLogo from '@/assets/images/nu-logo.png'
import NKULogo from '@/assets/images/nku-logo.svg'
import NKULogoDark from '@/assets/images/nku-logo-white.svg'

const { t } = useI18n()
const { isDark } = useDark()

const aboutSections = [
  {
    type: 'experience',
    items: [
      {
        logo: eliarLogo,
        logoDark: eliarLogoDark,
        title: 'about.eliarElectronic',
        subtitle: 'about.softwareDeveloper',
        start: '2023',
        end: 'about.present',
      },
      {
        logo: eliLogo,
        logoDark: eliLogoDark,
        title: 'about.eliWorldwideExpressLogistics',
        subtitle: 'about.computerProgrammer',
        start: '2020',
        end: '2021',
      },
    ],
  },
  {
    type: 'education',
    items: [
      {
        logo: nisantasiLogo,
        logoDark: nisantasiLogo,
        title: 'about.computerEngineering',
        subtitle: 'about.nisantasiUniversity',
        start: '2020',
        end: '2023',
      },
      {
        logo: NKULogo,
        logoDark: NKULogoDark,
        title: 'about.computerProgramming',
        subtitle: 'about.namikKemalUniversity',
        start: '2018',
        end: '2020',
      },
    ],
  },
]
</script>

<template>
  <div
    id="section-2"
    class="flex flex-col w-full min-h-screen justify-center items-center pt-24"
    :class="isDark ? 'bg-[#212121] text-white' : 'bg-white text-black'"
  >
    <!-- Title -->
    <div
      class="text-xl sm:text-2xl mb-4 text-center"
      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
    >
      {{ t('about.aboutMe') }}
    </div>

    <!-- Experience & Education -->
    <div
      v-for="(section, sIndex) in aboutSections"
      :key="sIndex"
      class="w-80 sm:w-[30rem] rounded-2xl p-4 mb-4"
      :class="isDark ? 'bg-[#2e2e2e]' : 'bg-gray-100'"
    >
      <!-- Section Title -->
      <div
        class="text-lg sm:text-xl mb-3 text-center capitalize font-medium"
        :class="isDark ? 'text-gray-300' : 'text-gray-700'"
      >
        {{ t(`about.${section.type}`) }}
      </div>

      <!-- Content Cards -->
      <div
        v-for="(item, index) in section.items"
        :key="index"
        class="flex items-center justify-between rounded-xl p-3 mb-3 last:mb-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102"
        :class="isDark ? 'bg-[#383838]' : 'bg-white'"
      >
        <div class="flex items-center">
          <img
            :src="isDark ? item.logoDark : item.logo"
            alt="Logo"
            class="w-8 h-8 sm:w-12 sm:h-12 object-contain p-1 mr-3"
          />
          <div>
            <div class="text-sm sm:text-base font-medium">
              {{ t(item.title) }}
            </div>
            <div class="text-xs sm:text-sm opacity-80">
              {{ t(item.subtitle) }}
            </div>
          </div>
        </div>
        <div class="text-right text-xs sm:text-sm opacity-80">
          <div>{{ item.start }}</div>
          <div>{{ t(item.end) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
