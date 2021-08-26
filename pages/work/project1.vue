<template>
  <div class="container">
    <section class="work-item fixed-from-bottom">
      <div
        class="text-wrapper"
        ref="textWrapper"
        :style="` margin-top: ${
          $store.state.helpful.windowHeight - textHeight
        }px`"
      >
        <h1>Project title</h1>
        <h2>Category</h2>
        <p>
          Otherlove is a woman-owned, full-service design studio specializing in
          visual identities, content creation, and experiences for conscious
          brands.
        </p>
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
      });
    },
  },
  methods: {
    setFixedLayout() {
      if (!this.$refs.textWrapper) {
        return;
      }
      this.textHeight = this.$refs.textWrapper.offsetHeight + this.textBuffer;
    },
    setBodyBg() {
      this.$store.commit("helpful/setBodyBg", this.bgColor);
    },
  },
};
</script>