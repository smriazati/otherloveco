<template>
  <div class="layout-container layout-home">
    <SiteNav />
    <nuxt />
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
    const query2 = groq`*[_type == "siteSettings"]`;
    if (!this.$store.state.siteSettings.isLoaded) {
      this.siteSettings = await this.$sanity.fetch(query2).then((res) => this.$store.commit('siteSettings/setData', res[0]));
    }
  },
  mounted() {
    // const windowDim = {
    //   height: window.innerHeight,
    //   width: window.innerWidth,
    // };
    // this.$store.commit("helpful/setWindow", windowDim);
  }
};
</script>
