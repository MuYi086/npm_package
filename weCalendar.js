class WeCanlendar {
    constructor () {
      this.yearArr = []
      this.monthArr = []
      this.weekDay = []
      this.today = {}
      this.lastThreeMonthDay = []
      this.currentMonthDay = []
      this.searchDay = {year: 1900, month: 1, day: 1}
      this.init()
    }
    init () {
      for (let i = 1970; i < 2051; i++) { this.yearArr.push(i) }
      for (let i = 0; i < 12; i++) { this.monthArr.push(i + 1) }
      this.weekDay = ['一', '二', '三', '四', '五', '六', '日']
      let today = new Date()
      this.today = today
      this.searchDay = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
      this.searchLastThreeMonthDay(this.searchDay)
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
      // 日历表实际开头星期一
      let calStartMonIdx = monthStartIdx - this.lastThreeMonthDay[monthStartIdx].weekDay
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
      let dateStrFirst = dateStr.indexOf('-') >= 0 ? dateStr.replace(/-/g, '|') : dateStr
      let dateStrSecond = dateStrFirst.indexOf('-') >= 0 ? dateStrFirst.replace(/./g, '|') : dateStrFirst
      let dateStrThird = dateStrSecond.indexOf('/') >= 0 ? dateStrSecond.replace(/\//g, '|') : dateStrSecond
      let newDateArr = this.arrTransToNum(dateStrThird.split('|'))
      this.reset()
      this.searchDay = {year: newDateArr[0], month: newDateArr[1], day: newDateArr[2]}
      this.searchLastThreeMonthDay(this.searchDay)
    }
    // 处理时间数组:全项处理成Number
    arrTransToNum (arr) {
      let newArr = []
      arr.forEach(item => {
        newArr.push(Number(item))
      })
      return newArr
    }
  }
  let weCanlendar = new WeCanlendar()
  console.log(weCanlendar)