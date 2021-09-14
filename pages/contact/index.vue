<template>
  <div>
    <div  class="container page-contact" v-if="contactPage[0]">
      <section class="contact-form">
        <div class="text-wrapper">
          <h1 v-if="contactPage[0].pageTitle">{{contactPage[0].pageTitle }}</h1>
          <h1 v-else>Get in touch</h1>
          <p v-if="contactPage[0].formMessage">
            {{ contactPage[0].formMessage }}
          </p>
        </div>
        <div class="contact-form">
          <ContactFormNetlify
            :email="true"
            :name="true"
            :message="true"
            :successRoute="`/contact/success`"
          />
        </div>
      </section>
      <ContactInfo 
        :contactInfo="contactPage[0].contactInfo"
        :landAcknowledgment="contactPage[0].landAcknowledgment" />
      </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
    async asyncData({ $sanity }) {
      const query1 = groq`*[_type == "contactPage"]`;
      const contactPage = await $sanity.fetch(query1).then((res) => res);
      return { contactPage };
    },
};
</script>

