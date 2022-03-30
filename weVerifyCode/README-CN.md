## weverifycode

[English](./README.md 'English')

#### 安装
```SHELL
npm install weverifycode
# common JS
const weverifycode = require('weverifycode')
# es6
import weverifycode from 'weverifycode'
```

#### 使用
```JS
// 页面创建一个元素
<canvas id="canvas"></canvas>
// 导入和使用
weverifycode.random(3, 5)
// 完整方法
random(type, len, slash = true, point = true)
```
#### 函数

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
random|type|数字|必需|1: 纯数字;2: 纯字母;3: 数字和字母|
random|len|数字|必需|生成的验证码长度|
random|slash|布尔 true|非必需|是否显示斜线|
random|point|布尔 true|非必需|是否显示点|