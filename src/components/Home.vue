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
    class="flex flex-col sm:flex-row items-center justify-center w-full min-h-svh transition-colors duration-300 pt-24"
    :class="isDark ? 'bg-[#212121] text-[#d2d2d2]' : 'bg-white text-[#505050]'"
  >
    <!-- Profile Photo -->
    <div
      class="flex items-center justify-center border-[16px] sm:border-[20px] border-solid rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
      :class="isDark ? 'border-[#343434] hover:border-[#3a3a3a]' : 'border-[rgba(220,220,220,1)] hover:border-[rgba(210,210,210,1)]'"
    >
      <img
        :src="profilePhoto"
        alt="Mücahit Yaman"
        class="w-40 h-40 sm:w-60 sm:h-60 rounded-full object-cover cursor-pointer"
      />
    </div>

    <!-- Info Text -->
    <div class="w-full max-w-sm px-6 mt-6 mb-8 sm:mt-0 sm:w-80 sm:m-10 text-center sm:text-left">
      <div class="text-2xl sm:text-4xl whitespace-nowrap">
        {{ t('home.greeting') }}
      </div>
      <div class="text-base sm:text-lg opacity-80 mt-1">
        {{ t('home.role') }}
      </div>
      <div class="text-sm sm:text-base pt-4">
        {{ t('home.description') }}
        <a
          href="https://www.eliar.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-inherit hover:opacity-70"
        >Eliar Elektronik</a>
        {{ t('home.descriptionSuffix') }}
      </div>
    </div>
  </div>
</template>
