/**
 * @Description: calendar and Lunar calendar
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class Calendar {
  constructor () {
    this.yearArr = []
    this.monthArr = []
    this.weekDay = []
    this.gan = []
    this.zhi = []
    this.chineseZodiac = []
    this.farmMonthArr = []
    this.pingMonthArr = []
    this.runMonthArr = []
    this.farmDate = []
    this.farmDateArr = []
    this.today = {}
    this.lastThreeMonthDay = []
    this.currentMonthDay = []
    this.currentMonthFarmDay = []
    this.searchDay = {year: 1900, month: 1, day: 1}
    this.prevMonthObj = {}
    this.nextMonthObj = {}
    this.init()
  }
  init () {
    for (let i = 1900; i < 2051; i++) { this.yearArr.push(i) }
    for (let i = 0; i < 12; i++) { this.monthArr.push(i + 1) }
    this.weekDay = ('一二三四五六日').split('')
    this.gan = ('甲乙丙丁戊己庚辛壬癸').split('')
    this.zhi = ('子丑寅卯辰巳午未申酉戌亥').split('')
    this.chineseZodiac = ('鼠牛虎兔龙蛇马羊猴鸡狗猪').split('')
    this.farmMonthArr = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '腊月']
    this.pingMonthArr = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九']
    this.runMonthArr = [...this.pingMonthArr, '三十']
    // 后五位16进制转成2进制，不满20位补足20位
    // 17-20表示是否闰月,5-16表示12个月份,1表示30天，0表示29天
    // 第4位表示润月,1表示30天,0表示29天(在有闰月时才有意义)
    this.farmDate = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0,
      0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2,
      0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60,
      0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60,
      0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4,
      0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0,
      0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60,
      0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
      0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0,
      0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5,
      0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0,
      0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0,
      0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6,
      0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0,
      0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
      0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0]
    this.farmDateArr = this.parseFarmInfoByHexCode(this.farmDate)
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    this.today = today
    this.searchDay = {year: year, month: month, day: day}
    // 计算公历
    this.searchLastThreeMonthDay(this.searchDay)
    // 计算农历
    this.calFarmInfo(this.searchDay)
  }
  reset () {
    this.lastThreeMonthDay = []
    this.currentMonthDay = []
  }
  // 根据传入的月份,查询最近三个月日历:其实只要上月和下月各取一点就可以了,这里取15天
  searchLastThreeMonthDay (searchDay) {
    // 时间格式统一使用/是为了兼容ios
    let year = searchDay.year
    let month = searchDay.month
    let prevMonthStr = month === 1 ? `${year - 1}/12/15` : `${year}/${month - 1}/15`
    let nextMonthStr = month === 12 ? `${year + 1}/1/15` : `${year}/${month + 1}/15`
    this.prevMonthObj = {
      year: month === 1 ? year - 1 : year,
      month: month === 1 ? 12 : month - 1,
      day: 15
    }
    this.nextMonthObj = {
      year: month === 12 ? year + 1 : year,
      month: month === 12 ? 1 : month + 1,
      day: 15
    }
    let prevTimeStamp = new Date(prevMonthStr).getTime()
    let nextTimeStamp = new Date(nextMonthStr).getTime()
    let oneDayTimeStamp = 24 * 60 * 60 * 1000
    let len = Math.floor((nextTimeStamp - prevTimeStamp) / oneDayTimeStamp)
    for (let i = 0; i < len; i++) {
      this.lastThreeMonthDay.push(this.timeStampToDate(i * oneDayTimeStamp + prevTimeStamp))
    }
    this.searchCurrentMonthDay(searchDay)
  }
  // 时间戳转日期的方法
  timeStampToDate (timeStamp) {
    let date = new Date(timeStamp)
    let dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    let weekDay = date.getDay()
    return {date: dateStr, weekDay: weekDay}
  }
  // 计算出当前月份的所有日期
  searchCurrentMonthDay (searchDay) {
    let monthStart = `${searchDay.year}/${searchDay.month}/1`
    let lastDay = new Date(searchDay.year, searchDay.month, 0).getDate()
    let monthEnd = `${searchDay.year}/${searchDay.month}/${lastDay}`
    let monthStartIdx = 0
    let monthEndIdx = 28
    for (let i = 0; i < this.lastThreeMonthDay.length; i++) {
      if (this.lastThreeMonthDay[i].date === monthStart) {
        monthStartIdx = i
      }
      if (this.lastThreeMonthDay[i].date === monthEnd) {
        monthEndIdx = i
        break
      }
    }
    // 日历表实际开头星期一: 1-6直接减，０相当于减７
    let cutLength = this.lastThreeMonthDay[monthStartIdx].weekDay == 0 ? 7 : this.lastThreeMonthDay[monthStartIdx].weekDay
    let calStartMonIdx = monthStartIdx - cutLength
    // 日历表实际开头星期一
    // let calStartMonIdx = monthStartIdx - this.lastThreeMonthDay[monthStartIdx].weekDay
    // 日历表实际结尾星期日
    let calEndSunIdx = monthEndIdx + (6 - this.lastThreeMonthDay[monthEndIdx].weekDay)
    for (let i = 1; i <= calEndSunIdx - calStartMonIdx + 1; i++) {
      let dateObj = this.lastThreeMonthDay[calStartMonIdx + i]
      let shortDate = (dateObj.date).split('/').pop()
      let isCurrentMonth = (calStartMonIdx + i >= monthStartIdx) && (calStartMonIdx + i <= monthEndIdx)
      let isHoliday = dateObj.weekDay === 6 || dateObj.weekDay === 0
      this.currentMonthDay.push({date: shortDate, isCurrentMonth: isCurrentMonth, isHoliday: isHoliday})
    }
  }
  // 搜索对应日期的月份时间
  search (dateStr) {
    // 处理'2019.12.12'或'2019-12-12'或'2019/12/12'格式的时间
    let dateArr = dateStr.split('')
    let dealArr = []
    dateArr.forEach(item => {
      dealArr.push(isNaN(Number(item)) ? '|' : item)
    })
    let newDateArr = this.arrTransToNum((dealArr.join('')).split('|'))
    this.reset()
    this.searchDay = {year: newDateArr[0], month: newDateArr[1], day: newDateArr[2]}
    this.searchLastThreeMonthDay(this.searchDay)
    // 查询农历
    this.calFarmInfo(this.searchDay)
  }
  // 处理时间数组:全项处理成Number
  arrTransToNum (arr) {
    let newArr = []
    arr.forEach(item => {
      newArr.push(Number(item))
    })
    return newArr
  }
  // 查询农历方法
  calFarmInfo (searchDay) {
    let year = searchDay.year
    let month = searchDay.month
    let day = searchDay.day
    // 计算与1900/01/31日的总天数,当天是'庚子年正月初一'
    let oldTimeStamp = new Date('1900/01/31').getTime()
    let currentTimeStamp = new Date(`${year}/${month}/${day}`).getTime()
    let oneDayTimeStamp = 24 * 60 * 60 * 1000
    let len = Math.floor((currentTimeStamp - oldTimeStamp) / oneDayTimeStamp)
    // 计算出当前月份的农历信息
    this.currentMonthFarmDay = this.calCurrentMonthFarmInfo(this.currentMonthDay, this.farmDateArr, len)
  }
  // 将存储的十六进制月份信息解析成2进制
  parsetMonthInfo (yearInfo) {
    let len = yearInfo.length
    let runMonth = parseInt(yearInfo.slice(len - 4, len), 2)
    let monthInfo = (yearInfo.slice(0, len - 4)).split('')
    if (monthInfo.length === 11) {
      monthInfo.unshift('0', '0')
    }
    if (monthInfo.length === 12) {
      monthInfo.unshift('0')
    }
    let runSmBig = Number(monthInfo.shift())
    return [runSmBig, monthInfo, runMonth]
  }
  // 通过十六进制解析农历信息
  parseFarmInfoByHexCode (arr) {
    let farmDateArr = []
    for (let i = 0; i < arr.length; i++) {
      let yearInfo = (arr[i]).toString(2)
      let parseInfo = this.parsetMonthInfo(yearInfo)
      let runBigSm = parseInfo[0]
      let monthInfo = parseInfo[1]
      let runMonth = parseInfo[2]
      for (let m = 0; m < monthInfo.length; m++) {
        let currentMonth = Number(monthInfo[m]) === 0 ? this.pingMonthArr : this.runMonthArr
        currentMonth.forEach(item => {
          let year = this.yearArr[i]
          let month = this.farmMonthArr[m]
          let day = item
          let farmItemObj = {year: year, month: month, day: day, isRunMonth: false}
          farmDateArr.push(farmItemObj)
        })
        if (runMonth === this.monthArr[m]) {
          let currentMonth = runBigSm === 0 ? this.pingMonthArr : this.runMonthArr
          currentMonth.forEach(item => {
            let year = this.yearArr[i]
            let month = this.farmMonthArr[m]
            let day = item
            let farmItemObj = {year: year, month: month, day: day, isRunMonth: true}
            farmDateArr.push(farmItemObj)
          })
        }
      }
    }
    return farmDateArr
  }
  // 计算出当前月份的农历信息
  calCurrentMonthFarmInfo (normalArr, farmArr, len) {
    let lenBeafore = 0
    let lenAfter = 0
    let currentMonthFarmDay = []
    for (let i = 0; i < normalArr.length; i++) {
      if (normalArr[i].isCurrentMonth) {
        lenBeafore = i
        lenAfter = normalArr.length - i
        break
      }
    }
    for (let m = (len - lenBeafore); m < (len + lenAfter); m++) {
      let year = this.farmDateArr[m].year
      let month = this.farmDateArr[m].month
      let day = this.farmDateArr[m].day
      let isCurrentMonth = m >= len && m <= (len + normalArr.length)
      let farmItemObj = {year: year, month: month, day: day, isCurrentMonth: isCurrentMonth}
      currentMonthFarmDay.push(farmItemObj)
    }
    return currentMonthFarmDay
  }
}
const calendar = new Calendar()
module.exports = calendar
