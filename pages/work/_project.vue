<template>
  <div
    class="container container-no-grid"
    :style="`background-color: ${compBgColor}`"
  >
    <section v-if="project" class="work-item project-page fixed-from-bottom">
      <div class="text-wrapper" ref="textWrapper">
        <div class="text-wrapper-inner">
          <div v-if="project.projectname" class="project-title">
            <h1>{{ project.projectname }}</h1>
          </div>
          <div v-if="project.client" class="project-client">
            <h2>{{ project.client }}</h2>
          </div>
          <div v-if="project.category" class="project-category">
            <h3>{{ project.category }}</h3>
          </div>
          <div v-if="project.description" class="project-description">
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="project.gallery"
        ref="imagesWrapper"
        class="image-wrapper images-padded-from-bottom"
      >
        <div
          v-for="(item, index) in project.gallery"
          :key="index"
          class="project-gallery-item"
        >
          <SanityImage :asset-id="item.asset._ref" auto="format" />
        </div>
      </div>

      <div v-else class="image-wrapper">
        <div v-if="project.projectcover">
          <div class="project-cover">
            <SanityImage
              :asset-id="project.projectcover.asset._ref"
              auto="format"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, redirect, $sanity }) {
    const query = groq`*[_type == "projects"]{
        projectcover,
  projectname,
  slug,
  description,
  category,
  client,
  bgcolor,
  gallery}`;
    const projects = await $sanity.fetch(query).then((res) => res);

    const filteredProject = projects.find(
      (project) => project.slug.current === params.project
    );
    if (filteredProject) {
      return {
        project: filteredProject,
      };
    } else {
      // redirect("/work");
    }
    // return projects;
  },
  data() {
    return {
      bgColor: "#fff",
    };
  },
  mounted() {
    this.setTextPinning();
  },
  computed: {
    compBgColor() {
      if (this.project?.bgcolor) {
        return `#${this.project?.bgcolor}`;
      } else {
        return "#fff";
      }
    },
  },
  methods: {
    setTextPinning() {
      const text = this.$refs.textWrapper;
      const images = this.$refs.imagesWrapper;
      const ScrollTrigger = this.$ScrollTrigger;
      if (!text || !images) {
        console.log("cancelling pin, no images");
        return;
      }
      const textInner = text.querySelector(".text-wrapper-inner");
      console.log(images.offsetTop);

      textInner.style.paddingTop = `${
        window.innerHeight - textInner.offsetHeight * 2
      }px`;

      ScrollTrigger.create({
        // trigger: images,
        pin: text,
        pinSpacing: false,
        markers: true,
        start: `top top+=${images.offsetTop}px`,
        end: `bottom bottom`,
      });
    },
  },
};
</script>
<style lang="scss">
.work-page {
  .container {
    margin-top: 0;
    padding-top: 200px;
    padding-bottom: 100px;
    flex: 2;

    .project-page {
      @include gridFixed();

      &.work-item {
        .image-wrapper {
          display: flex;
          flex-direction: column;
          position: relative;
          // margin-left: 50%;
          // margin-top: -200px;
          grid-column: 7 / 13;
        }

        .text-wrapper {
          grid-column: 1 / 5;

          .text-wrapper-inner {
            > *:not(:last-child) {
              margin-bottom: 10px;
            }

            h2,
            h3 {
              font-size: 14px;
              text-transform: uppercase;
            }
          }
        }
      }
      .project-gallery-item:not(last-child) {
        padding-bottom: 75px;
      }
    }
  }
}
</style>