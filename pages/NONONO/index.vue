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

    <section ref="capabilityList" class="capability-list">
      <div ref="highlightImage" class="highlight-image">
        <img :src="capListHoverImage" alt="" />
      </div>
      <ul>
        <li data-order="1">Brand Strategy</li>
        <li data-order="2">Naming</li>
        <li data-order="3">Brand Identity</li>
        <li data-order="4">Brand Strategy</li>
        <li data-order="1">Naming</li>
        <li data-order="2">Brand Identity</li>
        <li data-order="3">Brand Strategy</li>
        <li data-order="4">Naming</li>
        <li data-order="1">Brand Identity</li>
        <li data-order="2">Brand Strategy</li>
        <li data-order="3">Naming</li>
        <li data-order="4">Brand Identity</li>
      </ul>
    </section>
  </div>
</template>


<script>
import { debounce } from "~/helpers.js";

export default {
  data() {
    return {
      bgColor: "#fff",
      isMounted: false,
      textHeight: 0,
      textBuffer: 80,
      imageBuffer: 1.3,
      capListHoverImage: "/placeholder.png",
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
        this.setCapabilityList();
      });
    },
  },
  methods: {
    setCapabilityList() {
      const capListContainer = this.$refs.capabilityList;
      if (!capListContainer) {
        return;
      }
      const capList = capListContainer.querySelector("ul");
      if (!capList) {
        return;
      }
      const capListItems = capList.querySelectorAll("li");
      if (!capListItems) {
        return;
      }
      capListItems.forEach((item) => {
        item.addEventListener("mouseenter", this.capListHover);
        item.addEventListener("mouseleave", this.capListUnhover);
      });
    },
    capListHover(e) {
      if (!e.target) {
        return;
      }
      debounce(this.capListShowImage(e.target, e.target.dataset.order), 500);
    },
    capListUnhover(e) {
      if (!e.target) {
        return;
      }
      debounce(this.capListHideImage(e.target, e.target.dataset.order), 500);
    },
    capListShowImage(target, index) {
      target.style.zIndex = "110";
      this.capListHoverImage = "/placeholder.png";
      const img = this.$refs.highlightImage;
      img.style.opacity = "1";
      img.style.height = "100%";

      if (parseInt(index) % 2 == 0) {
        img.style.paddingLeft = "40%";
      } else {
        img.style.paddingRight = "40%";
      }
    },
    capListHideImage(target, index) {
      target.style.zIndex = "101";
      this.capListHoverImage = null;
      const img = this.$refs.highlightImage;
      img.style.opacity = "0";
      img.style.padding = "0";
      img.style.height = "0";
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