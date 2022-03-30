## wecal

[中文](https://github.com/ougege/npm_package/blob/master/wecal/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/wecal) ![npm bundle size](https://img.shields.io/bundlephobia/min/wecal) ![npm](https://img.shields.io/npm/dt/wecal) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### install
```SHELL
npm install wecal
# common JS
const wecal = require('wecal')
# es6
import wecal from 'wecal'
```

#### use
```JS
let str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
let value = wecal.dealBracket(str)
```

#### function

function|parameter|default|required|description|
--|--|--|--|--|
dealBracket|string|string|required|a string include expression|