## weCalendar

[中文](https://github.com/ougege/npm_package/blob/master/weCalendar/README-CN.md '中文')

#### install
```SHELL
npm install wecalendar
```

#### use
```JS
// all data is in object util after init
let util = require('wecalendar')
```

#### attr explain
1. `currentMonthDay` : daily info 
1. `currentMonthFarmDay` : daily info with Lunar

#### function

function|parameter|default|required|description|
--|--|--|--|--|
search|date string|string|required|self-defined search with a date string like '2019.12.12'或'2019-12-12'或'2019/12/12'|
