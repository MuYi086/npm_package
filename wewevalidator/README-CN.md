## wewevalidator

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/wewevalidator) ![npm bundle size](https://img.shields.io/bundlephobia/min/wewevalidator) ![npm](https://img.shields.io/npm/dt/wewevalidator) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### 安装
```SHELL
npm install wewevalidator
# common JS
const weweValidator = require('wewevalidator')
# es6
import weweValidator from 'wewevalidator'
```

#### 使用
```JS
// 手机号
const phone = '15507810249'
const value = weweValidator.verify(phone, 'phone')

// 座机号
const telPhone = '0571-4340259'
const value = weweValidator.verify(telPhone, 'telPhone')

// 邮箱
const email = 'yanglu4340@gmail.com'
const value = weweValidator.verify(email, 'email')

// 密码
const password = 'helloWorld888'
const value = weweValidator.verify(password, 'password')

// 日期
const dateTime = '2020-11-03'
const value = weweValidator.verify(dateTime, 'dateTime')

// 身份证
const identityCard = '43062319181212003X'
const value = weweValidator.verify(identityCard, 'identityCard')

// 网址
const url = 'www.baidu.com'
const value = weweValidator.verify(url, 'website')

// 税号
const taxnum = '259595959529592'
const value = weweValidator.verify(taxnum, 'taxnum')

// isNum
const temp = '259595'
const value = weweValidator.verify(temp, 'isNum')

// isImg
const temp = 'jpg'
const value = weweValidator.verify(temp, 'isImg')

// isVideo
const temp = 'mp4'
const value = weweValidator.verify(temp, 'isVideo')

// isAudio
const temp = 'mp3'
const value = weweValidator.verify(temp, 'isAudio')

// isconstter
const temp = 'mp3'
const value = weweValidator.verify(temp, 'isconstter')

// isNumconstter
const temp = 'mp3'
const value = weweValidator.verify(temp, 'isNumconstter')

// 校验 长度
const password = 'helloWorld888'
const limitLength = 10
const value = weweValidator.verify(password, 'password', limitLength)

// 检验非常规字段
// 校验时直接输入label名称即可，例如: verify (value, '地区')
const address = '杭州市'
const value = weweValidator.verify(address, '地区')
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
