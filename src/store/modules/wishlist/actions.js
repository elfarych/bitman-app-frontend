
export function init ({ state, dispatch, commit }) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
  commit('mutationWishlist', wishlist)
}

export function addToWishList ({ state, commit }, symbol) {
  const wishlist = [...state.wishlist]

  if (wishlist.includes(symbol)) {
    const index = wishlist.indexOf(symbol)
    wishlist.splice(index, 1)
  } else {
    wishlist.push(symbol)
  }

  commit('mutationWishlist', wishlist)
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}
