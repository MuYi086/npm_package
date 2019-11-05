## weVerifyCode

#### 英文阅读
[英文](./README.md '英文')

#### 安装
```
npm install weverifycode
```

#### 使用
```
// 页面创建一个元素
<canvas id="canvas"></canvas>
// 导入和使用
let util = require('weverifycode')
util.weVerifyCode.random(3, 5)

#### 函数
random(type, len, slash = true, point = true)
1. type: (混合类型) 不能为空 类型数字
    * 1: 纯数字
    * 2: 纯字母
    * 3: 数字和字母

1. len: (生成的验证码长度) 不能为空 数字

1. slash: (是否显示斜线) 可选 布尔值
    * 默认 true
1. point: (是否显示点) 可选 布尔值
    * 默认 true