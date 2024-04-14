// 处理tick,生成满足strategy的json
const csv = require('csvtojson')
const util = require('./util')
const timeConfig = require('./timeConfig')
var fs = require('fs')

for (let codeName in timeConfig.nodeMainCodeList) {
    let csvFilePath = '../../public/static/data/' + codeName + '.csv'
    let days = timeConfig.nodeMainCodeList[codeName]
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        for (let m = 0; m < days.length; m++) {
            let item = days[m]
            let startDate = item + ' 08:59'
            let endDate = item + ' 15:01'
            let startSecond = util.newTimeStamp(startDate)
            let endSecond = util.newTimeStamp(endDate)
            let wholeArr = []
            for (let i = 0; i < jsonObj.length; i++) {
                let tempObj = jsonObj[i]
                let tempSecond = util.newTimeStamp(tempObj.datetime)
                if (tempSecond > startSecond && tempSecond < endSecond) {
                    wholeArr.push(tempObj)
                }
            }
            fs.writeFile('../../public/static/data/' + codeName + '.' + item + '.json', JSON.stringify(wholeArr), 'utf-8', function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log('The file ' + item + ' was saved!')
            })
        }
    })
}