<template>
  <div class="container-work container container-no-grid">
    <section class="work-grid grid-fixed" v-if="workGrid" ref="scrollerWrapper">
      <div v-for="item in workGrid" :key="item._id" class="work-grid-item">
        <div v-if="item.thumbnail">
          <span class="visually-hidden">{{ item.projectname }}</span>
          <img
            :src="
              $urlFor(item.thumbnail.url)
                .forceDownload(item.thumbnail.originalFilename)
                .size(800)
            "
            :alt="item.thumbnail.alt"
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
    const thisPage = "workPage";

    const query1 = groq`*[_type == "${thisPage}"]`;
    const query2 = groq`*[_type == "projects"]{  _id, projectname, "thumbnail": {
        "url": projectcover.asset->url,
        "originalFilename": projectcover.asset->originalFilename,
        "alt": projectcover.alt
      }}`;

    const workGridReferences = await $sanity
      .fetch(query1)
      .then((res) => res[0].workGrid);
    const projects = await $sanity.fetch(query2).then((res) => res);

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

    return { workGridReferences, projects, pageMetadata };
  },

  data() {
    return {
      name: "Work",
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
    workGrid() {
      if (!this.workGridReferences || !this.projects) {
        return null;
      }
      const gridReferences = this.workGridReferences;
      const projects = this.projects;
      let workGrid = [];
      gridReferences.forEach((ref) => {
        const match = projects.filter((project) => project._id == ref._ref);
        workGrid.push(match[0]);
      });
      return workGrid;
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.onImageLoad();
    });
  },
  methods: {
    setTimeline(ref, index) {
      const gsap = this.$gsap;

      if (!gsap) {
        console.log("error, no gsap");
        return;
      }
      // console.log('setting timeline on', ref)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref,
          // markers: true,
          start: `top-=${ref.offsetHeight}px bottom`,
          end: "bottom top",
          scrub: 0.1,
        },
      });

      //  tl
      //   .to(ref, {scale: 0, '-webkit-filter': 'blur(30px)', filter: 'blur(30px)', duration: 1})
      //   .to(ref, {scale: 0.3, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)',  duration: 2})
      //   .to(ref, {scale: 1, '-webkit-filter': 'blur(0px)', filter: 'blur(0px)', duration: 6})
      //   .to(ref, {'-webkit-filter': 'blur(30px)', filter: 'blur(30px)',  duration: 1})
      tl.to(ref, {
        scale: 0,
        // "-webkit-filter": "blur(30px)",
        // filter: "blur(30px)",
        duration: 1,
      })
        .to(ref, {
          scale: 0.3,
          // "-webkit-filter": "blur(0px)",
          // filter: "blur(0px)",
          duration: 2,
        })
        .to(ref, {
          scale: 1,
          // "-webkit-filter": "blur(0px)",
          // filter: "blur(0px)",
          duration: 6,
        })
        .to(ref, {
          // "-webkit-filter": "blur(30px)",
          // filter: "blur(30px)",
          duration: 1,
        });
    },
    onImageLoad() {
      const imageWrapper = this.$refs.scrollerWrapper;
      const gsap = this.$gsap;
      if (imageWrapper) {
        const refs = gsap.utils.toArray(
          imageWrapper.querySelectorAll(".work-grid-item")
        );
        if (refs) {
          refs.forEach((ref, index) => {
            const img = ref.querySelector("img");
            if (img.complete) {
              // console.log('img complete already', img)
              this.setTimeline(ref, index);
            } else {
              console.log("adding listener");
              img.addEventListener("load", () => {
                // console.log('img loaded success', img)
                this.setTimeline(ref, index);
              });
              img.addEventListener("error", () => {
                console.log("error, no image loaded, no animation set");
              });
            }
          });
        }
      }
    },
  },
};
</script>


<style lang="scss">
.container-work {
  .work-grid {
    grid-row-gap: 50px;

    .work-grid-item {
      margin: 0;
      overflow: hidden;

      &:nth-child(3n + 1) {
        grid-column: 1 / span 5;
        place-self: start;
      }

      &:nth-child(3n + 2) {
        grid-column: span 4 / 13;
        place-self: center;
      }

      &:nth-child(3n + 3) {
        grid-column: 6 / span 3;
        place-self: center;
      }

      @media (max-width: $mobile-bp) {
        grid-row-gap: 50px;

        &:nth-child(even) {
          grid-column: 5 / 13;
          place-self: start;
        }

        &:nth-child(odd) {
          grid-column: 2 / 10;
          place-self: center;
        }
      }
    }
  }
}
</style>