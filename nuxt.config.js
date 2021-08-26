export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Otherlove',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    //   {
    //     rel: 'preconnect',
    //     src: "https://fonts.googleapis.com",
    //   },
    //   {
    //     rel: 'preconnect',
    //     src: "https://fonts.gstatic.com",
    //   },
    //   {
    //     rel: 'stylesheet',
    //     src: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400&display=swap",
    //     as: "style"
    //   },
    // ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}