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

    <section class="logo-scroller grid-fixed" v-if="homePage[0].logos">
      <div ref="scrollerWrapper" class="scroller-wrapper">
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
  data() {
    return {
      isMounted: false,
      textHeight: 0,
      textBuffer: 80,
      imageBuffer: 1.3,
      capListHoverImage: "/placeholder.png",
    };
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(function() {
      this.setAnimations();
    })
  },

  watch: {
    isMounted() {
      if (!this.isMounted) {
        return false;
      }
      this.$nextTick(function () {
        // this.setFixedLayout();
        // this.setAnimations();
        // this.setCapabilityList();
      });
    },
  },
  methods: {
    // setCapabilityList() {
    //   const capListContainer = this.$refs.capabilityList;
    //   if (!capListContainer) {
    //     return;
    //   }
    //   const capList = capListContainer.querySelector("ul");
    //   if (!capList) {
    //     return;
    //   }
    //   const capListItems = capList.querySelectorAll("li");
    //   if (!capListItems) {
    //     return;
    //   }
    //   capListItems.forEach((item) => {
    //     item.addEventListener("mouseenter", this.capListHover);
    //     item.addEventListener("mouseleave", this.capListUnhover);
    //   });
    // },
    // capListHover(e) {
    //   if (!e.target) {
    //     return;
    //   }
    //   debounce(this.capListShowImage(e.target, e.target.dataset.order), 500);
    // },
    // capListUnhover(e) {
    //   if (!e.target) {
    //     return;
    //   }
    //   debounce(this.capListHideImage(e.target, e.target.dataset.order), 500);
    // },
    // capListShowImage(target, index) {
    //   target.style.zIndex = "110";
    //   this.capListHoverImage = "/placeholder.png";
    //   const img = this.$refs.highlightImage;
    //   img.style.opacity = "1";
    //   img.style.height = "100%";

    //   if (parseInt(index) % 2 == 0) {
    //     img.style.paddingLeft = "40%";
    //   } else {
    //     img.style.paddingRight = "40%";
    //   }
    // },
    // capListHideImage(target, index) {
    //   target.style.zIndex = "101";
    //   this.capListHoverImage = null;
    //   const img = this.$refs.highlightImage;
    //   img.style.opacity = "0";
    //   img.style.padding = "0";
    //   img.style.height = "0";
    // },
    setFixedLayout() {
      if (!this.$refs.textWrapper) {
        return;
      }
      this.textHeight = this.$refs.textWrapper.offsetHeight + this.textBuffer;
    },
    setBodyBg() {
      this.$store.commit("helpful/setBodyBg", this.bgColor);
    },
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
setAnimations() {
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
            gsap.set(ref, {
              filter: "blur(30px)",
              scale: 0.5
            });
            gsap.to(ref, {
              filter: "blur(0px)",
              scale: 1,
              scrollTrigger: {
                trigger: ref,
                start: "top+=50px bottom",
                // markers: true,
                end: "+=250",
                scrub: true,
                // onLeave: (self) => { console.log(self); self.trigger.classList.add('on-exit') } ,
                toggleActions: "play pause resume reset",
              },
            });

            gsap.to(ref, {
              opacity: 0,
              filter: "blur(30px)",
              scrollTrigger: {
                trigger: ref,
                start: "top top+=50px",
                // markers: true,
                end: "+=100",
                scrub: true,
                // onLeave: (self) => { console.log(self); self.trigger.classList.add('on-exit') } ,
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