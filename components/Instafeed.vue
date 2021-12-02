<template>
  <div class="instagram-container" ref="wrapper">
    <div class="feed" v-if="insta" ref="feed">
      <div v-for="item in insta" :key="item.id" class="ig-item">
        <div
          class="media-wrapper"
          v-if="
            item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
          "
        >
          <img :src="item.media_url" :alt="item.caption" />
        </div>
        <div class="media-wrapper vid" v-if="item.media_type === 'VIDEO'">
          <video :src="item.media_url" :autoplay="false" :muted="true"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["insta", "count"],
  mounted() {
    this.$nextTick(function () {
      this.setAnimation();
    });
    window.addEventListener("resize", () => {
      this.setAnimation();
    });
  },
  methods: {
    setAnimation() {
      const feed = this.$refs.feed;
      const wrapper = this.$refs.wrapper;
      const count = this.count;
      let duration = 10;
      const repeat = -1;
      // const repeat = null;
      if (!gsap || !feed || !wrapper) {
        return;
      }

      // set widths
      const igItemFirst = feed.querySelector(".ig-item");
      const igItemW = igItemFirst.offsetWidth;
      const igItemMargin = parseFloat(
        window.getComputedStyle(igItemFirst).marginRight
      );
      const feedW = igItemW * count + igItemMargin * count;
      feed.style.width = `${feedW}px`;

      for (let i = 0; i < 2; i++) {
        var newFeed = feed.cloneNode(true);
        wrapper.appendChild(newFeed);
        newFeed.classList.add(`feed-clone`);
        newFeed.classList.add(`feed-clone-${i + 1}`);
      }
      feed.remove();
      const clone1 = wrapper.querySelector(".feed-clone-1");
      const clone2 = wrapper.querySelector(".feed-clone-2");

      wrapper.style.width = `${feedW * wrapper.childElementCount}px`;

      duration = 65;
      let xOffset;
      let delay;
      if (window.innerWidth > 768) {
        xOffset = "-600vw";
        delay = (duration * 1) / 2;
      } else {
        xOffset = "-600vw";
        delay = (duration * 5) / 6;
      }
      if (clone1) {
        gsap.to(clone1, {
          x: xOffset,
          duration: duration,
          repeat: repeat,
          ease: "linear",
        });
      }
      if (clone2) {
        gsap.to(clone2, {
          x: xOffset,
          duration: duration,
          delay: delay,
          repeat: repeat,
          ease: "linear",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.instagram-wrapper {
  margin-top: 200px;
  overflow: hidden;
  width: 100%;
}

.instagram-container {
  // display: flex;
  position: relative;
  .feed {
    display: flex;
    //  height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(20vw - 24px);
    max-height: calc(20vw - 24px);
    @media (max-width: 960px) {
      height: calc(33.33vw - 6px);
      max-height: calc(33.33vw - 6px);
    }
    //  float: left;
    > .ig-item {
      flex: 0 0 calc(20vw - 24px);
      margin-right: 24px;
      @media (max-width: 960px) {
        flex: 0 0 calc(33.33vw - 6px);
        margin-right: 6px;
      }
    }
    &.feed-clone {
      position: absolute;
      top: 0;
      left: 100vw;
      background: #fff;
      overflow: hidden;
    }
    .ig-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      img,
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>