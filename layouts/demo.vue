<template>
  <div class="layout-container layout-demo">
    <nuxt />
  </div>
</template>

<script>

export default {
  head () {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
