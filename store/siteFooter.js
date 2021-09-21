
export const state = () => ({
    isLoaded: false,
    footerCol1: undefined,
    footerCol2: undefined,
    footerCol3: undefined
})

export const mutations = {

    setData(state, payload) {
        state.footerCol1 = payload.footerCol1;
        state.footerCol2 = payload.footerCol2;
        state.footerCol3 = payload.footerCol3;
        state.isLoaded = true;
    }
}
