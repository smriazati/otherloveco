<template>
<div class="fixed-header" :class="isMenuExpanded ? 'menu-expanded' : ''">

  <header class="site-header">
    <div class="logo">
      <div class="logo-wrapper">
        <nuxt-link to="/">
          <SiteLogo />
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
        <div class="submark">
            <div class="image-wrapper">
                <nuxt-link to="/">
                  <SiteSubmark />
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


export default {
  data() {
    return {
      siteSettings: '',
      isMenuExpanded: false
    }
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
