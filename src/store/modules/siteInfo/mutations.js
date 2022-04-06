export function mutationSlides (state, data) {
  state.slides = data
}

export function mutationRoadmap (state, data) {
  state.roadmap = data
}

export function mutationSiteInfo (state, data) {
  state.siteInfo = data[0] || {}
}

export function mutationDonateWallets (state, data) {
  state.donateWallets = data
}
