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
              />
        </div>
                
      </div>
     
    </section>
</div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ $sanity }) {
      const query = groq`*[_type == "homePage"]`;
      const homePage = await $sanity.fetch(query).then((res) => res);
      return { homePage };
    },
  layout: "home",
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: 'Home',
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.setAnimations();
    })
  },

  methods: {
    setBodyBg() {
      this.$store.commit("helpful/setBodyBg", this.bgColor);
    },
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    setAnimations() {
      this.registerPlugins();
        if (!gsap) {
          return;
        }
        const imageWrapper = this.$refs.scrollerWrapper;
        if (imageWrapper) {
          const refs = gsap.utils.toArray(
            imageWrapper.querySelectorAll(".logo")
          );
          if (refs) {
            refs.forEach((ref) => {
 
//               const tl = gsap.timeline({
//                 // yes, we can add it to an entire timeline!
//                 scrollTrigger: {
//                   trigger: ref,
//                   markers: true,
//                   start: "top bottom", // when the top of the trigger hits the top of the viewport
//                   end: window.innerHeight, // end after scrolling 500px beyond the start
//                   scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//                   // snap: {
//                   //   snapTo: "labels", // snap to the closest label in the timeline
//                   //   duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
//                   //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
//                   //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
//                   // }
//                 }
//               });

// // add animations and labels to the timeline

// tl
//   .from(ref, {scale: 0.3, filter: 'blur(30px)', autoAlpha: 1, duration: 1})
//   .to(ref, {filter: 'blur(0px)', duration: 1})
//   .to(ref, {scale: 1, duration: 5})
//   .to(ref, { autoAlpha: 0, duration: 0.2})
             
             gsap.set(ref, {
                filter: "blur(30px)",
                scale: 0.5
              });


              gsap.to(ref, {
                scale: 0.5,
                filter: "blur(0px)",
                scrollTrigger: {
                  trigger: ref,
                  start: "top+=50px bottom",
                  // markers: true,
                  end: "top top+=80%",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });

             gsap.to(ref, {
                scale: 1,
                scrollTrigger: {
                  trigger: ref,
                  start: "top top+=80%",
                  // markers: true,
                  end: "top center",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });

              gsap.to(ref, {
                opacity: 0,
                scrollTrigger: {
                  trigger: ref,
                  start: "top top+=50px",
                  // markers: true,
                  end: "top top-=100",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });
            });
          }
        }
    }
  },
};
</script>