# validator

[中文](https://github.com/MuYi086/npm_package/blob/master/validator/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/validator) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/validator) ![npm](https://img.shields.io/npm/dt/@muyi086/validator) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/validator
# common JS
const validator = require('@muyi086/validator')
# es6
import validator from '@muyi086/validator'
```

## Use
```JS
// phone
const phone = '15507810249'
const value = validator.verify(phone, 'phone')

// telPhone
const telPhone = '0571-4340259'
const value = validator.verify(telPhone, 'telPhone')

// email
const email = 'yanglu4340@gmail.com'
const value = validator.verify(email, 'email')

// password
const password = 'helloWorld888'
const value = validator.verify(password, 'password')

// dateTime
const dateTime = '2020-11-03'
const value = validator.verify(dateTime, 'dateTime')

// identityCard
const identityCard = '43062319181212003X'
const value = validator.verify(identityCard, 'identityCard')

// website
const url = 'www.baidu.com'
const value = validator.verify(url, 'website')

// taxnum
const taxnum = '259595959529592'
const value = validator.verify(taxnum, 'taxnum')

// isNum
const temp = '259595'
const value = validator.verify(temp, 'isNum')

// isImg
const temp = 'jpg'
const value = validator.verify(temp, 'isImg')

// isVideo
const temp = 'mp4'
const value = validator.verify(temp, 'isVideo')

// isAudio
const temp = 'mp3'
const value = validator.verify(temp, 'isAudio')

// isLetter
const temp = 'mp3'
const value = validator.verify(temp, 'isLetter')

// isNumLetter
const temp = 'mp3'
const value = validator.verify(temp, 'isNumLetter')

// isHanzi
const temp = '张三'
const value = validator.verify(temp, 'isHanzi')

// verify length
const password = 'helloWorld888'
const limitLength = 10
const value = validator.verify(password, 'password', limitLength)

// verify general fields
// input label name，example: verify (value, '地区')
const address = '杭州市'
const value = @validator.verify(address, '地区')
```

## Attr explain
1. `typeArr` : verify attr array 
1. `typeKeyValue` : verify attr key and value

## Function

function|parameter|default|required|description|
--|--|--|--|--|
verify|value|string|required|a string value needs to verify|
verify|key|string|optional|key attr|
verify|limitLength|number|optional|a number limit value's length|
