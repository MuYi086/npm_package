# cal

[中文](https://github.com/MuYi086/npm_package/blob/master/cal/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/cal) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/cal) ![npm](https://img.shields.io/npm/dt/@muyi086/cal) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/cal
# common JS
const cal = require('@muyi086/cal')
# es6
import cal from '@muyi086/cal'
```

## Use
```JS
const str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
const value = cal.dealBracket(str)
```

## Function

function|parameter|default|required|description|
--|--|--|--|--|
dealBracket|string|string|required|a string include expression|