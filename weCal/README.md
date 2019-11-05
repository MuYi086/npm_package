## weCal

#### Read in Chinese
[中文](./README-CN.md '中文')

#### install
```
npm install wecal
```

#### use
```
let util = require('wecal')
let str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
let value = util.weCal.dealBracket(str)
```

#### function
1. dealBracket: (a string include expression) required
    * default string
