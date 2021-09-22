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
      const count = 15;
      let duration = 10;
      const repeat = -1;
      // const repeat = null;
      if (!gsap || !feed || !wrapper) {
        return
      }
      
      // set widths
      const igItemW = feed.querySelector('.ig-item').offsetWidth;
      const feedW = igItemW * count;
      feed.style.width = `${feedW}px`

      for (let i = 0; i < 2; i++) {
        var newFeed = feed.cloneNode(true);
        wrapper.appendChild(newFeed);
        newFeed.classList.add(`feed-clone-${i + 1}`);
      }
      const clone1 = wrapper.querySelector('.feed-clone-1');
      const clone2 = wrapper.querySelector('.feed-clone-2');
      const feedMargin = 5;

      // wrapper.style.width = `${feedW * wrapper.childElementCount}px`;
      duration = (feedW / window.innerWidth) * count;

// duration = 3;

      gsap.to(feed, {
        x: feedW * -1,
        duration: duration,
        ease: 'linear',
      })

      if (clone1) {
        gsap.to(clone1, {
          x: '-400vw',
          duration: duration + (duration * 1 / 3),
          delay: duration * 2/3,
          repeat: repeat,
          ease: 'linear'
        })
      }
      if (clone2) {
        gsap.to(clone2, {
          x: '-400vw',
          duration: duration + (duration * 1 / 3),
          delay: duration * 2/3 + duration,
          repeat: repeat,
          ease: 'linear'
        })
      }
    },
  }
}
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
   height: 20vw;
   max-height: 20vw;
   float: left;
   > * {
     flex: 0 0 20vw;
   }
   &:not(:first-child) {
     position: absolute;
     top: 0;
     left: 100vw;
   }
   .ig-item {
     overflow: hidden;
     display: flex;
     align-items: center;
     width: 100%;
     height: 100%;
     img, video {
      width: 100%;
      height: 100%;
      object-fit: cover;
     }
   }
 } 
}
</style>