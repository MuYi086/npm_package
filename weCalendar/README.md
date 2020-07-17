## weCalendar

[中文](https://github.com/ougege/npm_package/blob/master/weCalendar/README-CN.md '中文')

#### install
```SHELL
npm install wecalendar
# common JS
const wecalendar = require('wecalendar')
# es6
import wecalendar from 'wecalendar'
```

#### use
```JS
// all data is in object wecalendar after init
console.log(wecalendar)
```

#### attr explain
1. `currentMonthDay` : daily info 
1. `currentMonthFarmDay` : daily info with Lunar

#### function

function|parameter|default|required|description|
--|--|--|--|--|
search|date string|string|required|self-defined search with a date string like '2019.12.12'或'2019-12-12'或'2019/12/12'|
