<template>
  <div class="layout-container layout-home">
    <SiteNav />
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
  }
};
</script>
