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


             gsap.set(ref, {
                filter: "blur(30px)",
                scale: 0.5
              });


              gsap.to(ref, {
                scale: 0.5,
                filter: "blur(0px)",
                scrollTrigger: {
                  trigger: ref,
                  start: "top+=50px bottom",
                  // markers: true,
                  end: "top top+=80%",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });

             gsap.to(ref, {
                scale: 1,
                scrollTrigger: {
                  trigger: ref,
                  start: "top top+=80%",
                  // markers: true,
                  end: "top center",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });

              gsap.to(ref, {
                opacity: 0,
                scrollTrigger: {
                  trigger: ref,
                  start: "top top+=50px",
                  // markers: true,
                  end: "top top-=100",
                  scrub: true,
                  toggleActions: "play pause resume reset",
                },
              });
            })
          }

        }
    }
  }
  
};
</script>

