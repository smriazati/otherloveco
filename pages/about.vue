<template>
  <div class="about-wrapper" ref="aboutWrapper">
    <div class="container container-no-grid page-about" v-if="aboutPage">
      <section ref="fixedTop" v-if="aboutPage[0].section1" class="section1 fixed">
        <div class="fixed-content">
          <div class="text-wrapper">
            <h2 v-if="aboutPage[0].section1.headline"> {{ aboutPage[0].section1.headline }}</h2>
            <p v-if="aboutPage[0].section1.subheadline" class="subheadline">{{ aboutPage[0].section1.subheadline }}</p>
          </div>
        </div>
      </section>
    </div>
    <div ref="container" class="container container-no-grid page-about" v-if="aboutPage">
      <!-- <section ref="fixedTop" v-if="aboutPage[0].section1" class="section1 fixed">
        <div class="fixed-content">
          <div class="text-wrapper">
            <h2 v-if="aboutPage[0].section1.headline"> {{ aboutPage[0].section1.headline }}</h2>
            <p v-if="aboutPage[0].section1.subheadline" class="subheadline">{{ aboutPage[0].section1.subheadline }}</p>
          </div>
        </div>
      </section> -->
      <section v-if="aboutPage[0].capabilities" class="capabilities full-row">
        <div class="image-wrapper" v-if="aboutPage[0].capabilities.image">
            <SanityImage
                :asset-id="aboutPage[0].capabilities.image.asset._ref"
                auto="format"
                :alt="aboutPage[0].capabilities.image.alt"
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
            <SanityImage
                :asset-id="aboutPage[0].section2.video.poster.asset._ref"
                auto="format"
              /> 
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
                :alt="aboutPage[0].section2.image.alt"
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
                :alt="aboutPage[0].section3.image.alt"

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
                :alt="aboutPage[0].section4.image1.alt"
              />  
           </div>
           <div v-if="aboutPage[0].section4.image2">
            <SanityImage
                :asset-id="aboutPage[0].section4.image2.asset._ref"
                auto="format"
                :alt="aboutPage[0].section4.image2.alt"
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

      <section class="full-row cta" ref="fixedVid">       
        <div class="bg-video-wrapper">
            <div>
            <SanityFile :asset-id="aboutPage[0].cta.bgvideo.asset._ref">
                <template #default="{ src }">
                <video :src="src" autoplay muted loop></video>
                </template>
            </SanityFile>
            </div>
        </div>         
        <div class="text-wrapper" v-if="aboutPage[0].cta">
          <h2 v-if="aboutPage[0].cta.text">{{ aboutPage[0].cta.text }}</h2>
          <button class="flat underlined"><nuxt-link to="/contact">Get in touch</nuxt-link></button>
        </div>
    </section>

    <!-- <section class="video-scroller-bg" ref="fixedVid">
      <div class="video-wrapper">
        <div>
          <SanityFile :asset-id="aboutPage[0].cta.bgvideo.asset._ref">
            <template #default="{ src }">
              <video :src="src" autoplay muted loop></video>
            </template>
          </SanityFile>
        </div>
      </div>

    </section> -->
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
  data() {
    return {
      title: 'About'
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  mounted() {
    this.setPosterImages();
    this.$nextTick(function() {
      this.setPinAnimation();
      this.setTickerAnimation();
    })
    window.addEventListener('resize', () => {
        this.setPinAnimation();
        this.setTickerAnimation();
    })
  },
  methods: {
    setPosterImages() {
      // get all images
      // get video
      // if video is playing, hide image
      const page = this.$refs.aboutWrapper;
      const wrappers = page.querySelectorAll('.video-wrapper')
      wrappers.forEach(wrapper => {
        // check for image
        const hasImg = wrapper.getElementsByTagName('img').length > 0;
        if (hasImg) {
          const img = wrapper.querySelector('img');
          const src = img.src;
          const vid = wrapper.querySelector('video');
          vid.poster = src;
          img.remove();
        }
      })
    },
    
    setPinAnimation() {
        const fixedTop = this.$refs.fixedTop;
        if (fixedTop) {
          if (window.innerWidth > 768) {
            gsap.to(fixedTop, {
                scrollTrigger: {
                    trigger: fixedTop,
                    start: "top top", 
                    pin: true, 
                    // markers: true,
                    pinSpacing: false 
                }
            })
          } else {
            gsap.to(fixedTop, {
                scrollTrigger: {
                    trigger: fixedTop,
                    start: "bottom bottom", 
                    pin: true, 
                    pinSpacing: false 
                }
            })
          }
            
        }

        const fixedVid = this.$refs.fixedVid;
        const container = this.$refs.container;
        if (fixedVid && container) {
            this.setGridTemplateRowHeights();
            gsap.to(fixedVid, {
                scrollTrigger: {
                    trigger: fixedVid,
                    start: "top bottom",
                    // markers: true, 
                    pin: container, 
                    pinSpacing: false 
                }
            })
        }
    },
    setGridTemplateRowHeights() {
        const rows = document.querySelectorAll('.image-text-row');
        if (rows) {
            rows.forEach(row => {
                let height = 0;
                let extra = 400;
                const heightChildren = row.querySelectorAll('.text-wrapper > *');
                heightChildren.forEach(child => {
                    if (child.offsetHeight > 0) {
                        height = height + child.offsetHeight
                    }
                })
                console.log(height);
                row.style.gridTemplateRows = `${height + extra}px`;
            })
        }
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

