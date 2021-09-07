// import branches from "~/static/media/4/branches.json";


export const state = () => ({
    windowHeight: null,
    windowWidth: null,
    bodyBg: '#fff',
    baseBg: '#fff'
})

export const mutations = {

    setWindow(state, payload) {
        state.windowHeight = payload.height;
        state.windowWidth = payload.width;
    },
    setBodyBg(state, payload) {
        state.bodyBg = payload;
    },
    resetBodyBg(state) {
        state.bodyBg = state.baseBg;
    }
}
