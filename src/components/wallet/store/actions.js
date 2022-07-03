import axios from 'axios'
import Web3 from 'web3'
import { Notify } from 'quasar'

import server from 'src/config'
import btmtContract from 'components/wallet/btmt-contract'
import busdContract from 'components/wallet/busd-contract'

const { ethereum } = window

export async function connectWallet ({ commit, dispatch }) {
  if (ethereum) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts.length > 0) {
      commit('mutationWallet', { address: accounts[0], chainId: ethereum.chainId })
      commit('mutationSwapLoading', true)

      ethereum.on('chainChanged', async () => {
        commit('mutationSwapLoading', true)
        try {
          await dispatch('getBalance')
          await dispatch('getBTMTBalance')
        } catch (e) {
          console.log(e)
        } finally {
          commit('mutationSwapLoading', false)
        }
      })

      await dispatch('getWalletFromDB', accounts[0])
      await dispatch('getBalance')
      await dispatch('getBTMTBalance')

      commit('mutationSwapLoading', false)
    }
  } else {
    Notify.create({
      message: 'Please open this website in metamask app or on your desktop.',
      position: 'top'
    })
  }
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

export async function createWallet ({ commit, dispatch }, address) {
  try {
    await axios.post(`${server.walletServerURI}/wallet/wallet/`, {
      address
    }).then(res => {
      dispatch('getWalletFromDB', address)
    })
  } catch (e) {

  }
}

export async function getBalance ({ commit, state }) {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

  web3.eth.getBalance(state.wallet.address).then(rawBalance => {
    const balance = (rawBalance / 1000000000000000000).toFixed(4)
    commit('mutationWallet', {
      balance
    })
  })
}

export async function getBTMTBalance ({ commit, dispatch, state }) {
  const contract = await btmtContract.getContract()

  contract.methods.balanceOf(state.wallet.address)
    .call()
    .then(balance => {
      commit('mutationWallet', {
        btmtBalance: parseInt(balance) / 10000
      })
    })
    .catch(e => console.log(e))
}

export async function getAirDrop ({ commit, dispatch, state }) {
  const contract = await btmtContract.getContract()

  contract.methods.transfer(state.wallet.address, '19500000')
    .send()
    .then(status => {
      dispatch('getBTMTBalance')
    })
    .catch(e => console.log(e))
}

export async function swapBtmtToken ({ commit, dispatch, state }) {
  commit('mutationSwapLoading', true)
  await busdContract.approve(state.wallet.address, commit('mutationSwapLoading', false))
}

export function chainChanged ({ commit }, chainId) {
  commit('mutationWallet', { chainId: chainId })
}
