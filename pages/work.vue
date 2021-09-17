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
          <div v-if="!item.projectcover" class="image-wrapper">
            <img src="/placeholder.png" alt="" />
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
      this.setAnimations();
    })
  },
  methods: {
    setAnimations() {
        if (!gsap) {
          return;
        }
        const imageWrapper = this.$refs.scrollerWrapper;
        if (imageWrapper) {
          const refs = gsap.utils.toArray(imageWrapper.querySelectorAll(".work-grid-item img"));
          if (refs) {
            refs.forEach( ref => {

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: ref,
                  // markers: true,
                  start: "top bottom", 
                  end: "bottom top",
                  scrub: true
                }
              });

              tl
                .from(ref, {scale: 0.3, filter: 'blur(30px)', duration: 1})
                .to(ref, {filter: 'blur(0px)', duration: 1})
                .to(ref, {scale: 1, duration: 5})
                .to(ref, {filter: 'blur(30px)', duration: 1})
                  

            })
          }

        }
    }
  }
  
};
</script>

