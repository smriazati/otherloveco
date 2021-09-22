<template>
    <div>
        <section>
            <div v-if="authCode">
                <div class="text-wrapper">
                    
                    <h2>You have received an authorization code</h2>
                    <p>Click this button.. the email is all ready for you!</p>
                    <button>
                        <a :href="`mailto:hello@otherlove.co?subject=Instagram%20Auth%20Code&body=${authCode}`">Email the admin</a>
                    </button>
                    <p>Or, copy / paste the authorization code and email to your site admin:</p>
                    <code>{{ authCode }}</code>
                    <p>Or, DIY Instructions here</p>
                    <ol>
                        <li>Open Netlify environmental variables, and find your <strong>  IG_APP_ID, IG_APP_SECRET, IG_APP_REDIRECT</strong> values.</li>
                        <li>Using Terminal, make a curl request (see below for formula). Make sure to replace the 4 items within {}. For example: 
                            <ol>
                                <li>{app-id}: IG_APP_ID</li>
                                <li>{app-secret}: IG_APP_SECRET</li>
                                <li>{redirect-uri}: IG_APP_REDIRECT</li>
                                <li>{code}: {{ authCode}}</li>
                            </ol>
                        </li>
                        <li>In Netlify environmental variables, replace the <strong> IG_ACCESS_CODE</strong> with the refreshed access code you received with your CURL request!</li>
                    </ol>
                    <code>curl -X POST \
                    https://api.instagram.com/oauth/access_token \
                    -F client_id={app-id} \
                    -F client_secret={app-secret} \
                    -F grant_type=authorization_code \
                    -F redirect_uri={redirect-uri} \
                    -F code={code}</code>
                </div>
            </div>
            <div v-else>
                <div class="text-wrapper">
                    <h2>Oops, you've landed on this page but haven't been redirected from instagram.</h2>
                    <p>Perhaps you want to go here instead?</p>
                    <button><nuxt-link to="/">Go to home page</nuxt-link></button>
                    <button><nuxt-link to="/admin">Go to admin page</nuxt-link></button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    layout: 'admin',
    data() {
        return {

        }
    },
    computed: {
        authCode() {
            if (!this.$route.fullPath.includes('?code=')) {
                return false;
            }
            const route = this.$route.fullPath;
            const codeMessy = route.split('?code=')[1];
            const codeClean = codeMessy.split('#_')[0];
            return codeClean;
        }
    }
}
</script>
