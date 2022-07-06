import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/41ad9ed3e14d4eb8817675f8d48fe96b'

const injected = injectedModule()
const walletConnect = walletConnectModule()

const onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x56',
      token: 'BNB',
      label: 'Smart Chain',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    description: 'My app using Onboard'
  }
})

export default onboard
