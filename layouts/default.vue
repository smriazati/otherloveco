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
    if (!this.$store.state.siteFooter.isLoaded) {
      const query = groq`*[_type == "siteFooter"]{
          footerCol1,
          footerCol2,
          footerCol3
        }`;
      this.siteFooter = await this.$sanity
        .fetch(query)
        .then((res) => this.$store.commit("siteFooter/setData", res[0]));
    }
    if (!this.$store.state.siteSettings.isLoaded) {
      const query2 = groq`*[_type == "siteSettings"]{
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
      this.siteSettings = await this.$sanity
        .fetch(query2)
        .then((res) => this.$store.commit("siteSettings/setData", res[0]));
    }
  },
  computed: {
    thisRouteClass() {
      const path = this.$route.fullPath;
      let thisRouteClass;
      if (path === "/") {
        thisRouteClass = "home";
      } else {
        if (path.includes("/work/")) {
          thisRouteClass = "work-page";
        } else {
          thisRouteClass = path.split("/");
        }
      }

      return thisRouteClass;
    },
  },
};
</script>
