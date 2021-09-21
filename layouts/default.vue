<template>
  <div class="layout-container layout-default" :class="thisRouteClass">
    <SiteNav />
    <nuxt />
    <SiteFooter />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
    const query = groq`*[_type == "siteFooter"]`;
    const query2 = groq`*[_type == "siteSettings"]`;
    if (!this.$store.state.siteFooter.isLoaded) {
      this.siteFooter = await this.$sanity.fetch(query).then((res) => this.$store.commit('siteFooter/setData', res[0]));
    }
    if (!this.$store.state.siteSettings.isLoaded) {
      this.siteSettings = await this.$sanity.fetch(query2).then((res) => this.$store.commit('siteSettings/setData', res[0]));
    }
  },
  mounted() {
    const windowDim = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    // this.$store.commit("helpful/setWindow", windowDim);
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
