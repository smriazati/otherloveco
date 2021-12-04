// import branches from "~/static/media/4/branches.json";


export const state = () => ({
    windowHeight: null,
    windowWidth: null,
    bodyBg: '#F7F7F7',
    baseBg: '#F7F7F7'
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
