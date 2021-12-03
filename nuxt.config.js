import { groq } from '@nuxtjs/sanity'
const ogImg = groq`*[_type == "siteSettings"][0]{"ogImg": ogImg.asset->url}`;

// require('dotenv').config()
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | Otherlove",
    title: 'Otherlove',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Otherlove is a woman-owned, independent design studio specializing in visual identities, content creation, and experiences for conscious brands ready to push boundaries.' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogImg.ogImg}?h=1200&w=640`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ]
  },
  css: [
    '~/assets/sass/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/sass/system/_colors.scss',
      '~/assets/sass/system/_typography.scss',
      '~/assets/sass/system/_spacing.scss',
      '~/assets/sass/system/_buttons.scss'
    ],
    hoistUseStatements: true  
},
  plugins: ['~/plugins/route', '~/plugins/insta.js', '~/plugins/sanity-image-builder.js',
],
  components: true,
  buildModules: ['@nuxtjs/sanity/module', '@nuxtjs/google-fonts', 'nuxt-gsap-module'],
  googleFonts: {
    families: {
      'DM Sans': {
        wght: [400, 700],
        ital: [400]
      },
      'DM Mono': {
        wght: [400],
      }
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true
    }
  },
  modules: ['@nuxtjs/robots', '@nuxtjs/style-resources'],
  robots: [
    {
      UserAgent: '*',
      Disallow: '/admin'
    },
    {
      UserAgent: '*',
      Disallow: '/archive'
    }
  ],
  env: {
    igToken: process.env.INSTAGRAM_ACCESS_TOKEN
  },
  privateRuntimeConfig: {
    igToken: process.env.INSTAGRAM_ACCESS_TOKEN
  },
  generate: { fallback: '404.html' },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}