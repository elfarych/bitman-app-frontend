import dogsLogo from 'assets/logo.png'
import babyDogeLogo from 'src/assets/doge.png'
import dogeLogo from 'src/assets/dogecoin.png'
import elonLogo from 'src/assets/elon.png'
import dogedashLogo from 'src/assets/dogedash.png'
import busdLogo from 'src/assets/busd.png'
import usdtLogo from 'src/assets/usdt.png'
import usdcLogo from 'src/assets/usdc.png'
import tusdLogo from 'src/assets/tusd.avif'

export default [
  { name: 'DOGS', label: 'Bitman DEX native token', logo: dogsLogo },
  { name: 'USDT', label: 'Tether', logo: usdtLogo },
  { name: 'USDC', label: 'USD Coin', logo: usdcLogo },
  { name: 'BUSD', label: 'Binance USD', logo: busdLogo },
  { name: 'TUSD', label: 'TrueUSD', logo: tusdLogo },
  { name: 'DOGE', label: 'Dogecoin', logo: dogeLogo, isComingSun: true },
  { name: 'BabyDoge', label: 'Baby Doge Coin', logo: babyDogeLogo, isComingSun: true },
  { name: 'ELON', label: 'Dogelon Mars', logo: elonLogo, isComingSun: true, balance: 0 },
  { name: 'DOGEDASH', label: 'Doge Dash', logo: dogedashLogo, isComingSun: true, balance: 0 }
]
