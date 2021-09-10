<template>
  <div class="container">
    <section v-if="project" class="work-item fixed-from-bottom">
      <div
        class="text-wrapper"
        ref="textWrapper"
        :style="` margin-top: ${
          $store.state.helpful.windowHeight - textHeight
        }px`"
      >
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

      <div
        class="image-wrapper images-padded-from-bottom"
        :style="` margin-top: ${
          $store.state.helpful.windowHeight / imageBuffer
        }px`"
      >
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
        <div v-if="project.projectcover" class="project-cover">
          <SanityImage
            :asset-id="project.projectcover.asset._ref"
            auto="format"
          />
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, redirect, $sanity }) {
    const query = groq`*[_type == "projects"]`;
    const projects = await $sanity.fetch(query).then((res) => res);

    const filteredProject = projects.find(
      (project) => project.slug.current === params.project
    );
    if (filteredProject) {
      return {
        project: filteredProject,
      };
    } else {
      redirect("/work");
    }
  },
  data() {
    return {
      bgColor: "#fff",
      isMounted: false,
      textHeight: 0,
      textBuffer: 80,
      imageBuffer: 1.3,
    };
  },
  mounted() {
    this.isMounted = true;
    this.setBodyBg();
  },

  watch: {
    isMounted() {
      if (!this.isMounted) {
        return false;
      }
      this.$nextTick(function () {
        this.setFixedLayout();
      });
    },
  },
  methods: {
    setFixedLayout() {
      if (!this.$refs.textWrapper) {
        return;
      }
      this.textHeight = this.$refs.textWrapper.offsetHeight + this.textBuffer;
    },
    setBodyBg() {
      if (!this.project.bgcolor) {
        return;
      }

      this.$store.commit("helpful/setBodyBg", `#${this.project.bgcolor}`);
    },
  },
};
</script>
