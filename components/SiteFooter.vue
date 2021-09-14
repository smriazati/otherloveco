<template>
  <footer class="site-footer">
    <div v-if="siteFooter[0]" class="primary-footer row">
      <div class="col footer-column-block" v-if="siteFooter[0].footerCol1">
        <SanityContent :blocks="siteFooter[0].footerCol1" />
      </div>

      <div class="col footer-column-block" v-if="siteFooter[0].footerCol2">
        <SanityContent :blocks="siteFooter[0].footerCol2" />
      </div>
     
      <div class="col footer-column-block" v-if="siteFooter[0].footerCol3">
        <SanityContent :blocks="siteFooter[0].footerCol3" />
      </div>
    
      <div id="backToTop" class="col">
        <button @click="backToTop">Back to top</button>
      </div>
    </div>
    <div class="sub-footer">
      <p>&copy; 2021. Made with Otherlove, LLC.</p>
      <div v-if="siteSettings[0]" class="submark">
        <div v-if="siteSettings[0].favicon" class="image-wrapper">
            <nuxt-link to="/">
            <SanityImage
              :asset-id="siteSettings[0].favicon.asset._ref"
              auto="format"
            />
            </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
      const query = groq`*[_type == "siteFooter"]`;
      const query2 = groq`*[_type == "siteSettings"]`;
      this.siteFooter = await this.$sanity.fetch(query).then((res) => res);
      this.siteSettings = await this.$sanity.fetch(query2).then((res) => res);
  },
  data() {
    return {
      siteFooter: [],
      siteSettings: []
    }
  },
  methods: {
    backToTop() {
      window.scrollTo(0,0);
    }
  },
}

</script>
