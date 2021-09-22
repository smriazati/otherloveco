<template>
    <button>
        <a :href="`https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`">Click here to get new token</a>
    </button>
</template>


<script>

export default {
    data() {
        return {
            appId: process.env.igAppId,
            redirectUrl: process.env.igAppRedirect
        }
    }
}
</script>
