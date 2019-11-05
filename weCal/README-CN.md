## weCal

#### 英文阅读
[英文](./README.md '英文')

#### 安装
```
npm install wecal
```

#### 使用
```
let util = require('wecal')
let str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
let value = util.weCal.dealBracket(str)
```

#### 函数
1. dealBracket: (一个包含表达式的字符串) 参数不能为空
    * 默认 字符串
