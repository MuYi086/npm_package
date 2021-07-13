## weweValidator

[English](./README.md 'English')

#### 安装
```SHELL
npm install wewevalidator
# common JS
const wewevalidator = require('wewevalidator')
# es6
import wewevalidator from 'wewevalidator'
```

#### 使用
```JS
// 手机号
let phone = '15507810249'
let value = wewevalidator.verify(phone, 'phone')

// 座机号
let telPhone = '0571-4340259'
let value = wewevalidator.verify(telPhone, 'telPhone')

// 邮箱
let email = 'yanglu4340@gmail.com'
let value = wewevalidator.verify(email, 'email')

// 密码
let password = 'helloWorld888'
let value = wewevalidator.verify(password, 'password')

// 日期
let dateTime = '2020-11-03'
let value = wewevalidator.verify(dateTime, 'dateTime')

// 身份证
let identityCard = '43062319181212003X'
let value = wewevalidator.verify(identityCard, 'identityCard')

// 校验 长度
let password = 'helloWorld888'
let limitLength = 10
let value = wewevalidator.verify(password, 'password', limitLength)

// 检验非常规字段
// 校验时直接输入label名称即可，例如: verify (value, '地区')
let address = '杭州市'
let value = wewevalidator.verify(address, '地区')
```

#### 属性说明
1. `typeArr` : 校验类型属性数组 
1. `typeKeyValue` : 校验类型属性键值对数组 

#### function

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
verify|文本|字符串|必须|待校验的文本|
verify|键|字符串|可选|键属性|
verify|长度限制|数字|可选|限制文本的长度|
