<template>
  <div>
    <div class="container page-team" v-if="team">
      <div
        v-for="item in team"
        :key="item._id"
        class="person"
        :class="item.announcement ? 'has-announcement' : ''"
      >
        <div class="image-wrapper" v-if="item.profile.url">
          <img
            :src="`${$urlFor(item.profile.url)
              .forceDownload(item.profile.originalFilename)
              .size(800)}`"
            :alt="item.profile.alt"
            width="800"
          />
        </div>
        <div class="text-wrapper bio">
          <h2 v-if="item.name">
            <span class="name"> {{ item.name }}</span>
            <span v-if="item.pronouns" class="pronouns">
              {{ item.pronouns }}</span
            >
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
    const thisPage = "teamPage";
    const queryPage = groq`*[_type == "${thisPage}"]{teamList}`;
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

    const teamListReferences = await $sanity
      .fetch(queryPage)
      .then((res) => res[0].teamList);

    const metadataQuery = groq`*[_type == "${thisPage}"]{
        "pageMetadata": {
          "pageTitle": pageMetadata.pageTitle,
          "pageDesc": pageMetadata.pageDesc,
          "ogImage": {
            "url": pageMetadata.ogImage.asset->url
          }
        }
    }`;
    const pageMetadata = await $sanity
      .fetch(metadataQuery)
      .then((res) => res[0].pageMetadata);
    return { people, teamListReferences, pageMetadata };
  },
  data() {
    return {
      name: "Team",
    };
  },
  head() {
    return {
      title: this.pageMetadata
        ? this.pageMetadata.pageTitle
          ? this.pageMetadata.pageTitle
          : this.$store.state.siteSettings.siteTitle
          ? this.$store.state.siteSettings.siteTitle
          : ""
        : this.$store.state.siteSettings.siteTitle
        ? this.$store.state.siteSettings.siteTitle
        : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata
            ? this.pageMetadata.pageDesc
              ? this.pageMetadata.pageDesc
              : this.$store.state.siteSettings.siteDescription
              ? this.$store.state.siteSettings.siteDescription
              : ""
            : this.$store.state.siteSettings.siteDescription
            ? this.$store.state.siteSettings.siteDescription
            : "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.pageMetadata
            ? this.pageMetadata.ogImage.url
              ? this.pageMetadata.ogImage.url
              : this.$store.state.siteSettings.openGraphImage
              ? this.$store.state.siteSettings.openGraphImage.url
              : ""
            : this.$store.state.siteSettings.openGraphImage
            ? this.$store.state.siteSettings.openGraphImage.url
            : "",
        },
      ],
    };
  },
  computed: {
    team() {
      if (!this.teamListReferences || !this.people) {
        return null;
      }
      const gridReferences = this.teamListReferences;
      const people = this.people;
      let teamList = [];
      gridReferences.forEach((ref) => {
        const match = people.filter((person) => person._id == ref._ref);
        teamList.push(match[0]);
      });
      return teamList;
    },
  },
};
</script>


<style lang="scss">
.page-team {
  @media (max-width: $mobile-bp) {
    display: flex !important;
    flex-direction: column;
  }

  > * {
    grid-column: 1 / span 11;

    &:not(:last-child) {
      margin-bottom: 150px;

      @media (max-width: $mobile-bp) {
        margin-bottom: 50px;
      }
    }
  }

  .person {
    @include gridFixedNested();

    .image-wrapper {
      grid-column: 2 / span 4;
      padding-right: 25%;

      @media (max-width: $mobile-bp) {
        grid-column: span 8 / 13;
        padding-left: 30px;
        padding-right: 0;
        margin-bottom: 30px;
      }

      img {
        filter: blur(0px);
        transition: 0.5s ease all;
      }

      &:hover {
        img {
          filter: blur(20px);
        }
      }
    }

    .text-wrapper {
      grid-column: span 6;

      @media (max-width: $mobile-bp) {
        grid-column: 1 / span 12;
      }

      &.bio {
        padding-right: 5%;
      }

      &.announcement {
        grid-column: 9 / span 4;

        @media (max-width: $mobile-bp) {
          grid-column: 9 / span 2;
        }
      }
    }

    &.has-announcement .bio.text-wrapper {
      grid-column: 2 / span 6;
      padding-right: 0;

      @media (max-width: $mobile-bp) {
        grid-column: 1 / span 7;
      }

      p {
        max-width: unset;
      }
    }

    h2 {
      display: flex;
      align-items: center;
      font-family: "Reckless", serif;
      font-size: 22px;
      line-height: 22px;

      .pronouns {
        font-family: "DM Sans", sans-serif;
        font-size: 10px;
        line-height: 20px;
        margin-left: 5px;
      }
    }

    h3 {
      font-size: 14px;
      line-height: 20px;
      text-transform: uppercase;
    }

    p {
      font-size: 14px;
      line-height: 20px;

      & + p {
        margin-top: 20px;
      }
    }

    .announcement p {
      font-style: italic;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>