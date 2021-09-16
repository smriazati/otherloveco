<template>
<div class="instagram-container" ref="wrapper">
<div class="feed" v-if="insta" ref="feed">
      <div v-for="item in insta" :key="item.id">
        <div
        class="media-wrapper"
          v-if="
            item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
          "
        >
          <img :src="item.media_url" :alt="item.caption" />
        </div>
        <div class="media-wrapper" v-if="item.media_type === 'VIDEO'">
          <video :src="item.media_url" autoplay="true" muted></video>
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
export default {
  props: ['insta'],
  mounted() {
    this.$nextTick(function () {
      this.setAnimation();
    });
  },
  methods: {
    setAnimation() {
      const feed = this.$refs.feed;
      const wrapper = this.$refs.wrapper;

      if (!gsap || !feed || !wrapper) {
        return
      }
       // add clones
      for (let i = 0; i < 2; i++) {
        var newFeed = feed.cloneNode(true);
        wrapper.appendChild(newFeed);
      }
      gsap.to(feed, {
        x: '-300vw',
        duration: 3,
        // repeat: -1,
        ease: 'linear'
      })
    }
  }
}
</script>
