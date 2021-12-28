<template>
  <div class="about-wrapper" ref="aboutWrapper">
    <div class="container container-no-grid page-about" v-if="aboutPage">
      <section ref="fixedTop" v-if="aboutPage.section1" class="section1 fixed">
        <div class="fixed-content">
          <div class="text-wrapper">
            <h2 v-if="aboutPage.section1.headline">
              {{ aboutPage.section1.headline }}
            </h2>
            <p v-if="aboutPage.section1.subheadline" class="subheadline">
              {{ aboutPage.section1.subheadline }}
            </p>
          </div>
        </div>
      </section>
    </div>
    <div
      ref="container"
      class="container container-no-grid page-about"
      v-if="aboutPage"
    >
      <section v-if="aboutPage.capabilities" class="capabilities full-row">
        <div class="image-wrapper" v-if="aboutPage.capabilities.image">
          <img
            :src="`${$urlFor(aboutPage.capabilities.image.asset._ref).size(
              1200
            )}`"
            :alt="aboutPage.capabilities.image.alt"
            width="1200"
          />
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage.capabilities.headline">
            {{ aboutPage.capabilities.headline }}
          </h2>
          <div class="main-list" v-if="aboutPage.capabilities.mainList">
            <SanityContent :blocks="aboutPage.capabilities.mainList" />
          </div>
          <div class="sub-list" v-if="aboutPage.capabilities.subList">
            <SanityContent
              class="two-col"
              :blocks="aboutPage.capabilities.subList"
            />
          </div>
        </div>
      </section>
      <section v-if="aboutPage.beliefBanner" class="belief-banner full-row">
        <div class="text-wrapper">
          <h2 v-if="aboutPage.beliefBanner.title">
            {{ aboutPage.beliefBanner.title }}
          </h2>
          <ol ref="ticker">
            <li v-for="item in aboutPage.beliefBanner.beliefs" :key="item._id">
              {{ item }}
            </li>
          </ol>
        </div>
      </section>
      <section
        v-if="aboutPage.section2"
        class="section2 image-text-row image-right"
      >
        <div class="image-wrapper overflow" v-if="aboutPage.section2">
          <div v-if="aboutPage.section2.video" class="video-wrapper">
            <img
              :src="
                $urlFor(aboutPage.section2.video.poster.asset._ref).size(400)
              "
              width="400"
            />

            <SanityFile :asset-id="aboutPage.section2.video.asset._ref">
              <template #default="{ src }">
                <video :src="src" autoplay muted loop></video>
              </template>
            </SanityFile>
          </div>
          <div v-if="aboutPage.section2.image">
            <img
              :src="$urlFor(aboutPage.section2.image.asset._ref).size(400)"
              :alt="aboutPage.section2.image.alt"
              width="400"
            />
          </div>
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage.section2.headline">
            {{ aboutPage.section2.headline }}
          </h2>
          <div class="sub-list" v-if="aboutPage.section2.description">
            <SanityContent :blocks="aboutPage.section2.description" />
          </div>
        </div>
      </section>

      <section
        v-if="aboutPage.section3"
        class="section3 image-text-row image-left"
      >
        <div class="image-wrapper" v-if="aboutPage.section3.image">
          <img
            :src="$urlFor(aboutPage.section3.image.asset._ref).size(400)"
            :alt="aboutPage.section3.image.alt"
            width="400"
          />
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage.section3.headline">
            {{ aboutPage.section3.headline }}
          </h2>
          <div class="sub-list" v-if="aboutPage.section3.description">
            <SanityContent :blocks="aboutPage.section3.description" />
          </div>
        </div>
      </section>

      <section
        v-if="aboutPage.section4"
        class="section4 image-text-row image-right"
      >
        <div class="image-wrapper overflow" v-if="aboutPage.section4">
          <div v-if="aboutPage.section4.image1">
            <img
              :src="$urlFor(aboutPage.section4.image1.asset._ref).size(400)"
              :alt="aboutPage.section4.image1.alt"
              width="400"
            />
          </div>
          <div v-if="aboutPage.section4.image2">
            <img
              :src="$urlFor(aboutPage.section4.image2.asset._ref).size(400)"
              :alt="aboutPage.section4.image2.alt"
              width="400"
            />
          </div>
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage.section4.headline">
            {{ aboutPage.section4.headline }}
          </h2>
          <div class="sub-list" v-if="aboutPage.section4.description">
            <SanityContent :blocks="aboutPage.section4.description" />
          </div>
        </div>
      </section>
    </div>

    <section class="full-row cta" ref="fixedVid">
      <div class="bg-video-wrapper">
        <div>
          <SanityFile :asset-id="aboutPage.cta.bgvideo.asset._ref">
            <template #default="{ src }">
              <video :src="src" autoplay muted loop></video>
            </template>
          </SanityFile>
        </div>
      </div>
      <div class="text-wrapper" v-if="aboutPage.cta">
        <h2 v-if="aboutPage.cta.text">{{ aboutPage.cta.text }}</h2>
        <button class="flat underlined">
          <nuxt-link to="/contact">Get in touch</nuxt-link>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const thisPage = "aboutPage";

    const query1 = groq`*[_type == "${thisPage}"]{
          pageMetadata,
          pageTitle,
          beliefBanner,
          capabilities,
          cta,
          section1,
          section2,
          section3,
          section4
    }`;
    const aboutPage = await $sanity.fetch(query1).then((res) => res[0]);

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

    return { aboutPage, pageMetadata };
  },
  data() {
    return {
      name: "About",
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
  mounted() {
    this.setPosterImages();
    this.$nextTick(function () {
      this.setPinAnimation();
      this.setTickerAnimation();
    });
    window.addEventListener("resize", () => {
      this.setPinAnimation();
      this.setTickerAnimation();
    });
  },
  methods: {
    setPosterImages() {
      // get all images
      // get video
      // if video is playing, hide image
      const page = this.$refs.aboutWrapper;
      const wrappers = page.querySelectorAll(".video-wrapper");
      wrappers.forEach((wrapper) => {
        // check for image
        const hasImg = wrapper.getElementsByTagName("img").length > 0;
        if (hasImg) {
          const img = wrapper.querySelector("img");
          const src = img.src;
          const vid = wrapper.querySelector("video");
          vid.poster = src;
          img.remove();
        }
      });
    },

    setPinAnimation() {
      const gsap = this.$gsap;

      const fixedTop = this.$refs.fixedTop;
      if (fixedTop) {
        if (window.innerWidth > 768) {
          gsap.to(fixedTop, {
            scrollTrigger: {
              trigger: fixedTop,
              start: "top top",
              pin: true,
              // markers: true,
              pinSpacing: false,
            },
          });
        } else {
          gsap.to(fixedTop, {
            scrollTrigger: {
              trigger: fixedTop,
              start: "bottom bottom",
              pin: true,
              pinSpacing: false,
            },
          });
        }
      }

      const fixedVid = this.$refs.fixedVid;
      const container = this.$refs.container;
      if (fixedVid && container) {
        this.setGridTemplateRowHeights();
        gsap.to(fixedVid, {
          scrollTrigger: {
            trigger: fixedVid,
            start: "top bottom",
            // markers: true,
            pin: container,
            pinSpacing: false,
          },
        });
      }
    },
    setGridTemplateRowHeights() {
      const rows = document.querySelectorAll(".image-text-row");
      if (rows) {
        rows.forEach((row) => {
          let height = 0;
          let extra = 400;
          const heightChildren = row.querySelectorAll(".text-wrapper > *");
          heightChildren.forEach((child) => {
            if (child.offsetHeight > 0) {
              height = height + child.offsetHeight;
            }
          });
          row.style.gridTemplateRows = `${height + extra}px`;
        });
      }
    },
    setTickerAnimation() {
      const gsap = this.$gsap;

      const ref = this.$refs.ticker;
      if (!ref || !gsap) {
        return;
      }
      let tickerStart;
      let speed;
      if (window.innerWidth > 768) {
        tickerStart = ref.offsetWidth;
        speed = 30;
      } else {
        tickerStart = window.innerWidth / 2;
        speed = 15;
      }
      gsap.set(ref, {
        x: tickerStart - 80,
      });
      gsap.to(ref, {
        x: -ref.offsetWidth,
        repeat: -1,
        ease: "linear",
        duration: speed,
      });
    },
  },
};
</script>


<style lang="scss">
// about page
.page-about {
  position: relative;
  overflow: hidden;

  > * {
    //  background: #fff;
    z-index: 10;
    position: relative;
  }

  > *:not(.full-row):not(.fixed) {
    @include gridFixed;
    padding: 50px 0;
  }

  .section1 {
    .fixed-content {
      @include gridFixed;

      @media (min-width: $mobile-bp) {
        // padding: 150px 0 180px 0;
        // padding-bottom: 180px;
      }
    }

    .text-wrapper {
      grid-column: 2 / span 8;
      grid-row: 1 / 2;

      @media (max-width: $mobile-bp) {
        grid-column: 1 / 13;
      }

      padding-bottom: 30px;
    }

    h2 {
      font-size: 26px;
      line-height: 34px;
    }

    h2 + p {
      margin-top: 30px;
    }

    p {
      grid-column: 2 / span 8;
      grid-row: 2 / 3;
      font-size: 18px;
      line-height: 26px;
    }
  }

  .capabilities {
    background: #000;

    * {
      color: $cloud;
    }

    .image-wrapper {
      @media (min-width: $mobile-bp) {
        flex-basis: 65%;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;

        @media (max-width: $mobile-bp) {
          object-fit: cover;
        }
      }

      @media (min-width: 1600px) {
        padding: 50px;
      }
    }

    .text-wrapper {
      padding: 50px;

      > *:not(:last-child) {
        margin-bottom: 50px;
      }

      h2 {
        font-size: 18px;
        line-height: 26px;
        text-transform: uppercase;
      }

      .main-list p {
        font-family: "Reckless", serif;
        font-size: 36px;
        line-height: 48px;
      }

      .sub-list p {
        font-size: 15px;
        line-height: 17px;

        + p {
          margin-top: 6px;
        }
      }
    }
  }

  .image-text-row {
    @media (max-width: $mobile-bp) {
      display: flex !important;
      flex-direction: column;

      > *:not(:last-child) {
        margin-bottom: 30px;
      }

      .image-wrapper {
        display: flex;
        overflow: hidden;
        height: 100%;
        width: 100%;

        // align-items: center;
        > * {
          display: flex;
          height: unset !important;
          align-items: flex-start;
        }
      }
    }

    > * {
      grid-row: 1 / 2;
      place-content: center;
    }

    h2 {
      font-size: 36px;
      line-height: 44px;
      margin-bottom: 30px;
    }

    p {
      font-size: 18px;
      line-height: 26px;
    }

    &.image-right {
      .text-wrapper {
        grid-column: 2 / span 5;
      }

      .image-wrapper {
        grid-column: 8 / span 5;
      }
    }

    &.image-left {
      .image-wrapper {
        grid-column: 2 / span 5;
      }

      .text-wrapper {
        grid-column: 8 / span 4;
      }
    }

    .image-wrapper {
      display: flex;

      > * {
        flex-basis: 100%;

        &:nth-child(2) {
          margin-left: 15px;
        }
      }

      video,
      img {
        height: 100%;
        min-height: 100%;
        width: 100%;
        min-width: 100%;
        max-width: unset;
        object-fit: cover;
      }
    }

    // .image-wrapper.overflow {
    //   // @media (min-width: $mobile-bp) {
    //   //   width: 150%;
    //   // }
    // }
  }

  .belief-banner {
    border-bottom: 1px solid black;
    overflow: hidden;
    padding: 30px;

    // for ticker

    .text-wrapper {
      overflow: hidden;

      h2 {
        background: $cloud;
        padding-right: 30px;
        position: relative;
        z-index: 10;
      }
    }

    .text-wrapper {
      @include contained;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      > * {
        margin: 0;
      }

      h2 {
        text-transform: uppercase;
        font-size: 18px;
        line-height: 20px;
        white-space: nowrap;
        margin-right: 30px;
      }

      ul,
      ol {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        list-style: disc;

        li {
          white-space: nowrap;
          display: inline-block;
          font-size: 14px;
          line-height: 20px;

          &:not(:last-child) {
            padding-right: 60px;

            @media (max-width: $mobile-bp) {
              padding-right: 30px;
            }
          }
        }
      }
    }
  }
}

.about-wrapper {
  .cta {
    position: relative;
    z-index: 9;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    overflow: hidden;

    > *,
    a,
    span {
      color: $cloud;
    }

    > .bg-video-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9;
    }

    .text-wrapper {
      position: relative;
      z-index: 10;
      padding: 200px 0;
    }

    h2 {
      max-width: 585px;

      @media (max-width: $mobile-bp) {
        max-width: 90%;
      }

      margin: 0 auto;
      font-family: "Reckless", serif;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      line-height: 48px;
      margin-bottom: 30px;
    }

    button {
      display: flex;
      justify-content: center;

      a {
        font-size: 24px;
        line-height: 31px;
      }
    }
  }
}

.page-about {
  &.container {
    @media (max-width: $mobile-bp) {
      padding-top: 60px;
    }

    // background: white;
    position: relative;
    z-index: 9;
  }
}
.page-about {
  .video-wrapper {
    position: relative;

    > * {
      position: absolute;
      top: 0;
      left: 0;
    }

    img {
      z-index: 9;
      opacity: 1;
      transition: 0.3s ease all;

      &.fade-out {
        opacity: 0;
      }
    }

    video {
      z-index: 8;
    }
  }
}

.page-about .section4 {
  padding-bottom: 180px !important;
}

.page-about .section1 .text-wrapper {
  padding: 200px 0 180px 0 !important;
}

.page-about.container {
  margin-top: 0 !important;
  padding-top: 0 !important;
  background: transparent !important;
}

.page-about .image-text-row {
  .image-wrapper {
    place-self: center;
  }
}

.page-about .section2.image-text-row {
  .image-wrapper {
    max-height: 344px;

    @media (min-width: $mobile-bp) {
      transform: translateX(40px);
    }
  }
}

.page-about .section3.image-text-row {
  .image-wrapper {
    max-height: 676px;
  }
}

.page-about .section4.image-text-row {
  .image-wrapper {
    max-height: 344px;

    @media (min-width: $mobile-bp) {
      transform: translateX(40px);
    }
  }

  margin-bottom: 5px !important;
}
</style>