<template>
<div class="fixed-header" :class="isMenuExpanded ? 'menu-expanded' : ''">

  <header class="site-header">
    <div v-if="logo" class="logo">
      <div class="logo-wrapper">
        <nuxt-link to="/">
          <SanityImage
            :asset-id="logo.asset._ref"
            auto="format"
            :alt="logo.alt"
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
      <div class="collapsible">
    <ul ref="menu">
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/team">Team</nuxt-link></li>
        <li><nuxt-link to="/work">Work</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>

      <div class="mobile-bonus-nav">
        <ul>
          <li><a href="https://www.instagram.com/otherlove.co/" target="_blank">Instagram</a></li>
          <li><a href="https://www.pinterest.com/otherloveco/" target="_blank">Pinterest</a></li>
        </ul>
        <div v-if="submark" class="submark">
            <div class="image-wrapper">
                <nuxt-link to="/">
                <SanityImage
                  :asset-id="submark.asset._ref"
                  auto="format"
                  :alt="submark.alt"
                />
                </nuxt-link>
            </div>
        </div>
      </div>
      </div>
    </nav>
  </header>

</div>
</template>


<script>

import { mapState } from 'vuex'

export default {
  // async fetch() {
  //     const query = groq`*[_type == "siteSettings"]`;
  //     this.siteSettings = await this.$sanity.fetch(query).then((res) => res);
  // },
  data() {
    return {
      siteSettings: '',
      isMenuExpanded: false
    }
  },
  computed: {
    ...mapState('siteSettings', {
      logo: state => state.siteLogo,
      submark: state => state.favicon,
    })
  },
  mounted() {
    this.$nextTick(function () {
      this.setAnimation();
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
    },
    setAnimation() {
      
    }
  }
}
</script>
