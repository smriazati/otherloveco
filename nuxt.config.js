import { groq } from "@nuxtjs/sanity";
import { sanity } from './plugins/sanity'
const query = groq`*[_type == "siteSettings"][0]{
  "favicon": favicon.image.asset->url,
  "ogImg": {
       "url": ogImg.image.asset->url,
       "alt": ogImg.image.alt
   }
}`;
const dynamicRouteQuery = groq`*[_type == "projects"]{'slug':slug.current}`;
// require('dotenv').config()

export default async () => {
  const siteSettings = await sanity.fetch(query);
console.log(siteSettings);
return {
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
        content: `${siteSettings?.ogImg?.url}?h=1200&w=640`
      },
      { hid: 'og:image:alt', property: 'og:image:alt',  content: `${siteSettings?.ogImg?.alt}`}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${siteSettings?.favicon}` },
    ]
  },
  css: [
    '~/assets/sass/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/sass/system/_colors.scss',
      '~/assets/sass/system/_typography.scss',
      '~/assets/sass/system/_layout.scss',
      '~/assets/sass/system/_buttons.scss'
    ],
    hoistUseStatements: true  
},
  plugins: ['~/plugins/route', '~/plugins/insta.js', '~/plugins/sanity.js','~/plugins/preview.client.js'
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
  generate: {
    fallback: '404.html',
    async routes() {
      const projects = (await sanity.fetch(dynamicRouteQuery)) || []
      return projects.map((project) => {
        return {
          route: `/work/${project.slug}/`,
          payload: project,
        }
      })
    }
  },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}}