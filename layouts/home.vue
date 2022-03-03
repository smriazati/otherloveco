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
            siteDesc,
        siteTitle,
          "favicon": favicon.image.asset->url,
  "siteLogo": {
        "url": siteLogo.image.asset->url,
        "alt": siteLogo.image.alt
  },
  "submark": {
        "url": submark.image.asset->url,
        "alt": submark.image.alt
  },
   "ogImg": {
        "url": ogImg.image.asset->url,
        "alt": ogImg.image.alt
    }
          }`;
      this.siteSettings = await this.$sanity
        .fetch(query)
        .then((res) => this.$store.commit("siteSettings/setData", res[0]));
    }
  },
};
</script>
