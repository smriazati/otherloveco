<template>
  <div>
    <div  class="container page-team" v-if="people">
      <div v-for="item in people" :key="item._id" class="person" :class="item.announcement ? 'has-announcement' : '' ">
        <div class="image-wrapper" v-if="item.profile">
         <SanityImage
            :asset-id="item.profile.asset._ref"
            auto="format"
          />
        </div>
        <div class="text-wrapper bio">
          <h2 v-if="item.name">
            <span class="name"> {{ item.name }}</span>
            <span v-if="item.pronouns" class="pronouns"> {{item.pronouns }}</span>
          </h2>
          <h3 v-if="item.title">{{ item.title }}</h3>
          <div v-if="item.bio" class="bio">
            <SanityContent :blocks="item.bio" />
          </div>
        </div>
        <div class="text-wrapper announcement" v-if="item.announcement">
          <p>{{ item.announcement }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
export default {
  async asyncData({ $sanity }) {
    const query = groq`*[_type == "employee"]`;
    const people = await $sanity.fetch(query).then((res) => res);
    people.sort((a, b) => (a.order > b.order) ? 1 : -1)
    return { people };
  },
};
</script>


