
function getChainName (id) {
  switch (id) {
    case '0x1':
      return 'Ethereum'

    case '0x38':
      return 'Binance Smart Chain'

    default:
      return 'Chain'
  }
}

export function mutationChainId (state, data) {
  state.chainId = data
}

function getChainNativeCoin (chainId) {
  switch (chainId) {
    case '0x1':
      return 'ETH'

    case '0x38':
      return 'BNB'

    default:
      return 'Coin'
  }
}

export function mutationWallet (state, data) {
  state.wallet = {
    ...state.wallet,
    ...data
  }
  if (data.chainId) {
    state.wallet.chainName = getChainName(data.chainId)
    state.wallet.coinName = getChainNativeCoin(data.chainId)
  }
}

export function mutationdbWallet (state, data) {
  state.dbWallet = data
}

export function mutationSwapLoading (state, data) {
  state.swapLoading = data
}

export function mutationBusdBalance (state, data) {
  if (data) state.busdBalance = data / 10 ** 18
}

export function mutationUsdcBalance (state, data) {
  if (data) state.usdcBalance = data / 10 ** 18
}

export function mutationTusdBalance (state, data) {
  if (data) state.tusdBalance = data / 10 ** 18
}

export function mutationUsdtBalance (state, data) {
  if (data) state.usdtBalance = data / 10 ** 18
}

export function mutationBnbBalance (state, data) {
  state.bnbBalance = data
}

export function mutationBabyDogeBalance (state, data) {
  state.dogeBalance = data / 10 ** 8
}

export function mutationDogsPrice (state, data) {
  state.dogsPrice = parseFloat(data.a)
}

export function mutationDogsBalance (state, data) {
  state.dogsBalance = Number(data) / 10 ** 8
}

export function mutationDefaultWallet (state) {
  state.busdBalance = null
  state.usdcBalance = null
  state.usdtBalance = null
  state.provider = null
  state.swapLoading = false
  state.wallet = {
    address: null,
    chainId: null,
    balance: null,
    coinName: '',
    btmtBalance: null
  }
  state.dbWallet = null

  state.gameWallet = {
    rawBalance: null,
    balance: null,
    workBalance: null,
    formattedWorkBalance: null
  }
}

export function mutationDefaultSwapCoin (state) {
  let coin = 'USDT'
  if (state.busdBalance > state.usdtBalance) coin = 'BUSD'
  if (state.usdcBalance > state.usdtBalance && state.usdcBalance > state.busdBalance) coin = 'USDC'
  if (state.tusdBalance > state.usdtBalance && state.tusdBalance > state.busdBalance && state.tusdBalance > state.usdcBalance) coin = 'TUSD'

  state.defaultSwapCoin = coin
}
