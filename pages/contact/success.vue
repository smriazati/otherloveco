<template>
  <div>
    <div  class="container page-contact" v-if="contactPage[0]">
      <section class="contact-intro">
        <div class="text-wrapper">
          <h1 v-if="contactPage[0].pageTitle">{{contactPage[0].pageTitle }}</h1>
          <h1 v-else>Get in touch</h1>
          <p v-if="contactPage[0].successMessage">
            {{ contactPage[0].successMessage }}
          </p>
        </div>
      </section>
      <section class="contact-form">
          <button><nuxt-link to="/contact">Submit another?</nuxt-link></button>

      </section>
      <ContactInfo 
        :contactInfo="contactPage[0].contactInfo"
        :landAcknowledgment="contactPage[0].landAcknowledgment" />
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
      const query1 = groq`*[_type == "contactPage"]`;
      const contactPage = await $sanity.fetch(query1).then((res) => res);
      // return { contactPage };

      const responses = await Promise.all([$instaApi.getFeed(15)]);
      const badResponse = responses.find((response) => !response.ok);
      
      if (badResponse) {
        const error = {
          statusCode: badResponse.status,
          message: badResponse.statusText,
        };
        return { contactPage, error };
      }

      return {
        insta: responses[0].json, contactPage
      };
    },
    data() {
      return {
        title: 'Contact'
      }
    },
    head() {
      return {
        title: this.title,
      }
    }
};
</script>
