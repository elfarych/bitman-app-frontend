export function mutationVix (state, data) {
  state.vix = data
}

export function mutationLiquidity (state, data) {
  state.liquidity = data
}

export function mutationOpenInterest (state, data) {
  state.openInterest = data
}

export function mutationCashFlow (state, data) {
  state.cashFlow = data
}
export function mutationHodlers (state, data) {
  state.hodlers = data
}

export function mutationVixWeekData (state, data) {
  const vixData = []
  const timeArr = data[0]?.data || []
  const btcArr = data[1]?.data || []
  const vixArr = data[2]?.data || []

  timeArr.forEach((item, index) => {
    const vixDataItem = {}
    vixDataItem.time = item?.[0]
    vixDataItem.btcValue = btcArr[index]?.[0]
    vixDataItem.vixValue = vixArr[index]?.[0]
    vixData.push(vixDataItem)
  })
  state.weekVixData = vixData
}
