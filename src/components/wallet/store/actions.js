import axios from 'axios'
import Web3 from 'web3'

import server from 'src/config'
import btmtContract from 'components/wallet/btmt-contract'
import busdContract from 'components/wallet/busd-contract'

// const { ethereum } = window

export async function setWallet ({ commit, dispatch }, connectedWallet) {
  const wallet = connectedWallet[0]

  commit('mutationWallet', { address: wallet.accounts?.[0]?.address, chainId: null })

  await dispatch('getWalletFromDB', wallet?.accounts?.[0]?.address)
  await dispatch('getBalance')
  await dispatch('getBTMTBalance')
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
  const contract = await btmtContract.getContract(state.wallet)
  const tx = contract.methods.balanceOf(state.wallet.address)

  tx.call({ from: state.wallet.address, gas: await tx.estimateGas() })
    .then(balance => {
      commit('mutationWallet', {
        btmtBalance: parseInt(balance) / 10000
      })
    })
    .catch(e => console.log(e))
}

export async function getAirDrop ({ commit, dispatch, state }) {
  const contract = await btmtContract.getContract(state.wallet)
  const tx = contract.methods.transfer(state.wallet.address, '19500000')

  tx.send({ gasLimit: 100000, gas: await tx.estimateGas() })
    .then(status => {
      debugger
      dispatch('getBTMTBalance')
    })
    .catch(e => {
      debugger
      console.log(e)
    })

  contract.methods.transfer(state.wallet.address, '19500000')
    .send({ from: state.wallet.address, gasLimit: 100000 })
}

export async function swapBtmtToken ({ commit, dispatch, state }) {
  await busdContract.approve(state.wallet.address)
}

export function chainChanged ({ commit }, chainId) {
  commit('mutationWallet', { chainId: chainId })
}
