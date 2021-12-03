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
              <li>
                <a
                  href="https://www.instagram.com/otherlove.co/"
                  target="_blank"
                  >Instagram</a
                >
              </li>
              <li>
                <a href="https://www.pinterest.com/otherloveco/" target="_blank"
                  >Pinterest</a
                >
              </li>
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
      siteSettings: "",
      isMenuExpanded: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.setAnimation();
      const menu = this.$refs.menu;
      if (menu) {
        const navLinks = menu.querySelectorAll("li");
        navLinks.forEach((link) => {
          link.addEventListener("click", () => {
            this.closeMenu();
          });
        });
      }
    });
  },
  methods: {
    toggleMenu() {
      this.isMenuExpanded = !this.isMenuExpanded;
    },
    closeMenu() {
      this.isMenuExpanded = false;
    },
    setAnimation() {},
  },
};
</script>

<style lang="scss">
// mobile menu

@media (min-width: $nav-bp) {
  header.site-header nav > button,
  .mobile-bonus-nav {
    display: none;
  }
}

@media (max-width: $nav-bp) {
  header.site-header nav .collapsible {
    display: none;
  }

  header.site-header nav {
    display: flex;
    justify-content: flex-end;
  }

  header.site-header .logo {
    max-width: 200px;
  }

  header.site-header nav:not(.expanded) {
    .mobile-bonus-nav {
      display: none;
    }
  }

  .submark img {
    max-width: 35px;
    filter: grayscale(1) invert(1);
  }

  header.site-header nav.expanded {
    position: relative;

    button {
      position: relative;
      z-index: 100;
      color: white;
    }
  }

  header.site-header nav.expanded .collapsible {
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    padding: 5%;
    text-align: right;
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    background: #000;
    box-shadow: -12px 0px 30px #ee7b7b;

    > ul {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > * {
        color: white;
      }

      > li {
        padding: 0;
        padding-top: 30px;
      }
    }

    .mobile-bonus-nav {
      flex: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;

        li {
          padding: 5px;
          font-size: 14px;
          line-height: 20px;

          a {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>