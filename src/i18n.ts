import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

function getSavedLocale(): string {
  try {
    return localStorage.getItem('locale') || 'tr'
  } catch {
    return 'tr'
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    tr
  }
})
