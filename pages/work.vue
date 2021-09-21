<template>
  <div class="container-work container container-no-grid">
    <section class="work-grid grid-fixed" v-if="workPage" ref="scrollerWrapper">
      <div v-for="item in workGrid" :key="item.id" class="work-grid-item">
          <div v-if="item.projectcover" class="image-wrapper">
            <SanityImage
              :asset-id="item.projectcover.asset._ref"
              auto="format"
              :alt="item.projectcover.alt"
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
      const query1 = groq`*[_type == "workPage"]`;
      const query2 = groq`*[_type == "projects"]`;
      const workPage = await $sanity.fetch(query1).then((res) => res);
      const projects = await $sanity.fetch(query2).then((res) => res);

      return { workPage, projects };
  },
  data() {
    return {
      title: 'Work'
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  computed: {
    workGrid() {
      if (!this.workPage || !this.projects) {
        return null
      }
      const gridReferences = this.workPage[0].workGrid;
      const projects = this.projects;
      let workGrid = [];
      gridReferences.forEach( ref => {
        const match = projects.filter(project => project._id === ref._ref);
        workGrid.push(match[0])
      })
      return workGrid;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.onImageLoad();
    })
  },
  methods: {
    registerPlugins() {
      gsap.registerPlugin(ScrollTrigger);
    },
    setTimeline(ref, index) {
      console.log(index);
      this.registerPlugins();
        if (!gsap) {
          console.log('error, no gsap')
          return;
        }
        // console.log('setting timeline on', ref)

        const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref,
              // markers: true,
              start: `top-=${ref.offsetHeight}px bottom`, 
              end: "bottom top",
              scrub: 0.1
            }
          });
        
         tl
          .to(ref, {scale: 0, '-webkit-filter': 'blur(30px)', filter: 'blur(30px)', duration: 1})
          .to(ref, {scale: 0.3, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)',  duration: 2})
          .to(ref, {scale: 1, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)', duration: 6})
          .to(ref, {'-webkit-filter': 'blur(30px)', filter: 'blur(30px)',  duration: 1})
    },
    onImageLoad() {
        const imageWrapper = this.$refs.scrollerWrapper;
        if (imageWrapper) {
          const refs = gsap.utils.toArray(
            imageWrapper.querySelectorAll(".work-grid-item")
          );
          if (refs) {
            refs.forEach((ref, index) => {
              const img = ref.querySelector('img');
              if (img.complete) {
                // console.log('img complete already', img)
                this.setTimeline(ref, index);
              } else {
                console.log('adding listener')
                img.addEventListener('load', () => {
                    // console.log('img loaded success', img)
                    this.setTimeline(ref, index);
                })
                img.addEventListener('error', () => {
                    console.log('error, no image loaded, no animation set')
                })
              }
            });
          }
        }
    }
  }
  
};
</script>

