<template>
<div class="container-home">
  <div class="fixed-container">
    <div class="fixed-wrapper grid-fixed">
      <section>
        <div
        v-if="homePage"
          class="text-wrapper"
          ref="textWrapper"
        >
          <h2 v-if="homePage[0].bannerText">
            {{ homePage[0].bannerText }}
          </h2>
          <p v-if="homePage[0].subText">
            {{ homePage[0].subText }}
          </p>
        </div>
      </section>
    </div>
  </div>

    <section class="logo-scroller grid-fixed" v-if="homePage">
      <div ref="scrollerWrapper" class="scroller-wrapper" v-if="homePage[0].logos">
        <div v-for="item in homePage[0].logos" :key="item._id" class="logo">
            <SanityImage
                :asset-id="item.asset._ref"
                auto="format"
                :alt="item.alt"
              />
        </div>
                
      </div>
     
    </section>
</div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
  // async fetch ({store}) {
  //     const query = groq`*[_type == "siteFooter"]`;
  //     const query2 = groq`*[_type == "siteSettings"]`;
  //     this.siteFooter = await this.$sanity.fetch(query).then((res) => {store.commit('siteFooter/setData', res)});
  //     this.siteSettings = await this.$sanity.fetch(query2).then((res) => {store.commit('siteSettings/setData', res)});
  // },
  // async fetch() {
  //   const query = groq`*[_type == "siteFooter"]`;
  //   const query2 = groq`*[_type == "siteSettings"]`;
  //   if (!this.$store.state.siteFooter.isLoaded) {
  //     this.siteFooter = await this.$sanity.fetch(query).then((res) => this.$store.commit('siteFooter/setData', res[0]));
  //   }
  //   if (!this.$store.state.siteSettings.isLoaded) {
  //     this.siteSettings = await this.$sanity.fetch(query2).then((res) => this.$store.commit('siteSettings/setData', res[0]));
  //   }
  // },
  async asyncData({ $sanity }) {
    const query = groq`*[_type == "homePage"]`;
    const homePage = await $sanity.fetch(query).then((res) => res);
    return { homePage };
  },
  layout: "home",
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: this.title.toLowerCase()
      }
    }
  },
  data() {
    return {
      siteFooter: [],
      siteSettings: [],
      title: 'Home',
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.onImageLoad();
    })
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const isHomePage = document.querySelector('body.home');
      if (isHomePage) {
        const windowH = window.innerHeight + window.scrollY;
        const bodyH = document.body.offsetHeight - 10
        if (windowH >= bodyH) {
          window.scrollTo(0,0);
        }
      }
    },
   registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    setTimeline(ref) {
      this.registerPlugins();
        if (!gsap) {
          console.log('error, no gsap')
          return;
        }
        // console.log('setting timeline on', ref)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            // markers: true,
                start: `top-=${ref.offsetHeight}px bottom`, 
              end: "bottom top",
              scrub: 0.1
            }
          });
        
         tl
          .to(ref, {scale: 0, '-webkit-filter': 'blur(30px)', filter: 'blur(30px)', duration: 1})
          .to(ref, {scale: 0.3, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)',  duration: 2})
          .to(ref, {scale: 1, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)', duration: 6})
          .to(ref, {'-webkit-filter': 'blur(30px)', filter: 'blur(30px)',  duration: 1});
    },
    onImageLoad() {
        const imageWrapper = this.$refs.scrollerWrapper;
        if (imageWrapper) {
          const refs = gsap.utils.toArray(
            imageWrapper.querySelectorAll(".logo")
          );
          if (refs) {
            refs.forEach((ref) => {
              const img = ref.querySelector('img');
              if (img.complete) {
                this.setTimeline(ref);
              } else {
                img.addEventListener('load', () => {
                    this.setTimeline(ref);
                })
                img.addEventListener('error', () => {
                    console.log('error, no image loaded, no animation set')
                })
              }
            });
          }
        }
    }
   
  },
};
</script>