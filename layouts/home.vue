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
    if (!this.$store.state.siteSettings.isLoaded) {
          const query = groq`*[_type == "siteSettings"]{
            "favicon": {
              "originalFilename": favicon.asset->originalFilename,
              "url": favicon.asset->url
            },
            "ogImg": {
              "url": ogImg.asset->url
            },
            siteDesc,
            "siteLogo": {
              "url": siteLogo.asset->url,
              "originalFilename": siteLogo.asset->originalFilename
            },
            siteTitle
          }`;
          this.siteSettings = await this.$sanity.fetch(query).then((res) => this.$store.commit('siteSettings/setData', res[0]));
    }
  },
};
</script>
