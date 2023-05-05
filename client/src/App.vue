<script>
import Home from '@/components/Home.vue'
import Learning from '@/components/Learning.vue'

const routes = {
  '/': Learning,
  '/home': Home
}
export default(await import('vue')).defineComponent({
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || Home
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
})
</script>

<template>
  <component :is="currentView" />
</template>