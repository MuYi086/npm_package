// 封装交易策略的对象
const strategy = {
  commonBuySellType (arr, status, type) {
    const newArr = []
    for (let i = 0; i < arr.length - 1; i++) {
      const todayObj = arr[i]
      const tomorrowObj = arr[i + 1]
      if (todayObj.compareResult.join('') === status) {
        const date = tomorrowObj.dateAndCode.split('.')[0]
        const action = type
        newArr.push({ date, action })
      }
    }
    return newArr
  },
  // 每日第一阶段成交萎靡时，隔日反向操作
  fn_1 (arr) {
    const newArr = []
    for (let i = 0; i < arr.length - 1; i++) {
      const todayObj = arr[i]
      const tomorrowObj = arr[i + 1]
      if (Number(todayObj.volumeObj.volume1) < 0.1000) {
        const date = tomorrowObj.dateAndCode.split('.')[0]
        const action = todayObj.compareResult[0] === '买' ? '卖' : '买'
        newArr.push({ date, action })
      }
    }
    return newArr
  },
  // 每日后俩个阶段成交方向相同时，判断与平均水平的比较，假定买多还是买少，隔日反向操作
  // fn_2 --- fn_16 简单比较1小时内买卖盘比例
  // 买买卖卖
  fn_2 (arr) {
    console.log(2)
    return this.commonBuySellType(arr, '买买卖卖', '买')
  },
  // 卖卖买买
  fn_3 (arr) {
    console.log(3)
    return this.commonBuySellType(arr, '卖卖买买', '卖')
  },
  // 卖买卖卖
  fn_5 (arr) {
    console.log(5)
    return this.commonBuySellType(arr, '卖买卖卖', '买')
  },
  // 卖卖买卖
  fn_6 (arr) {
    console.log(6)
    return this.commonBuySellType(arr, '卖卖买卖', '卖')
  },
  // 卖卖卖买
  fn_7 (arr) {
    console.log(7)
    return this.commonBuySellType(arr, '卖卖卖买', '卖')
  },
  // 买卖卖卖
  fn_8 (arr) {
    console.log(8)
    return this.commonBuySellType(arr, '买卖卖卖', '卖')
  },
  // 买买买卖
  fn_9 (arr) {
    console.log(9)
    return this.commonBuySellType(arr, '买买买卖', '买')
  },
  // 买买卖买
  fn_10 (arr) {
    console.log(10)
    return this.commonBuySellType(arr, '买买卖买', '卖')
  },
  // 买卖买买
  fn_11 (arr) {
    console.log(11)
    return this.commonBuySellType(arr, '买卖买买', '卖')
  },
  // 卖买买买
  fn_12 (arr) {
    console.log(12)
    return this.commonBuySellType(arr, '卖买买买', '卖')
  },
  // 买卖买卖
  fn_13 (arr) {
    console.log(13)
    return this.commonBuySellType(arr, '买卖买卖', '买')
  },
  // 买卖卖买
  fn_14 (arr) {
    console.log(14)
    return this.commonBuySellType(arr, '买卖卖买', '卖')
  },
  // 卖买买卖
  fn_15 (arr) {
    console.log(15)
    return this.commonBuySellType(arr, '卖买买卖', '买')
  },
  // 卖买卖买
  fn_16 (arr) {
    console.log(16)
    return this.commonBuySellType(arr, '卖买卖买', '卖')
  }
}
module.exports = strategy
