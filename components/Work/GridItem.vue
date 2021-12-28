<template>
  <div
    class="work-grid-item-container"
    ref="wrapper"
    @mouseenter="mouseEnter"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
  >
    <div class="text-wrapper" :style="`background-color: #${item.bgcolor}E6`">
      <h2 class="project-title" ref="title">{{ item.projectname }}</h2>
    </div>
    <figure v-if="item.thumbnail" class="image-wrapper">
      <img
        :src="
          $urlFor(item.thumbnail.url)
            .forceDownload(item.thumbnail.originalFilename)
            .size(800)
        "
        :alt="item.thumbnail.alt"
      />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    mouseEnter(event) {
      // console.log("mouseenter");
      const title = this.$refs.title;
      title.style.position = "fixed";
      title.style.whitespace = "nowrap";
    },
    mouseLeave(event) {
      // console.log("mouseleave");
      const title = this.$refs.title;
      title.style.position = "static";
      title.style.top = "unset";
      title.style.left = "unset";
      title.style.whitespace = "normal";
    },
    mouseMove(event) {
      //   console.log(event.clientX, event.clientY);
      this.setTitlePosition(event.clientX, event.clientY);
    },
    setTitlePosition(x, y) {
      const title = this.$refs.title;
      const wrapper = this.$refs.wrapper;
      const titleW = title.offsetWidth;
      const wrapperL = wrapper.getBoundingClientRect().left;
      const wrapperT = wrapper.getBoundingClientRect().top;
      const mouseX = x;
      const mouseY = y;

      const targetX = mouseX - wrapperL - titleW / 2;
      const targetY = mouseY - wrapperT;

      //   console.log(wrapperL, wrapperT, mouseX, mouseY);
      //   need to offset from container top / left
      title.style.left = `${targetX}px`;
      title.style.top = `${targetY}px`;
    },
  },
};
</script>

<style lang="scss">
.work-grid-item-container {
  // display: flex;
  @include stackedDivs;
  .text-wrapper {
    width: 100%;
    height: 100%;
    z-index: 3;
    opacity: 0;
    transition: 0.5s ease opacity;
    background: rgba($light, 0.9);
    @include flexCenter;
    padding: $spacer;
    h2 {
      @include fontDmSans;
      font-size: 36px;
      line-height: 40px;
      z-index: 30;
    }
  }
  .image-wrapper {
    z-index: 2;
    display: flex;
    overflow: hidden;
  }

  &:hover {
    .text-wrapper {
      opacity: 1;
    }
  }
}
</style>