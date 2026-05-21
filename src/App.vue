<script setup lang="ts">
import Topbar from '@/components/Topbar.vue'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
</script>

<template>
  <div class="fixed inset-0 w-full h-full overflow-y-auto screen-scroller">
    <Topbar />
    <Home />
    <About />
    <Projects />
    <Contact />
  </div>
</template>

<style scoped>
.screen-scroller {
  -webkit-overflow-scrolling: touch;
}
</style>