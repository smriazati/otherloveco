<template>
  <footer class="site-footer">
    <div class="primary-footer row">
      <div class="col footer-column-block" v-if="footerCol1">
        <SanityContent :blocks="footerCol1" />
      </div>

      <div class="col footer-column-block" v-if="footerCol2">
        <SanityContent :blocks="footerCol2" />
      </div>

      <div class="col no-p-margin footer-column-block" v-if="footerCol3">
        <SanityContent :blocks="footerCol3" />
      </div>

      <div id="backToTop" class="col">
        <button @click="backToTop">Back to top</button>
      </div>
    </div>
    <div class="sub-footer">
      <p>&copy; 2021. Made with Otherlove, LLC.</p>
      <div class="submark">
        <div class="image-wrapper">
          <nuxt-link to="/">
            <SiteSubmark />
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("siteFooter", {
      footerCol1: (state) => state.footerCol1,
      footerCol2: (state) => state.footerCol2,
      footerCol3: (state) => state.footerCol3,
    }),
  },
  methods: {
    backToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
footer.site-footer {
  width: 100%;
  background: #000;
  padding: 60px 0 30px 0;
  position: relative;
  z-index: 13;

  * {
    color: #fff;
  }

  .row {
    @include gridFixed;

    #backToTop {
      grid-column: span 2 / 13;
      grid-row: 1 / 2;
      text-align: right;

      @media (max-width: $mobile-bp) {
        grid-column: 1 / span 5;
        grid-row: 4 / 5;
        text-align: left;
        margin-top: 111px;
        margin-bottom: 0;
      }
    }

    .col {
      grid-column: span 3;

      @media (max-width: $mobile-bp) {
        grid-column: span 8;
        margin-bottom: 30px;

        &:first-child {
          grid-row: 1 / 2;
        }

        &:nth-child(2) {
          grid-row: 2 / 3;
        }

        &:nth-child(3) {
          grid-row: 3 / 4;
        }
      }
    }
  }

  ul,
  ol {
    list-style: none;
  }

  .footer-column-block div {
    > *:not(:last-child) {
      margin-bottom: 10px;
    }

    h2 {
      font-family: "Reckless", serif;
      font-size: 22px;
      line-height: 22px;
    }

    p,
    ul li,
    ol li {
      font-size: 14px;
      line-height: 20px;
      max-width: 295px;
    }
  }

  .sub-footer {
    @include contained;
    display: flex;
    padding: 80px 0 40px 0;

    @media (max-width: $mobile-bp) {
      padding: 0;
    }

    width: 100%;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 10px;
      line-height: 20px;
    }

    .submark img {
      max-width: 50px;
      filter: grayscale(1) invert(1);
    }
  }
}
footer {
  position: relative;
  z-index: 11;
}
</style>