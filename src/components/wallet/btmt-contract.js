import Web3 from 'web3'
// import { ethers } from 'ethers'

const address = '0x199B49Dbf8096ef24EFFDa1d6e8dC1242446C030'
const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, {
  anonymous: false,
  inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, {
    indexed: true,
    internalType: 'address',
    name: 'spender',
    type: 'address'
  }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
  name: 'Approve',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, {
    indexed: true,
    internalType: 'address',
    name: 'to',
    type: 'address'
  }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
  name: 'Transfer',
  type: 'event'
}, {
  inputs: [{ internalType: 'address[]', name: '_to', type: 'address[]' }, {
    internalType: 'uint256',
    name: '_value',
    type: 'uint256'
  }],
  name: 'airdrop',
  outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  inputs: [{ internalType: 'address', name: '', type: 'address' }, {
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{ internalType: 'address', name: '', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'decimals',
  outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'name',
  outputs: [{ internalType: 'string', name: '', type: 'string' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'owner',
  outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'symbol',
  outputs: [{ internalType: 'string', name: '', type: 'string' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [],
  name: 'totalSupply',
  outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{ internalType: 'address', name: '_to', type: 'address' }, {
    internalType: 'uint256',
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
  stateMutability: 'nonpayable',
  type: 'function'
}]

export default {
  getContract,
  address,
  abi
}

async function getContract (wallet) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const account = web3.eth.accounts.create()
  const tx = {
    from: '0xB99983713C7391F6c22f0D5990963b24FaA2EbC9',
    to: '0x235601Ee6a81BE89CDf6281Dd05669EE166084d6',
    chainId: web3.eth.net.getId(),
    gas: 50000,
    gasPrice: web3.utils.toWei('0.00000002', 'ether'),
    value: 100,
    gasLimit: 100000
  }
  web3.eth.accounts.signTransaction(tx, account.privateKey)
    .then(res => {
      web3.eth.sendSignedTransaction(res.rawTransaction).then(res => {
        debugger
      }).catch(e => {
        debugger
      })
    })
    .catch(e => {
      debugger
    })
  return new web3.eth.Contract(abi, address, {
    from: account.address,
    accountId: account.address
  })
}

//      https://bscscan.com/token/0x199b49dbf8096ef24effda1d6e8dc1242446c030
