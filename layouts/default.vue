<template>
  <div class="layout-container layout-default" :class="thisRouteClass">
    <SiteNav />
    <nuxt />
    <SiteFooter />
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
     thisRouteClass() {
      const path = this.$route.fullPath;
      let thisRouteClass;
        if (path === "/") {
          thisRouteClass = "home";
        } else {
          thisRouteClass = path.split("/");
        }

      return thisRouteClass;
    },
  },
};
</script>
