<template>
  <div>
    <div  class="container page-contact" v-if="contactPage">
      <section class="contact-intro">
        <div class="text-wrapper">
          <h1>Get in touch</h1>
          <p v-if="contactPage.successMessage">
            {{ contactPage.successMessage }}
          </p>
        </div>
      </section>
      <section class="contact-form">
          <button><nuxt-link to="/contact">Submit another?</nuxt-link></button>

      </section>
      <ContactInfo 
        :contactInfo="contactPage.contactInfo"
        :landAcknowledgment="contactPage.landAcknowledgment" />
      </div>
      <div class="insta-feed-parent" v-if="insta">
        <div class="text-wrapper">
          <h2>Follow along</h2>
          <button class="flat"><a href="https://www.instagram.com/otherlove.co/">@Otherlove.co</a></button>
        </div>
        <Instafeed :insta="insta.data" :count="15" />
      </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ $sanity, $instaApi }) {
      const thisPage = "contactPage"

      const query1 = groq`*[_type == "${thisPage}"]{
        contactInfo,
        successMessage,
        landAcknowledgment
      }`;
      const contactPage = await $sanity.fetch(query1).then((res) => res[0]);

      const responses = await Promise.all([$instaApi.getFeed(15)]);
      const badResponse = responses.find((response) => !response.ok);
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



      if (badResponse) {
        const error = {
          statusCode: badResponse.status,
          message: badResponse.statusText,
        };
        return { contactPage, error, pageMetadata };
      }

      return {
        insta: responses[0].json, contactPage, pageMetadata
      };
    },
data() {
        return {
          name: "Home"
        }
      },
  head() {
    return {
      title: this.pageMetadata ? (this.pageMetadata.pageTitle ? (this.pageMetadata.pageTitle) : (this.$store.state.siteSettings.siteTitle ? this.$store.state.siteSettings.siteTitle : '')) : (this.$store.state.siteSettings.siteTitle ? this.$store.state.siteSettings.siteTitle : ''),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata ?
                      (this.pageMetadata.pageDesc ? (this.pageMetadata.pageDesc) : (this.$store.state.siteSettings.siteDescription ? this.$store.state.siteSettings.siteDescriptionription : '')) 
                      : (this.$store.state.siteSettings.siteDescriptionription ? this.$store.state.siteSettings.siteDescriptionription : '')
        },
        { 
          hid: 'og:image', 
          property: 'og:image', 
          content: this.pageMetadata ? (this.pageMetadata.ogImage.url ? (this.pageMetadata.ogImage.url) : (this.$store.state.siteSettings.openGraphImage ? this.$store.state.siteSettings.openGraphImage.url : '')) : (this.$store.state.siteSettings.openGraphImage ? this.$store.state.siteSettings.openGraphImage.url : '')
        },
      ],
    };
  },
};
</script>
