// 处理所有tickStrategy的json，筛选比较出优质策略
const strategy = require('./strategy')
const timeConfig = require('./timeConfig')
const util = require('../common/util')
const fs = require('fs')
const { resolve } = require('path')


// 第一步：寻找出符合strategy的策略
const firstStep = true
// 第二步:拼合所有优质策略,去聚宽回测
const secondStep = false
let timeStart = util.newTimeStamp()
if (firstStep) {
    const promiseArr = []
    for (const codeName in timeConfig.mainCodeList) {
        const days = timeConfig.mainCodeList[codeName]
        for (var k = 0; k < days.length; k++) {
            const url = '../../public/static/data/' + codeName + '.' + days[k] + '.json'
            const codeNameArr = codeName.split('.')
            promiseArr.push(
                new Promise((resolve, reject) => {
                    fs.readFile(url, 'utf8', function (err, data) {
                        if (err) {
                            reject(err)
                        }
                        let wrapObj = dealResData(data, codeNameArr)
                        resolve(wrapObj)
                    })
                })
            )
        }
    }
    Promise.all(promiseArr).then(function (res) {
        let fnType = 'no_fn'
        // let resData =  guess(res, fnType)
        let resData = res
        // 将结果写入tickStrategy.json
        fs.writeFile('../../public/static/tickStrategy.' + fnType + '.json', JSON.stringify(resData), 'utf8', function(err) {
            if (err) {
                console.log('写文件出错, 错误是:' + err)
            } else {
                console.log('成功')
            }
        })
    })
}

if (secondStep) {
    // 回报在10%以上的策略
    const goodFn = ['fn_3', 'fn_7', 'fn_8', 'fn_9', 'fn_11', 'fn_14']
    const promiseArr = []
    for (var k = 0; k < goodFn.length; k++) {
        const url = '../../public/static/tickStrategy.' + goodFn[k] + '.json'
        // console.log(url)
        promiseArr.push(
            new Promise((resolve, reject) => {
                fs.readFile(url, 'utf8', function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    resolve(data)
                })
            })
        )
    }
    Promise.all(promiseArr).then(function (res) {
        let newArr = []
        for (let i = 0; i < res.length; i++) {
            newArr.push(...JSON.parse(res[i]))
        }
        // 将结果写入tickStrategyTotal.json
        fs.writeFile('../../public/static/tickStrategyTotal.json', JSON.stringify(newArr), 'utf8', function(err) {
            if (err) {
                console.log('写文件出错, 错误是:' + err)
            } else {
                console.log('成功')
            }
        })
    })
}


// 处理res
function dealResData (response, codeNameArr) {
    const res = JSON.parse(response)
    // 可以抓取tick移动到某个价位，成交量突然放大
    // tick说明 @amount:成交额, @ask_price1:卖一价, @ask_volume1:卖一量,
    // @bid_price1:买一价, @bid_volume1: 买一量, @heigest:当日最高价, @last_price: 最新价
    // @lowest: 当日最低价, @open_interest:持仓量, @volume:成交量
    let askObj = { volume1: 0, volume2: 0, volume3: 0, volume4: 0 }
    let bidObj = { volume1: 0, volume2: 0, volume3: 0, volume4: 0 }
    let volumeObj = { volume1: 0, volume2: 0, volume3: 0, volume4: 0 }
    const currentDate = (res[0].datetime).split(' ')[0]
    const timeObj = util.joinFixedTime(currentDate, timeConfig.timeCut)
    for (let i = 0; i < res.length; i++) {
        const resObj = res[i]
        const tempObjSecond = util.newTimeStamp(resObj.datetime)
        // 时间段09:00-10:00
        if (timeObj.time1Start < tempObjSecond && timeObj.time1End > tempObjSecond) {
        askObj.volume1 += Number(resObj[codeNameArr[0]][codeNameArr[1]].ask_volume1)
        bidObj.volume1 += Number(resObj[codeNameArr[0]][codeNameArr[1]].bid_volume1)
        volumeObj.volume1 += Number(resObj[codeNameArr[0]][codeNameArr[1]].volume)
        }
        // 时间段10:00-11:00
        if (timeObj.time2Start < tempObjSecond && timeObj.time2End > tempObjSecond) {
        askObj.volume2 += Number(resObj[codeNameArr[0]][codeNameArr[1]].ask_volume1)
        bidObj.volume2 += Number(resObj[codeNameArr[0]][codeNameArr[1]].bid_volume1)
        volumeObj.volume2 += Number(resObj[codeNameArr[0]][codeNameArr[1]].volume)
        }
        // 时间段11:00-14:00
        if (timeObj.time3Start < tempObjSecond && timeObj.time3End > tempObjSecond) {
        askObj.volume3 += Number(resObj[codeNameArr[0]][codeNameArr[1]].ask_volume1)
        bidObj.volume3 += Number(resObj[codeNameArr[0]][codeNameArr[1]].bid_volume1)
        volumeObj.volume3 += Number(resObj[codeNameArr[0]][codeNameArr[1]].volume)
        }
        // 时间段14:00-15:00
        if (timeObj.time4Start < tempObjSecond && timeObj.time4End > tempObjSecond) {
        askObj.volume4 += Number(resObj[codeNameArr[0]][codeNameArr[1]].ask_volume1)
        bidObj.volume4 += Number(resObj[codeNameArr[0]][codeNameArr[1]].bid_volume1)
        volumeObj.volume4 += Number(resObj[codeNameArr[0]][codeNameArr[1]].volume)
        }
    }
    askObj = util.calAskBidPercent(askObj)
    bidObj = util.calAskBidPercent(bidObj)
    volumeObj = util.calAskBidPercent(volumeObj)
    const compareResult = util.compareAskBid(askObj, bidObj)
    const dateAndCode = currentDate + '.' + codeNameArr[1]
    const wrapObj = { dateAndCode, volumeObj, askObj, bidObj, compareResult }
    return wrapObj
}

// 哥德巴赫猜想
function guess (arr, fnType) {
    const that = this
    const newArr = strategy[fnType](arr)
    let timeEnd = util.newTimeStamp()
    let testTime = (timeEnd - timeStart) / 1000
    console.log('回测所用时间:' + testTime + 's')
    return newArr
}
// 多个猜想
function  guseemany (arr) {
    const newArr = []
    goodFn.forEach(type => {
      newArr.push(...strategy[type](arr))
    })
    newArr.sort(function (a, b) { return util.newTimeStamp(a.date) - util.newTimeStamp(b.date) })
    // // 回测为负,说明相同的盈利部分被筛选出去了
    return newArr
    // console.log(JSON.stringify(newArr))
}