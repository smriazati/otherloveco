<template>
<div class="fixed-header">
  
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
    <nav :class="isMenuExpanded ? 'expanded' : 'collapsed'">
      <button class="flat" @click="toggleMenu">
        <span v-if="isMenuExpanded">Close</span>
        <span v-else>Menu</span>
      </button>
      <ul ref="menu">
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/work">Work</nuxt-link></li>
        <li><nuxt-link to="/team">Team</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
    </nav>
  </header>

</div>
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
      isMenuExpanded: false
    }
  },
  mounted() {
    this.$nextTick(function () {
      const menu = this.$refs.menu;
      if (menu) {
        const navLinks = menu.querySelectorAll('li');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            this.closeMenu();
          })
        })
      }
    });
  },
  methods: {
    toggleMenu() {
      this.isMenuExpanded = !this.isMenuExpanded;
    },
    closeMenu() {
      this.isMenuExpanded = false
    }
  }
}
</script>
