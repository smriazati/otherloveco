<template>
    <div class="admin-home">
        <nav>
            <h2>Admin pages</h2>
            <insta-auth-code-refresh-button></insta-auth-code-refresh-button>
            <!-- <ul>
                <li><nuxt-link to="/admin/instagram-token/">Renew Instagram token</nuxt-link></li>
            </ul> -->
        </nav>
    </div>
</template>

<script>
import InstaAuthCodeRefreshButton from '../../components/InstaAuthCodeRefreshButton.vue'

export default {
  components: { InstaAuthCodeRefreshButton },
    layout: 'admin',
    data() {
        return {

        }
    },
}
</script>

