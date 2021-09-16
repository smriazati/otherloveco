<template>
  <div class="about-wrapper">
    <div ref="container" class="container container-no-grid page-about" v-if="aboutPage[0]">
      <section ref="topFixed" v-if="aboutPage[0].section1" class="section1 fixed">
        <div class="fixed-content">
          <div class="text-wrapper">
            <h2 v-if="aboutPage[0].section1.headline"> {{ aboutPage[0].section1.headline }}</h2>
            <p v-if="aboutPage[0].section1.subheadline" class="subheadline">{{ aboutPage[0].section1.subheadline }}</p>
          </div>
        </div>
      </section>
      <section v-if="aboutPage[0].capabilities" class="capabilities full-row">
        <div class="image-wrapper" v-if="aboutPage[0].capabilities.image">
            <SanityImage
                :asset-id="aboutPage[0].capabilities.image.asset._ref"
                auto="format"
              />
          </div>
          <div class="text-wrapper">
              <h2 v-if="aboutPage[0].capabilities.headline"> {{ aboutPage[0].capabilities.headline }}</h2>
              <div class="main-list" v-if="aboutPage[0].capabilities.mainList">
                <SanityContent :blocks="aboutPage[0].capabilities.mainList" />
              </div>
              <div class="sub-list" v-if="aboutPage[0].capabilities.subList">
                <SanityContent class="two-col" :blocks="aboutPage[0].capabilities.subList" />
              </div>

          </div>
      </section>
      <section v-if="aboutPage[0].beliefBanner" class="belief-banner full-row">
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].beliefBanner.title"> {{ aboutPage[0].beliefBanner.title }}</h2>
          <ol ref="ticker">
            <li v-for="item in aboutPage[0].beliefBanner.beliefs" :key="item._id">{{ item }}</li>
          </ol>
        </div>
      </section>
      <section v-if="aboutPage[0].section2" class="section2 image-text-row image-right">
        
        <div class="image-wrapper overflow" v-if="aboutPage[0].section2">
          <div v-if="aboutPage[0].section2.video" class="video-wrapper">
            <SanityFile :asset-id="aboutPage[0].section2.video.asset._ref">
              <template #default="{ src }">
                <video :src="src" autoplay muted loop></video>
              </template>
            </SanityFile>
          </div>
           <div v-if="aboutPage[0].section2.image">
            <SanityImage
                :asset-id="aboutPage[0].section2.image.asset._ref"
                auto="format"
              />  
           </div>
          
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section2.headline"> {{ aboutPage[0].section2.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section2.description">
            <SanityContent :blocks="aboutPage[0].section2.description" />
          </div>
        </div>
      </section>

      <section v-if="aboutPage[0].section3" class="section3 image-text-row image-left">
        <div class="image-wrapper" v-if="aboutPage[0].section3.image">
          <SanityImage
                :asset-id="aboutPage[0].section3.image.asset._ref"
                auto="format"
              />
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section3.headline"> {{ aboutPage[0].section3.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section3.description">
            <SanityContent :blocks="aboutPage[0].section3.description" />
          </div>
        </div>
      </section>

      <section v-if="aboutPage[0].section4" class="section4 image-text-row image-right">
        <div class="image-wrapper overflow" v-if="aboutPage[0].section4">
           <div v-if="aboutPage[0].section4.image1">
            <SanityImage
                :asset-id="aboutPage[0].section4.image1.asset._ref"
                auto="format"
              />  
           </div>
           <div v-if="aboutPage[0].section4.image2">
            <SanityImage
                :asset-id="aboutPage[0].section4.image2.asset._ref"
                auto="format"
              />  
           </div>
          
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section4.headline"> {{ aboutPage[0].section4.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section4.description">
            <SanityContent :blocks="aboutPage[0].section4.description" />
          </div>
        </div>
      </section>

    </div>

      <section class="full-row cta">                
        <div class="text-wrapper" v-if="aboutPage[0].cta">
          <h2 v-if="aboutPage[0].cta.text">{{ aboutPage[0].cta.text }}</h2>
          <button class="flat underlined"><nuxt-link to="/contact">Get in touch</nuxt-link></button>
        </div>
    </section>

    <section class="video-scroller-bg" ref="fixedVid">
      <div ref="vidWrapper" class="video-wrapper">
        <div>
          <SanityFile :asset-id="aboutPage[0].cta.bgvideo.asset._ref">
            <template #default="{ src }">
              <video :src="src" autoplay muted loop></video>
            </template>
          </SanityFile>
        </div>
      </div>

    </section>
  </div>
</template>

<script>

import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const query1 = groq`*[_type == "aboutPage"]`;
    // const query2 = groq`*[_type == "siteSettings"]`;
    const aboutPage = await $sanity.fetch(query1).then((res) => res);
    // const siteSettings = await $sanity.fetch(query2).then((res) => res);
    return { aboutPage };
  },
  name: 'About',
  // head() {
  //   return {
  //     title: `About | ${this.siteSettings[0].siteTitle}`,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: this.siteSettings[0].siteDesc,
  //       },
  //     ],
  //   };
  // },
  mounted() {
    this.setFixedPos(this.$refs.topFixed);
    this.$nextTick(function() {
      this.setTickerAnimation();
      this.setFixedTextFadeOut();
      this.setVidFadeIn();
    })
    window.addEventListener('resize', () => {
      this.setFixedPos(this.$refs.topFixed);
      this.setTickerAnimation();
      this.setFixedTextFadeOut();
      this.setVidFadeIn();
    })
  },
  methods: {
    setFixedPos(ref) {
      const fixedSection = ref;
      if (fixedSection && window.innerWidth > 600) {

        // if .fixed-content is taller than window
        const height = fixedSection.offsetHeight;
        const next = fixedSection.nextElementSibling;
        fixedSection.style.position = 'fixed';
        next.style.marginTop = `${height + 60}px`
      }
    },
    setFixedTextFadeOut() {
      const ref = this.$refs.topFixed;
      const scrollHeight = window.innerHeight;

      if (!ref || !gsap) {
        return
      }
      gsap.to(ref, {
        opacity: 0,
        scrollTrigger: {
          trigger: ref,
          start: scrollHeight,
          end: "+=50",
          scrub: true,
          toggleActions: "play pause resume reset",
        }
      })
    },
    setVidFadeIn() {
      const ref = this.$refs.fixedVid;
      const scrollHeight = window.innerHeight;
      if (!ref || !gsap) {
        return
      }
      gsap.set(ref, {
        opacity: 0,
      })
      gsap.to(ref, {
        opacity: 1,
        scrollTrigger: {
          trigger: ref,
          start: scrollHeight,
          end: "+=50",
          scrub: true,
          toggleActions: "play pause resume reset",
        }
      })
    },
    setTickerAnimation() {
      const ref = this.$refs.ticker;
      if (!ref || !gsap) {
        return
      }
      let tickerStart;
      let speed;
      if (window.innerWidth > 768) {
        tickerStart = ref.offsetWidth;
        speed = 30;
      } else {
        tickerStart = window.innerWidth / 2;
        speed = 15;
      }

      
      gsap.set(ref, {
        x: tickerStart - 80
      })
      gsap.to(ref, {
        x: -ref.offsetWidth,
        repeat: -1,
        ease: 'linear',
        duration: speed,
      })
    }
  }
};
</script>

