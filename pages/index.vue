<template>
  <div class="container">
    <section class="fixed-from-bottom">
      <div
        class="text-wrapper"
        ref="textWrapper"
        :style="` margin-top: ${
          $store.state.helpful.windowHeight - textHeight
        }px`"
      >
        <h2 class="p">
          Otherlove is a woman-owned, full-service design studio specializing in
          visual identities, content creation, and experiences for conscious
          brands.
        </h2>
      </div>

      <div
        class="image-wrapper images-padded-from-bottom"
        :style="` margin-top: ${
          $store.state.helpful.windowHeight / imageBuffer
        }px`"
      >
        <div class="image-item">
          <img src="/placeholder.png" alt="" />
        </div>
        <div class="image-item">
          <img src="/placeholder.png" alt="" />
        </div>
        <div class="image-item">
          <img src="/placeholder.png" alt="" />
        </div>
      </div>
    </section>

    <section class="capability-list">
      <div ref="highlightImage" class="highlight-image">
        <img src="/placeholder.png" alt="" />
        <span v-if="capListHoverImage">
          <img :src="capListHoverImage" alt="" />
        </span>
      </div>
      <ul>
        <li @mouseenter="capListHover" @mouseleave="capListUnhover">
          Brand Strategy
        </li>
        <li @mouseenter="capListHover" @mouseleave="capListUnhover">Naming</li>
        <li @mouseenter="capListHover" @mouseleave="capListUnhover">
          Brand Identity
        </li>
      </ul>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      bgColor: "#fff",
      isMounted: false,
      textHeight: 0,
      textBuffer: 80,
      imageBuffer: 1.3,
      capListHoverImage: null,
      isCapListHoverActive: false,
    };
  },
  mounted() {
    this.isMounted = true;
    this.setBodyBg();
  },

  watch: {
    isMounted() {
      if (!this.isMounted) {
        return false;
      }
      this.$nextTick(function () {
        this.setFixedLayout();
        this.setAnimations();
      });
    },
  },
  methods: {
    capListHover(e) {
      // if (!this.isCapListHoverActive) {
      //   console.log("mouse enter");
      //   this.isCapListHoverActive = true;
      //   const theTarget = e.target;
      //   // console.log(theTarget);
      //   theTarget.style.zIndex = "110";
      //   this.capListHoverImage = "/placeholder.png";
      //   this.$refs.highlightImage.style.display = "flex";
      // }
    },
    capListUnhover(e) {
      // if (this.isCapListHoverActive) {
      //   console.log("mouse leave");
      //   this.isCapListHoverActive = false;
      //   const theTarget = e.target;
      //   theTarget.style.zIndex = "101";
      //   this.capListHoverImage = null;
      //   this.$refs.highlightImage.style.display = "none";
      //   this.$refs.highlightImage.style.padding = 0;
      // }
    },
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
      this.registerPlugins();
      if (!gsap || !ScrollTrigger) {
        console.log("cancelling animation, no library");
      }
    },
  },
};
</script>