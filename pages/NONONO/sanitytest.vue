<template>
  <div>
    <section>
      <div v-if="work">
        <div v-for="item in work" :key="item.id">
          {{ item.projectname }}
          <SanityImage :asset-id="item.projectcover.asset._ref" auto="format" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { groq } from "@nuxtjs/sanity";
export default {
  async asyncData({ $sanity }) {
    const query = groq`*[_type == "projects"]`;
    const work = await $sanity.fetch(query);
    return { work };
  },
};
</script>