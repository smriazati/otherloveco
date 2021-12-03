<template>
  <div>
    <div class="container page-contact" v-if="contactPage">
      <section class="contact-intro">
        <div class="text-wrapper">
          <h1>Get in touch</h1>
          <p v-if="contactPage.formMessage">
            {{ contactPage.formMessage }}
          </p>
        </div>
      </section>
      <section class="contact-form">
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
        :contactInfo="contactPage.contactInfo"
        :landAcknowledgment="contactPage.landAcknowledgment"
      />
    </div>
    <div class="insta-feed-parent" v-if="insta">
      <div class="text-wrapper">
        <h2>Follow along</h2>
        <button class="flat">
          <a href="https://www.instagram.com/otherlove.co/">@Otherlove.co</a>
        </button>
      </div>
      <InstaFeed :insta="insta.data" :count="15" />
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ $sanity, $instaApi }) {
    const thisPage = "contactPage";
    const query1 = groq`*[_type == "${thisPage}"]{
  contactInfo,
  formMessage,
  landAcknowledgment
}`;
    const contactPage = await $sanity.fetch(query1).then((res) => res[0]);
    // return { contactPage };

    const metadataQuery = groq`*[_type == "${thisPage}"]{
        "pageMetadata": {
          "pageTitle": pageMetadata.pageTitle,
          "pageDesc": pageMetadata.pageDesc,
          "ogImage": {
            "url": pageMetadata.ogImage.asset->url
          }
        }
      }`;
    const pageMetadata = await $sanity
      .fetch(metadataQuery)
      .then((res) => res[0].pageMetadata);

    const responses = await Promise.all([$instaApi.getFeed(15)]);
    const badResponse = responses.find((response) => !response.ok);

    if (badResponse) {
      const error = {
        statusCode: badResponse.status,
        message: badResponse.statusText,
      };
      return { contactPage, pageMetadata, error };
    }

    return {
      insta: responses[0].json,
      contactPage,
      pageMetadata,
    };
  },
  data() {
    return {
      name: "Home",
    };
  },
  head() {
    return {
      title: this.pageMetadata
        ? this.pageMetadata.pageTitle
          ? this.pageMetadata.pageTitle
          : this.$store.state.siteSettings.siteTitle
          ? this.$store.state.siteSettings.siteTitle
          : ""
        : this.$store.state.siteSettings.siteTitle
        ? this.$store.state.siteSettings.siteTitle
        : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageMetadata
            ? this.pageMetadata.pageDesc
              ? this.pageMetadata.pageDesc
              : this.$store.state.siteSettings.siteDescription
              ? this.$store.state.siteSettings.siteDescription
              : ""
            : this.$store.state.siteSettings.siteDescription
            ? this.$store.state.siteSettings.siteDescription
            : "",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.pageMetadata
            ? this.pageMetadata.ogImage.url
              ? this.pageMetadata.ogImage.url
              : this.$store.state.siteSettings.openGraphImage
              ? this.$store.state.siteSettings.openGraphImage.url
              : ""
            : this.$store.state.siteSettings.openGraphImage
            ? this.$store.state.siteSettings.openGraphImage.url
            : "",
        },
      ],
    };
  },
};
</script>


<style lang="scss">
.page-contact {
  .contact-intro {
    grid-column: 2 / span 5;
    margin-bottom: 30px;

    @media (max-width: $mobile-bp) {
      grid-column: 1 / span 12;
    }
  }

  .contact-form {
    grid-column: 2 / span 5;

    @media (max-width: $mobile-bp) {
      grid-column: 1 / span 12;
      grid-row: 2 / 3;
      margin-bottom: 30px;
    }
  }

  .contact-info {
    grid-column: 8 / 13;

    @media (max-width: $mobile-bp) {
      grid-column: 1 / span 12;
      grid-row: 3 / 4;
    }
  }

  // .contact-info,
  // .contact-form {
  //   > *:not(:last-child) {
  //     margin-bottom: 70px;
  //   }
  // }

  .contact-form {
    .text-wrapper {
      margin-bottom: 100px;
    }
  }

  .contact-info {
    .text-wrapper:not(:last-child) {
      margin-bottom: 70px;
    }
  }

  .contact-intro {
    h1 {
      font-size: 32px;
      line-height: 44px;
    }

    p {
      font-size: 26px;
      line-height: 34px;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 22px;
      line-height: 29px;
    }

    p + h2 {
      margin-top: 70px;
    }

    p {
      font-size: 14px;
      line-height: 18px;
    }

    .text-wrapper:last-child {
      p {
        font-size: 11px;
        line-height: 15px;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;

    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: left;

      label {
        margin-bottom: 6px;
        font-size: 14px;
        text-transform: uppercase;
      }

      & + .form-group {
        margin-top: 50px;
      }
    }
  }

  .contact-form button {
    display: flex;
  }
}

.contact {
  .insta-feed-parent {
    padding-top: 45px;
    margin-bottom: calc(20vw + 85px);

    @media (max-width: 960px) {
      margin-bottom: calc(33.33vw + 85px);
    }

    .text-wrapper {
      width: 100%;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h1,
      h2,
      h3 {
        font-family: "Reckless", serif;
        font-size: 22px;
        line-height: 24px;
        margin: 0;
      }

      button,
      a {
        text-transform: none;
      }

      p {
        font-size: 22px;
        line-height: 24px;
      }
    }
  }
}
</style>