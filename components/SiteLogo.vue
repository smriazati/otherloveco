<template>
    <span v-if="logo">
        <img :src="$urlFor(logo.url).size(400)" :alt="logo.alt">
    </span>
</template>


<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('siteSettings', {
            logo: state => state.siteLogo,
        })
    },
}

</script>
