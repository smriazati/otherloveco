<template>
  <footer class="site-footer">
    <div class="primary-footer row">
      <div class="col footer-column-block" v-if="footerCol1">
        <SanityContent :blocks="footerCol1" />
      </div>

      <div class="col footer-column-block" v-if="footerCol2">
        <SanityContent :blocks="footerCol2" />
      </div>
     
      <div class="col no-p-margin footer-column-block" v-if="footerCol3">
        <SanityContent :blocks="footerCol3" :serializers="serializers" />
      </div>
    
      <div id="backToTop" class="col">
        <button @click="backToTop">Back to top</button>
      </div>
    </div>
    <div class="sub-footer">
      <p>&copy; 2021. Made with Otherlove, LLC.</p>
      <div v-if="submark" class="submark">
        <div class="image-wrapper">
            <nuxt-link to="/">
            <SanityImage
              :asset-id="submark.asset._ref"
              auto="format"
              :alt="submark.alt"
            />
            </nuxt-link>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>
import { mapState } from 'vuex'

import Links from '@/components/ExternalLink.vue'
const serializers = {
  types: {},
  marks: {
      link: Links
  }
}


export default {

  created() {
    // this.serializers = {
    //   marks: {
    //     link: Links,
    //   },
    // }
  },
  data() {
    return {
      serializers: serializers
    }
  },
computed: {
  ...mapState('siteFooter', {
    footerCol1: state => state.footerCol1,
    footerCol2: state => state.footerCol2,
    footerCol3: state => state.footerCol3,
  }),
  ...mapState('siteSettings', {
    submark: state => state.favicon,
  })
},
  methods: {
    backToTop() {
      window.scrollTo(0,0);
    }
  }
}

</script>
