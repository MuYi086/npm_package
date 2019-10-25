class WeCal {
    constructor () {
        this.suitArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    }
    // 处理多重括号:类比入栈和出栈操作：以一对()为最小执行单位
    dealBracket (str) {
        while (str.indexOf(')') > 0) {
            let right_Bracket_Idx = str.indexOf(')')
            let str_inclue_Bracket = str.substr(0, right_Bracket_Idx + 1)
            let last_left_Bracket_Idx = str_inclue_Bracket.lastIndexOf('(')
            let fragment = str.slice(last_left_Bracket_Idx, right_Bracket_Idx + 1)
            str = str.slice(0, last_left_Bracket_Idx) + this.dealNeedlessSign(fragment) + str.slice(right_Bracket_Idx + 1, str.length)
        }
        return str
    }
     // 去除多余的符号:取最后一个
     dealNeedlessSign (str) {
        // 去除首尾括号
        str = str.slice(1, str.length - 1)
        let arr = str.split('')
        // 数组:符号对应下标
        let idxArr = []
        // 数组:丢弃符号下标
        let lostArr = []
        for (let idx in arr) {
          if (this.suitArr.indexOf(arr[idx]) == -1) {
            idxArr.push(idx)
          }
        }
        if (idxArr.length > 1) {
          idxArr.reduce(function (x, y) {
            if (Number(y) - Number(x) == 1) {
              lostArr.push(Number(x))
            }
            return y
          })
        }
        // 从arr中丢弃无效的符号
        lostArr.reverse().forEach(item => {
          arr.splice(item, 1)
        })
        // 计算运算和
        let resultVal = this.simpleOperation(arr)
        return resultVal
    }
    // 简单运算:字符串加减乘除
    simpleOperation (arr) {
        // 将数组拼合成可以执行逻辑运算的结构
        let concatNum = ''
        let newArr = []
        for (let idx in arr) {
            if (this.suitArr.indexOf(arr[idx]) == -1) {
                newArr.push(concatNum)
                newArr.push(arr[idx])
                concatNum = ''
            } else {
                concatNum += arr[idx]
                if (idx == arr.length - 1) {
                    newArr.push(concatNum)
                }
            }
        }
        // 计算乘法
        let multiPlication_Arr = this.doOperation(newArr, '*')
        // 计算除法
        let division_Arr = this.doOperation(multiPlication_Arr, '/')
        // 计算加法
        let addition_arr = this.doOperation(division_Arr, '+')
        // 计算减法
        let subtraction_arr = this.doOperation(addition_arr, '-')
        return subtraction_arr[0]
    }
    // 符号运算
    doOperation (arr, sign) {
        while (arr.indexOf(sign) > 0 && arr.indexOf(sign) < (arr.length - 1)) {
            let idx = arr.indexOf(sign)
            let concatVal = ''
            if (sign == '*') {
                concatVal = arr[idx - 1] * arr[idx + 1]
            }
            if (sign == '/') {
                concatVal = arr[idx - 1] / arr[idx + 1]
            }
            if (sign == '+') {
                concatVal = arr[idx - 1] + arr[idx + 1]
            }
            if (sign == '-') {
                concatVal = arr[idx - 1] - arr[idx + 1]
            }
            arr.splice(idx - 1, 3, concatVal)
        }
        return arr
    }
}