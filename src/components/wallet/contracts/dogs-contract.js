import Web3 from 'web3'
import { getMyConnectedWallet } from 'src/store/modules/wallet/actions'

const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approve', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { inputs: [{ internalType: 'address[]', name: '_to', type: 'address[]' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'airdrop', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address[]', name: 'addrs', type: 'address[]' }], name: 'todrop', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }]
const address = '0x5874Aaa96C7fFe803170b2cFB1657e4Be13cA4a5'

const robstenAbi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approve', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { inputs: [{ internalType: 'address[]', name: '_to', type: 'address[]' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'airdrop', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address[]', name: 'addrs', type: 'address[]' }], name: 'todrop', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }]
const robstenAddress = '0x33d4d4496B39382884306b09a28b8938c63b1fEE'

async function airdrop (clientAddress, chainId) {
  const web3 = chainId === 56 ? new Web3('https://bsc-dataseed1.binance.org:443') : new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/41ad9ed3e14d4eb8817675f8d48fe96b'))
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const contract = getContract(chainId)
  const coinContract = new web3.eth.Contract(contract.abi, contract.address, {
    from: clientAddress
  })

  return coinContract.methods.airdrop([clientAddress], '350000000000').send({ from: clientAddress, gasLimit: 100000 })
    .then(async res => {
    })
    .catch(e => {
      console.log(e)
    })
}

async function getBalance (clientAddress, chainId) {
  const web3 = chainId === 56 ? new Web3('https://bsc-dataseed1.binance.org:443') : new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/41ad9ed3e14d4eb8817675f8d48fe96b'))
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const contract = getContract(chainId)
  const coinContract = new web3.eth.Contract(contract.abi, contract.address, {
    from: clientAddress
  })

  return await coinContract.methods.balanceOf(clientAddress).call()
}

function getContract (chainId) {
  if (chainId === 56) {
    return { abi, address }
  } else if (chainId === 3) {
    return { abi: robstenAbi, address: robstenAddress }
  }
  return { abi: robstenAbi, address: robstenAddress }
}

export default {
  getBalance,
  airdrop
}
