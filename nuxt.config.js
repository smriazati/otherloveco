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
      { name: 'format-detection', content: 'telephone=no' }
    ],
    // script: [
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
    //   },
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"
    //   },

    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Global CSS: https://go.nuxtjs.dev/config-css
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
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/route', '~/plugins/insta.js', '~/plugins/sanity-image-builder.js',
],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
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
  // Modules: https://go.nuxtjs.dev/config-modules
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
  // Modules: https://go.nuxtjs.dev/config-modules
  env: {
    igToken: process.env.INSTAGRAM_ACCESS_TOKEN
  },
  privateRuntimeConfig: {
    igToken: process.env.INSTAGRAM_ACCESS_TOKEN
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  generate: { fallback: '404.html' },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}