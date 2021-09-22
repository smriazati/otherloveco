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
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/route', '~/plugins/init_gtag.client', '~/plugins/insta.js', '~/plugins/sanity-image-builder.js',
],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/sanity/module', '@nuxtjs/google-fonts'],
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
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/robots'],
  robots: [
    {
      UserAgent: '*',
      Disallow: '/admin'
    },
    {
      UserAgent: '*',
      Disallow: '/demo'
    },
    {
      UserAgent: '*',
      Disallow: '/siteinprog'
    },
    {
      UserAgent: '*',
      Disallow: '/old'
    }
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  env: {
    gtagId: process.env.GTAG_ID,
    igToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    igAppId: process.env.IG_APP_ID,
    igAppSecret: process.env.IG_APP_SECRET,
    igAppRedirect: process.env.IG_APP_REDIRECT
  },
  privateRuntimeConfig: {
    gtagId: process.env.GTAG_ID,
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