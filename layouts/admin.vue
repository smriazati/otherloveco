<template>
  <div class="layout-container layout-admin">
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
<style lang="scss">
.layout-admin {
    max-width: 1080px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1080px) {
      max-width: 90%;
    }
    .text-wrapper {
      > * {
        margin-bottom: 30px;
      }
    }
}
</style>