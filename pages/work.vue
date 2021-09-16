<template>
  <div class="container-work container container-no-grid">
    <section class="work-grid grid-fixed" v-if="projects">
      <div v-for="item in projects" :key="item.id" class="work-grid-item">
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
    const query = groq`*[_type == "projects"]`;
    const projects = await $sanity.fetch(query).then((res) => res);
    return { projects };
  },
  layout: "darkBg"
};
</script>

