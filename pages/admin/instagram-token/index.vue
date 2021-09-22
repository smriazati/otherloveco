<template>
    <div>
        <section>
            <div class="text-wrapper">
                <h2>Instructions</h2>
                <ol>
                    <li>Click button below and log in to your Instagram account. Click "Allow"</li>
                    <li>You will be automatically redirected back to this site, where you will then be able to access your temporary authorization code*. Share this temporary auth code with your site admin.</li>
                </ol>
                <p>*Note: Authorization Codes are short-lived and are only valid for 1 hour.</p>
                <button>
                    <a :href="`https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`">Click here to get new token</a>
                </button>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    layout: "admin",
    data() {
        return {
            appId: process.env.igAppId,
            redirectUrl: process.env.igAppRedirect
        }
    }
}
</script>
