## wecal

[中文](https://github.com/ougege/npm_package/blob/master/wecal/README-CN.md '中文')

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