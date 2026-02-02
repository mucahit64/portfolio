<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark } from '@/composables/useDark'
import Footer from '@/components/Footer.vue'

const { isDark } = useDark()
const { t } = useI18n()

const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)
const responseMessage = ref('')
const success = ref(false)

async function sendEmail() {
  loading.value = true
  responseMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('message', message.value)

    const response = await fetch('/send-email.php', {
      method: 'POST',
      body: formData,
    })

    const text = await response.text()
    success.value = text.includes('success')

    if (success.value) {
      responseMessage.value = t('contact.success')
      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      responseMessage.value = t('contact.error')
    }

    setTimeout(() => (responseMessage.value = ''), 5000)
  } catch {
    success.value = false
    responseMessage.value = t('contact.error')
  }

  loading.value = false
}
</script>

<template>
  <div
    id="section-4"
    class="flex flex-col min-h-screen w-full pt-24"
    :class="isDark ? 'bg-[#212121] text-white' : 'bg-white text-black'"
  >
    <!-- Content -->
    <div class="flex flex-col items-center justify-center pb-24">
      <!-- Title -->
      <div
        class="text-xl sm:text-2xl mb-4 text-center"
        :class="isDark ? 'text-gray-300' : 'text-gray-700'"
      >
        {{ t('contact.title') }}
      </div>

      <!-- Form Card -->
      <div
        class="w-full max-w-xs rounded-2xl p-6 shadow-md"
        :class="isDark ? 'bg-[#383838] text-white' : 'bg-[rgb(233,233,233)] text-black'"
      >
        <form class="flex flex-col" @submit.prevent="sendEmail">
          <div
            class="text-base sm:text-lg mb-4 text-center"
            :class="isDark ? 'text-gray-300' : 'text-gray-700'"
          >
            {{ t('contact.formTitle') }}
          </div>

          <!-- Name -->
          <input
            v-model="name"
            type="text"
            :placeholder="t('contact.namePlaceholder')"
            :disabled="loading"
            required
            class="mb-4 p-3 rounded-lg border outline-none transition-colors"
            :class="isDark 
              ? 'bg-[#2e2e2e] border-[#444] text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500'"
          />

          <!-- Email -->
          <input
            v-model="email"
            type="email"
            :placeholder="t('contact.emailPlaceholder')"
            :disabled="loading"
            required
            class="mb-4 p-3 rounded-lg border outline-none transition-colors"
            :class="isDark 
              ? 'bg-[#2e2e2e] border-[#444] text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500'"
          />

          <!-- Message -->
          <textarea
            v-model="message"
            :placeholder="t('contact.messagePlaceholder')"
            :disabled="loading"
            required
            maxlength="500"
            rows="4"
            class="mb-4 p-3 rounded-lg border outline-none transition-colors resize-none"
            :class="isDark 
              ? 'bg-[#2e2e2e] border-[#444] text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-blue-500'"
          />

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full h-12 rounded-lg text-white transition-colors bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </span>
            <span v-else>{{ t('contact.sendButton') }}</span>
          </button>

          <!-- Response Message -->
          <div
            v-if="responseMessage"
            class="pt-2 text-center"
            :class="success ? 'text-green-500' : 'text-red-500'"
          >
            {{ responseMessage }}
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <Footer class="mt-auto" />
  </div>
</template>
