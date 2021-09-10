<template>
  <div class="layout-container" :style="`background-color: ${bodyBg}`">
    <!-- <SiteNav /> -->
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    const windowDim = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    this.$store.commit("helpful/setWindow", windowDim);
  },
  computed: {
    bodyBg() {
      return this.$store.state.helpful.bodyBg;
    },
  },
};
</script>
