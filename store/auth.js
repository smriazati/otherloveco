
export const state = () => ({
    isAuthenticated: false,
})

export const mutations = {

    setAuth(state, payload) {
        state.isAuthenticated = payload;
    }
}
