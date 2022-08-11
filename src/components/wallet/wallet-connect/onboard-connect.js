import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import appIcon from 'src/assets/app-logo.jpg'
const MAINNET_RPC_URL = 'https://bsc-dataseed1.binance.org:443'
const ETH_MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/41ad9ed3e14d4eb8817675f8d48fe96b'

const injected = injectedModule()

const walletConnect = walletConnectModule({
  connectFirstChainId: true
})

const onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: ETH_MAINNET_RPC_URL
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Smart Chain',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'CoinDEX',
    icon: appIcon,
    description: 'Bitman DEX wallet connect',
    gettingStartedGuide: 'Connect your wallet'
  },
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'Connect your wallet'
        }
      }
    }
  }
})

export default onboard
