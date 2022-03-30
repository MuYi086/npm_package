## wecalendar

[中文](https://github.com/ougege/npm_package/blob/master/wecalendar/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/wecalendar) ![npm bundle size](https://img.shields.io/bundlephobia/min/wecalendar) ![npm](https://img.shields.io/npm/dt/wecalendar) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### install
```SHELL
npm install wecanlendar
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
