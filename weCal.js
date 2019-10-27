class WeCal {
    constructor () {
      this.suitArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    }
    // 处理多重括号:类比入栈和出栈操作：以一对()为最小执行单位
    dealBracket (str) {
      while (str.indexOf(')') > 0) {
        let rightBracketIdx = str.indexOf(')')
        let strInclueBracket = str.substr(0, rightBracketIdx + 1)
        let lastLeftBracketIdx = strInclueBracket.lastIndexOf('(')
        let fragment = str.slice(lastLeftBracketIdx, rightBracketIdx + 1)
        this.dealNeedlessSign(fragment, 1)
        str = str.slice(0, lastLeftBracketIdx) + this.dealNeedlessSign(fragment, 1) + str.slice(rightBracketIdx + 1, str.length)
      }
      // 最后的表达式不带括号
      console.log(str)
      // str = this.simpleOperation(str)
      return str
    }
    // 去除多余的符号:取最后一个
    dealNeedlessSign (str, type) {
      // 去除首尾括号
      if (type === 1) {
        str = str.slice(1, str.length - 1)
      }
      let arr = str.split('')
      // 数组:符号对应下标
      let idxArr = []
      // 数组:丢弃符号下标
      let lostArr = []
      for (let idx in arr) {
        if (this.suitArr.indexOf(arr[idx]) === -1) {
          idxArr.push(idx)
        }
      }
      if (idxArr.length > 1) {
        idxArr.reduce(function (x, y) {
          if (Number(y) - Number(x) === 1) {
            lostArr.push(Number(x))
          }
          return y
        })
      }
      // 从arr中丢弃无效的符号
      lostArr.reverse().forEach(item => {
        arr.splice(item, 1)
      })
      // 将数组处理成数字，符合，数字的形式
      let signIdxArr = []
      let newArr = []
      for (let idx in arr) {
        if (this.suitArr.indexOf(arr[idx]) === -1) {
          signIdxArr.push(Number(idx))
        }
      }
      let arrStr = arr.reduce(function (x, y) { return x + y })
      for (let i = 0; i < signIdxArr.length; i++) {
        if (i === signIdxArr.length - 1) {
          let prevStr = arrStr.slice(signIdxArr[i - 1] + 1, signIdxArr[i])
          let signStr = arrStr.substr(signIdxArr[i], 1)
          let lastStr = arrStr.slice(signIdxArr[i] + 1, arrStr.length)
          newArr.push(prevStr)
          newArr.push(signStr)
          newArr.push(lastStr)
        } else {
          let joinStr = arrStr.slice(signIdxArr[i - 1] + 1, signIdxArr[i])
          let signStr = arrStr.substr(signIdxArr[i], 1)
          newArr.push(joinStr)
          newArr.push(signStr)
        }
      }
      // 计算运算和
      let resultVal = this.simpleOperation(newArr)
      return resultVal
    }
    // 简单运算:字符串加减乘除
    simpleOperation (newArr) {
      while (newArr.length >= 3) {
        // 先判断乘号分支;然后判断除号分支;然后加减
        let mulSign = newArr.indexOf('*') > 0
        let diviSign = newArr.indexOf('/') > 0
        if (mulSign) {
          // 判断是否有除号:有则判断顺序执行,无则执行乘法
          if (diviSign) {
            if (mulSign < diviSign) {
              newArr = this.doOperation(newArr, '*')
            } else { newArr = this.doOperation(newArr, '/') }
          } else {
            newArr = this.doOperation(newArr, '*')
          }
        } else {
          // 是否有除:有则执行
          if (diviSign) {
            newArr = this.doOperation(newArr, '/')
          } else {
            newArr = this.doOperation(newArr, '+')
            newArr = this.doOperation(newArr, '-')
          }
        }
      }
      return newArr[0]
    }
    // 符号运算
    doOperation (arr, sign) {
      while (arr.indexOf(sign) > 0 && arr.indexOf(sign) < (arr.length - 1)) {
        let idx = arr.indexOf(sign)
        let concatVal = ''
        if (sign === '*') {
          concatVal = Number(arr[idx - 1]) * Number(arr[idx + 1])
        }
        if (sign === '/') {
          concatVal = Number(arr[idx - 1]) / Number(arr[idx + 1])
        }
        if (sign === '+') {
          concatVal = Number(arr[idx - 1]) + Number(arr[idx + 1])
        }
        if (sign === '-') {
          concatVal = Number(arr[idx - 1]) - Number(arr[idx + 1])
        }
        arr.splice(idx - 1, 3, concatVal)
      }
      return arr
    }
  }
  let weCal = new WeCal()
  let str = '(5+(2*33//3****4)-2)+((5*6)/2+2)-23+43'
  console.log(weCal.dealBracket(str))