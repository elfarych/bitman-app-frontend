export default function () {
  return {
    provider: null,
    swapLoading: false,
    wallet: {
      address: null,
      chainId: null,
      balance: null,
      coinName: '',
      btmtBalance: null,
      provider: {}
    },
    dbWallet: null
  }
}
