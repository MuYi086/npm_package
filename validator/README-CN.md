# validator

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/validator) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/validator) ![npm](https://img.shields.io/npm/dt/@muyi086/validator) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/validator
# common JS
const { validator } = require('@muyi086/validator')
# es6
import { validator } from '@muyi086/validator'
```

## 使用
```JS
// 手机号
const phone = '15507810249'
const value = validator.verify(phone, 'phone')

// 座机号
const telPhone = '0571-4340259'
const value = validator.verify(telPhone, 'telPhone')

// 邮箱
const email = 'yanglu4340@gmail.com'
const value = validator.verify(email, 'email')

// 密码
const password = 'helloWorld888'
const value = validator.verify(password, 'password')

// 日期
const dateTime = '2020-11-03'
const value = validator.verify(dateTime, 'dateTime')

// 身份证
const identityCard = '43062319181212003X'
const value = validator.verify(identityCard, 'identityCard')

// 网址
const url = 'www.baidu.com'
const value = validator.verify(url, 'website')

// 税号
const taxnum = '259595959529592'
const value = validator.verify(taxnum, 'taxnum')

// 数字
const temp = '259595'
const value = validator.verify(temp, 'isNum')

// 图片
const temp = 'jpg'
const value = validator.verify(temp, 'isImg')

// 视频
const temp = 'mp4'
const value = validator.verify(temp, 'isVideo')

// 音频
const temp = 'mp3'
const value = validator.verify(temp, 'isAudio')

// 字母
const temp = 'mp3'
const value = validator.verify(temp, 'isLettter')

// 数字字母
const temp = 'mp3'
const value = validator.verify(temp, 'isNumLetter')

// 汉字
const temp = '张三'
const value = validator.verify(temp, 'isHanzi')

// 校验 长度
const password = 'helloWorld888'
const limitLength = 10
const value = validator.verify(password, 'password', limitLength)

// 检验非常规字段
// 校验时直接输入label名称即可，例如: verify (value, '地区')
const address = '杭州市'
const value = validator.verify(address, '地区')
```

## 属性说明
1. `typeArr` : 校验类型属性数组 
1. `typeKeyValue` : 校验类型属性键值对数组 

## function

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
verify|文本|字符串|必须|待校验的文本|
verify|键|字符串|可选|键属性|
verify|长度限制|数字|可选|限制文本的长度|
