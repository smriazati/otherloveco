export default ({ app, store }) => {
    // Every time the route changes (fired on initialization too)
    app.router.beforeEach((to, from, next) => {
        // if (app.store.state.helpful.bodyBg !== app.store.state.helpful.baseBg) {
        //     app.store.commit('helpful/resetBodyBg');
        // }
console.log(store.state.auth.isAuthenticated);
        // if (!this.$store.state.auth.isAuthenticated) {
        //     if (!hasPermissionsNeeded(to)) {
        //         next('/page-to-show-for-no-permission');
        //     } else {
        //         next();
        //     }
        //     } else {
        //     next('/page-to-show-for-unauthenticated-users');
        // }
        next()
    })
}

