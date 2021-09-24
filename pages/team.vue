<template>
  <div>
    <div  class="container page-team" v-if="team">
      <div v-for="item in team" :key="item._id" class="person" :class="item.announcement ? 'has-announcement' : '' ">
        <div class="image-wrapper" v-if="item.profile.url">
          <img
            :src="`${$urlFor(item.profile.url).forceDownload(item.profile.originalFilename).size(800)}`"
            :alt="item.profile.alt"
            width="800"
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
    const thisPage = 'teamPage';
    const queryPage = groq`*[_type == "${thisPage}"]{teamList}`
    const query = groq`*[_type == "employee"]{
      _id,
      name,
      pronouns,
      title,
      bio,
      announcement,
      "profile": {
        "url": profile.asset->url,
        "originalFilename": profile.asset->originalFilename,
        "alt": profile.alt
      }
    }`;
    const people = await $sanity.fetch(query).then((res) => res);

    const teamListReferences = await $sanity.fetch(queryPage).then((res) => res[0].teamList);

    const metadataQuery = groq`*[_type == "${thisPage}"]{
        "pageMetadata": {
          "pageTitle": pageMetadata.pageTitle,
          "pageDesc": pageMetadata.pageDesc,
          "ogImage": {
            "url": pageMetadata.ogImage.asset->url
          }
        }
    }`;
    const pageMetadata = await $sanity.fetch(metadataQuery).then((res) => res[0].pageMetadata);
    return { people, teamListReferences, pageMetadata };
  },
  data() {
    return {
      name: "Team"
    }
  },
  head() {
    return {
      title: this.pageMetadata ? (this.pageMetadata.pageTitle ? this.pageMetadata.pageTitle : this.name): this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata ? (this.pageMetadata.pageDesc ? this.pageMetadata.pageDesc : ""): "",
        },
        { 
          hid: 'og:image', 
          property: 'og:image', 
          content: this.pageMetadata ? (this.pageMetadata.ogImage ? `${this.$urlFor(this.pageMetadata.ogImage.url).forceDownload().size(800).url()}` : ""): "",
        },
      ],
    };
  },
  computed: {
    team() {
      if (!this.teamListReferences || !this.people) {
        return null
      }
      const gridReferences = this.teamListReferences;
      const people = this.people;
      let teamList = [];
      gridReferences.forEach( ref => {
        const match = people.filter(person => person._id == ref._ref);
        teamList.push(match[0])
      })
      return teamList;
    }
  }
};
</script>


