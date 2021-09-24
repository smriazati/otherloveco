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
          <h2 v-if="homePage.bannerText">
            {{ homePage.bannerText }}
          </h2>
          <p v-if="homePage.subText">
            {{ homePage.subText }}
          </p>
        </div>
      </section>
    </div>
  </div>
    <section class="logo-scroller grid-fixed" v-if="homePage">
      <div ref="scrollerWrapper" class="scroller-wrapper" v-if="homePage.logos">
        <div v-for="item in homePage.logos" :key="item._id" class="logo">
          <img
            :src="`${$urlFor(item.url).forceDownload(item.originalFilename).size(500)}`"
            :alt="item.alt"
            width="500"
          />
            <!-- <SanityImage
                :asset-id="item.asset._ref"
                auto="format"
                :alt="item.alt"
              /> -->
        </div>   
      </div>
    </section>
</div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {

  async asyncData({ $sanity }) {
    const thisPage = "homePage"
    const query = groq`*[_type == "${thisPage}"]{
      bannerText,
      subText,
      "logos": logos[]{
        alt,
        asset,
        "url": asset->url,
        "originalFilename": asset->originalFilename
      }
    }`;
    const homePage = await $sanity.fetch(query).then((res) => res[0]);

    const metadataQuery = groq`*[_type == "${thisPage}"]{
      "pageMetadata": {
        "pageTitle": pageMetadata.pageTitle,
        "pageDesc": pageMetadata.pageDesc,
        "ogImage": {
          "url": pageMetadata.ogImage.asset->url
        }
      }
    }`;
    const pageMetadata = await $sanity.fetch(metadataQuery).then((res) => res[0].pageMetadata);

    return { homePage, pageMetadata };
  },

  layout: "home",
  data() {
    return {
      name: "Home"
    }
  },
  head() {
    return {
      title: this.pageMetadata ? (this.pageMetadata.pageTitle ? this.pageMetadata.pageTitle : this.name): this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata ? (this.pageMetadata.pageDesc ? this.pageMetadata.pageDesc : ""): "",
        },
        { 
          hid: 'og:image', 
          property: 'og:image', 
          content: this.pageMetadata ? (this.pageMetadata.ogImage ? `${this.$urlFor(this.pageMetadata.ogImage.url).forceDownload().size(800).url()}` : ""): "",
        },
      ],
    };
  },
  mounted() {
    console.log(this);
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