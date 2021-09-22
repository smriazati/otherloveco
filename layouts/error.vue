<template>
    <div class="container-404">
        <div class="text-wrapper">
            <h1 v-if="error.statusCode === 404">This page doesn't exist</h1>
            <h1 v-else>An error occurred</h1>
            <p>View <nuxt-link to='/work'>our work</nuxt-link> instead or <nuxt-link to='/contact'>say hi</nuxt-link>.</p>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'home',
    name: "Error",
    mounted() {
        console.log('ERROR', this.error)
    }
  }
</script>

<style lang="scss">

.container-404 {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-family: 'Reckless', serif;
        font-size: 66px;
        line-height: 71px;
    }
    p {
        font-size: 32px;
        line-height: 44px;
        a {
            color: #fff;
            border-bottom: 1px solid #fff;
            transition: 0.3s ease all;
            &:hover {
                color: #F18E71;
                border-color: #F18E71;
            }
        }
    }
}
</style>