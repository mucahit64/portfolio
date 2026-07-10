<script setup lang="ts">
import Topbar from '@/components/Topbar.vue'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Skills from '@/components/Skills.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-y-auto screen-scroller select-none">
    <Topbar />
    <Home />
    <About />
    <Skills />
    <Projects />
    <Contact />
    <Footer />
  </div>
</template>

<style scoped>
.screen-scroller {
  -webkit-overflow-scrolling: touch;
}
</style>