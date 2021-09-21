
export const state = () => ({
    isLoaded: false,
    siteLogo: undefined,
    openGraphImage: undefined,
    favicon: undefined,
    appleTouchIcon: undefined,
    siteDescription: undefined,
    siteTitle: undefined
})

export const mutations = {

    setData(state, payload) {
        state.siteLogo = payload.siteLogo;
        state.siteDescription = payload.siteDesc;
        state.siteTitle = payload.siteTitle;
        state.openGraphImage = payload.ogImg;
        state.favicon = payload.favicon;
        state.isLoaded = true;
    }
}
