# calendar

[中文](https://github.com/MuYi086/npm_package/blob/master/calendar/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/calendar) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/calendar) ![npm](https://img.shields.io/npm/dt/@muyi086/calendar) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## install
```SHELL
npm install @muyi086/calendar
# common JS
const calendar = require('@muyi086/calendar')
# es6
import calendar from '@muyi086/calendar'
```

## use
```JS
// all data is in object @muyi086/calendar after init
console.log(calendar)
```

## attr explain
1. `currentMonthDay` : daily info 
1. `currentMonthFarmDay` : daily info with Lunar

## function

function|parameter|default|required|description|
--|--|--|--|--|
search|date string|string|required|self-defined search with a date string like '2019.12.12'或'2019-12-12'或'2019/12/12'|
