<template>
    <span v-if="submark">
        <img :src="$urlFor(submark.url).size(100)" :alt="submark.alt">
    </span>
</template>


<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('siteSettings', {
            submark: state => state.favicon,
        })
    },
}

</script>
