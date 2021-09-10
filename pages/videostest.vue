<template>
  <div class="container">
    <div class="intro"></div>
    <div class="video-scroller" v-if="project">
      <div class="video-scroller-bg">
        <div ref="vidWrapper" class="video-wrapper">
          <div>
            <SanityFile :asset-id="project.bgvideo.asset._ref">
              <template #default="{ src }">
                <video :src="src" loop></video>
              </template>
            </SanityFile>
          </div>
        </div>
      </div>

      <section ref="imageWrapper" class="video-scroller-content">
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ redirect, $sanity }) {
    const query = groq`*[_type == "projects"]`;
    const projects = await $sanity.fetch(query).then((res) => res);

    const filteredProject = projects[0];
    if (filteredProject) {
      return {
        project: filteredProject,
      };
    } else {
      redirect("/work");
    }
  },
  data() {
    return {
      textHeight: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.setAnimations();

      const vidWrapper = this.$refs.vidWrapper;
      const vid = vidWrapper.querySelector("video");
      vid.play();
    });
  },
  methods: {
    setAnimations() {
      if (!gsap) {
        return;
      }
      const imageWrapper = this.$refs.imageWrapper;
      if (imageWrapper) {
        const refs = gsap.utils.toArray(
          imageWrapper.querySelectorAll(".project-cover")
        );
        if (refs) {
          refs.forEach((ref) => {
            gsap.set(ref, {
              filter: "blur(30px)",
            });
            gsap.to(ref, {
              filter: "blur(0px)",
              scrollTrigger: {
                trigger: ref,
                start: "top+=50px bottom",
                end: "+=250",
                scrub: true,
                toggleActions: "play pause resume reset",
              },
            });
          });
        }
      }
    },
    setFixedLayout() {
      if (!this.$refs.textWrapper) {
        return;
      }
      this.textHeight = this.$refs.textWrapper.offsetHeight + this.textBuffer;
    },
  },
};
</script>


<style lang="scss">
.container {
  position: relative;
  display: flex;
}
.intro {
  position: relative;
  z-index: 100;
  height: 90vh;
  background: white;
}
.video-scroller {
  position: relative;
  .video-scroller-bg {
    width: 100vw;
    position: static;
    pointer-events: none;
    .video-wrapper {
      visibility: visible;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      left: 0;
      pointer-events: none;
      div {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }
    }
  }
  .video-scroller-content {
    position: relative;
    padding-top: 50vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.video-scroller-content .project-cover {
  max-height: 600px;
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  overflow: hidden;
  img {
    min-height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>