<template>
  <div>
    <div  class="container container-no-grid page-about" v-if="aboutPage[0]">
      <section v-if="aboutPage[0].section1" class="section1">
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section1.headline"> {{ aboutPage[0].section1.headline }}</h2>
          <p v-if="aboutPage[0].section1.subheadline" class="subheadline">{{ aboutPage[0].section1.subheadline }}</p>
        </div>
      </section>
      <section v-if="aboutPage[0].capabilities" class="capabilities full-row">
        <div class="image-wrapper" v-if="aboutPage[0].capabilities.image">
            <SanityImage
                :asset-id="aboutPage[0].capabilities.image.asset._ref"
                auto="format"
              />
          </div>
          <div class="text-wrapper">
              <h2 v-if="aboutPage[0].capabilities.headline"> {{ aboutPage[0].capabilities.headline }}</h2>
              <div class="main-list" v-if="aboutPage[0].capabilities.mainList">
                <SanityContent :blocks="aboutPage[0].capabilities.mainList" />
              </div>
              <div class="sub-list" v-if="aboutPage[0].capabilities.subList">
                <SanityContent class="two-col" :blocks="aboutPage[0].capabilities.subList" />
              </div>

          </div>
      </section>
      <section v-if="aboutPage[0].beliefBanner" class="belief-banner full-row">
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].beliefBanner.title"> {{ aboutPage[0].beliefBanner.title }}</h2>
          <ol>
            <li v-for="item in aboutPage[0].beliefBanner.beliefs" :key="item._id">{{ item }}</li>
          </ol>
        </div>
      </section>
      <section v-if="aboutPage[0].section2" class="section2 image-text-row image-right">
        
        <div class="image-wrapper overflow" v-if="aboutPage[0].section2">
          <div v-if="aboutPage[0].section2.video" class="video-wrapper">
            <SanityFile :asset-id="aboutPage[0].section2.video.asset._ref">
              <template #default="{ src }">
                <video :src="src" autoplay muted loop></video>
              </template>
            </SanityFile>
          </div>
           <div v-if="aboutPage[0].section2.image">
            <SanityImage
                :asset-id="aboutPage[0].section2.image.asset._ref"
                auto="format"
              />  
           </div>
          
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section2.headline"> {{ aboutPage[0].section2.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section2.description">
            <SanityContent :blocks="aboutPage[0].section2.description" />
          </div>
        </div>
      </section>

      <section v-if="aboutPage[0].section3" class="section3 image-text-row image-left">
        <div class="image-wrapper" v-if="aboutPage[0].section3.image">
          <SanityImage
                :asset-id="aboutPage[0].section3.image.asset._ref"
                auto="format"
              />
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section3.headline"> {{ aboutPage[0].section3.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section3.description">
            <SanityContent :blocks="aboutPage[0].section3.description" />
          </div>
        </div>
      </section>

      <section v-if="aboutPage[0].section4" class="section4 image-text-row image-right">
        <div class="image-wrapper overflow" v-if="aboutPage[0].section4">
           <div v-if="aboutPage[0].section4.image1">
            <SanityImage
                :asset-id="aboutPage[0].section4.image1.asset._ref"
                auto="format"
              />  
           </div>
           <div v-if="aboutPage[0].section4.image2">
            <SanityImage
                :asset-id="aboutPage[0].section4.image2.asset._ref"
                auto="format"
              />  
           </div>
          
        </div>
        <div class="text-wrapper">
          <h2 v-if="aboutPage[0].section4.headline"> {{ aboutPage[0].section4.headline }}</h2>
          <div class="sub-list" v-if="aboutPage[0].section4.description">
            <SanityContent :blocks="aboutPage[0].section4.description" />
          </div>
        </div>
      </section>
      
      <section class="cta full-row video-scroller" v-if="aboutPage[0].cta">
        <div class="video-scroller-bg">
          <div ref="vidWrapper" class="video-wrapper">
            <div>
              <SanityFile :asset-id="aboutPage[0].cta.bgvideo.asset._ref">
                <template #default="{ src }">
                  <video :src="src" autoplay muted loop></video>
                </template>
              </SanityFile>
            </div>
          </div>
        </div>
        <div class="text-wrapper video-scroller-content">
          <h2 v-if="aboutPage[0].cta.text">{{ aboutPage[0].cta.text }}</h2>
          <button class="flat underlined"><nuxt-link to="/contact">Get in touch</nuxt-link></button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const query1 = groq`*[_type == "aboutPage"]`;
    // const query2 = groq`*[_type == "siteSettings"]`;
    const aboutPage = await $sanity.fetch(query1).then((res) => res);
    // const siteSettings = await $sanity.fetch(query2).then((res) => res);
    return { aboutPage };
  },
  name: 'About',
  // head() {
  //   return {
  //     title: `About | ${this.siteSettings[0].siteTitle}`,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: this.siteSettings[0].siteDesc,
  //       },
  //     ],
  //   };
  // },
  mounted() {
    console.log(this);
  }
};
</script>

