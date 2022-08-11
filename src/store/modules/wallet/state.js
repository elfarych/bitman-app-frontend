export default function () {
  return {
    busdBalance: null,
    usdcBalance: null,
    usdtBalance: null,
    tusdBalance: null,
    provider: null,
    swapLoading: false,
    dogeBalance: null,
    dogsBalance: null,
    dogsPrice: 0.07,
    defaultSwapCoin: 'USDT',
    defaultCoin: null,
    chainId: null,
    wallet: {
      address: null,
      balance: null,
      coinName: '',
      btmtBalance: null
    },
    dbWallet: null,

    bnbBalance: {
      rawBalance: null,
      balance: null,
      workBalance: null,
      formattedWorkBalance: null
    }
  }
}
