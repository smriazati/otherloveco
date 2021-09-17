<template>
  <div class="container-work container container-no-grid">
    <section class="work-grid grid-fixed" v-if="workPage">
      <div v-for="item in workGrid" :key="item.id" class="work-grid-item">
        <!-- <nuxt-link :to="`/work/${item.slug.current}`"> -->
          <div v-if="item.projectcover" class="image-wrapper">
            <SanityImage
              :asset-id="item.projectcover.asset._ref"
              auto="format"
            />
          </div>
          <div v-if="!item.projectcover" class="image-wrapper">
            <img src="/placeholder.png" alt="" />
          </div>
          <!-- <div class="text-wrapper">
            <div v-if="item.projectname" class="project-title">
              <h2>{{ item.projectname }}</h2>
            </div>
          </div> -->
        <!-- </nuxt-link> -->
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
  }
  
};
</script>

