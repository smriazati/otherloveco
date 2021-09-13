<template>
  <div class="page-about">
    <div class="basic-row">
      <h1 class="visually-hidden">About</h1>
      <div class="about-grid grid-parent">
        <section class="introduction">
          <div class="grid-wrapper grid-fixed" v-if="aboutPage">
            <div class="grid-template">
              <div class="grid-column">
                <p>
                  We are a woman-owned full-service design studio specializing
                  in visual identities, content creation, and experiences for
                  conscious brands here and around the world.
                </p>
                <p>
                  Through a holistic, modern approach to design, our team
                  distills the vision, passion, and soul of your business and
                  crafts the most powerful way to present who you are to the
                  world.
                </p>
                <p>
                  We act as a strategic and creative companion to our clients
                  throughout every phase, from design to content to
                  environments. Through an intimate and collaborative approach,
                  we use empathy, story, and design to emphasize what makes you
                  stand out and connect you to your people.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="section-divider">
          <div class="grid-wrapper grid-fluid">
            <div class="grid-template">
              <div class="grid-column">
                <h2>We believe</h2>
                <p>1. Value</p>
              </div>
            </div>
          </div>
        </section>
        <section id="brandsThatFeel" class="floating-text">
          <div class="grid-wrapper grid-fixed">
            <div class="grid-template">
              <div class="grid-column">
                <h3>Brands that make you <em>feel</em></h3>
                <p>
                  We are a collective of whole-hearted brand lovers fueled by
                  passion, curiosity, and empathy. We see what others don’t. As
                  a team, we strategize the most powerful and unique design
                  choices that will ignite a magnetic emotional connection
                  towards your brand. We are intentional about materializing
                  fresh concepts and creating meaningful experiences that go
                  beyond what is seen.
                </p>
              </div>
              <div class="grid-column" v-if="aboutPage[0].aboutVid1">
                <div class="video-wrapper">
                  <SanityFile :asset-id="aboutPage[0].aboutVid1.asset._ref">
                    <template #default="{ src }">
                      <video :src="src" autoplay muted loop></video>
                    </template>
                  </SanityFile>
                </div>
              </div>
              <div class="grid-column" v-if="aboutPage[0].aboutVid2">
                <div class="video-wrapper">
                  <SanityFile :asset-id="aboutPage[0].aboutVid2.asset._ref">
                    <template #default="{ src }">
                      <video :src="src" autoplay muted loop></video>
                    </template>
                  </SanityFile>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="floating-text">
          <div class="grid-wrapper grid-fixed">
            <div class="grid-template">
              <div class="grid-column col-start-4">
                <h3>Purpose and people <em>first</em></h3>
                <p>
                  You have a powerful story. Through modern visuals, clear and
                  compelling messaging, meticulous attention to detail, and a
                  visceral awareness of the human experience, we will connect
                  your purpose to the people who need it most.
                </p>
                <p>
                  We believe that the most powerful brands blend beauty,
                  consciousness, and impact. Our clients have the common thread
                  of passion, purpose, and awareness of impact on people and the
                  planet.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="floating-text">
          <div class="grid-wrapper grid-fixed">
            <div class="grid-template">
              <div class="grid-column col-start-7">
                <h3>Design to disrupt the <em>future</em></h3>
                <p>
                  We empower people, businesses, and brands who are ready to
                  make a positive impact in the world, small or large, through
                  unique and meaningful visual brands that connect and include.
                  We care deeply about equity, empathy, diversity, and
                  inclusion.
                </p>
                <p>
                  We believe that small, intentional choices make big change. We
                  ensure that every word and line of code is inclusive, from
                  communities to accessibility. We vow to be conscious of our
                  carbon footprint. To fight for inclusion. To practice
                  anti-racism. To keep learning and unlearning. To champion
                  beauty.
                </p>
                <p>
                  We are constantly absorbing, reading, listening, connecting,
                  and evolving. This influences our work, and our work
                  influences the world.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="call-to-action">
          <div class="grid-wrapper grid-fixed">
            <div class="grid-template">
              <div class="grid-column">
                <h3>We partner with you to bring your OTHERLOVE to life.</h3>
                <button class="flat">
                  <nuxt-link to="/contact">Say hi</nuxt-link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="asterisks">
          <div class="grid-wrapper grid-fixed">
            <div class="grid-template">
              <div class="grid-column">
                <p>
                  * We are a small team. We love to work closely together and
                  collaborate with our clients.
                </p>
                <p>
                  ** We don’t have a house style. This allows us to constantly
                  explore, learn, and mold to each client’s needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity }) {
    const query1 = groq`*[_type == "aboutPage"]`;
    const query2 = groq`*[_type == "siteSettings"]`;
    const aboutPage = await $sanity.fetch(query1).then((res) => res);
    const siteSettings = await $sanity.fetch(query2).then((res) => res);
    return { aboutPage, siteSettings };
  },
  name: 'About',
  head() {
    return {
      title: `About | ${this.siteSettings[0].siteTitle}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.siteSettings[0].siteDesc,
        },
      ],
    };
  },
  mounted() {
    console.log(this);
  }
};
</script>

