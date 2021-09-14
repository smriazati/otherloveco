<template>
  <header class="site-header">
    <div v-if="siteSettings" class="logo">
      <div v-if="siteSettings[0].siteLogo" class="logo-wrapper">
        <nuxt-link to="/">
          <SanityImage
            :asset-id="siteSettings[0].siteLogo.asset._ref"
            auto="format"
          />
          <!-- <img src="/Otherlove-Logo-lighter.png" alt="" /> -->
        </nuxt-link>
      </div>
    </div>
    <nav>
      <ul>
        <!-- <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/team">Team</nuxt-link></li>
        <li><nuxt-link to="/work">Work</nuxt-link></li> -->
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>


<script>

import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
      const query = groq`*[_type == "siteSettings"]`;
      this.siteSettings = await this.$sanity.fetch(query).then((res) => res);
  },
  data() {
    return {
      siteSettings: '',
    }
  }
}
</script>
