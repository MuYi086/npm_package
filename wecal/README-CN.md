## wecal

[English](./README.md 'English')

#### 安装
```SHELL
npm install wecal
# common JS
const wecal = require('wecal')
# es6
import wecal from 'wecal'
```

#### 使用
```JS
let str = '-(-5+(-2*33//3****4)-2)+((5*6)/2+2)-23*4/2+43'
let value = wecal.dealBracket(str)
```

#### 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
dealBracket|字符串|字符串|必需|一个包含表达式的字符串|
