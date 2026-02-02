<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import profilePhoto from '@/assets/images/profile.jpeg'

const { isDark } = useDark()
const { t } = useI18n()
</script>

<template>
  <div
    id="section-1"
    class="flex flex-col sm:flex-row items-center justify-center w-full min-h-screen transition-colors duration-500 pt-24"
    :class="isDark ? 'bg-[#212121] text-[#d2d2d2]' : 'bg-white text-[#505050]'"
  >
    <!-- Profile Photo -->
    <div
      class="flex items-center justify-center border-[16px] sm:border-[20px] border-solid rounded-full transition-colors duration-500"
      :class="isDark ? 'border-[#343434] hover:border-[#3a3a3a]' : 'border-[rgba(220,220,220,1)] hover:border-[rgba(210,210,210,1)]'"
    >
      <img
        :src="profilePhoto"
        alt="Profile"
        class="w-40 h-40 sm:w-60 sm:h-60 rounded-full object-cover cursor-pointer"
      />
    </div>

    <!-- Info Text -->
    <div class="w-80 m-10 text-center sm:text-left  font-light">
      <div class="text-2xl sm:text-4xl whitespace-nowrap">
        {{ t('home.greeting') }}
      </div>
      <div class="text-base sm:text-lg opacity-80 mt-1">
        {{ t('home.role') }}
      </div>
      <div class="text-sm sm:text-base pt-4">
        <span v-html="t('home.description', { company: `<a href='https://www.eliar.com/' target='_blank' class='underline text-inherit hover:opacity-70'>Eliar Elektronik</a>` })" />
      </div>
    </div>
  </div>
</template>
