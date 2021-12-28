import PicoSanity from 'picosanity'
import imageUrlBuilder from '@sanity/image-url'

// Config data for Sanity Client in Nuxt Config
const sanity = PicoSanity({
  projectId: '21sfy6kc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2021-05-28',
  withCredentials: true
})
export { sanity }


const builder = imageUrlBuilder(sanity)
const urlFor = (source) => builder.image(source).auto('format')

export default (_, inject) => {
  inject('urlFor', urlFor)
}