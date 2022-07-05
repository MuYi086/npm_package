## wewevalidator

[中文](https://github.com/ougege/npm_package/blob/master/wewevalidator/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/wewevalidator) ![npm bundle size](https://img.shields.io/bundlephobia/min/wewevalidator) ![npm](https://img.shields.io/npm/dt/wewevalidator) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

#### install
```SHELL
npm install wewevalidator
# common JS
const weweValidator = require('wewevalidator')
# es6
import weweValidator from 'wewevalidator'
```

#### use
```JS
// phone
const phone = '15507810249'
const value = weweValidator.verify(phone, 'phone')

// telPhone
const telPhone = '0571-4340259'
const value = weweValidator.verify(telPhone, 'telPhone')

// email
const email = 'yanglu4340@gmail.com'
const value = weweValidator.verify(email, 'email')

// password
const password = 'helloWorld888'
const value = weweValidator.verify(password, 'password')

// dateTime
const dateTime = '2020-11-03'
const value = weweValidator.verify(dateTime, 'dateTime')

// identityCard
const identityCard = '43062319181212003X'
const value = weweValidator.verify(identityCard, 'identityCard')

// website
const url = 'www.baidu.com'
const value = weweValidator.verify(url, 'website')

// taxnum
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

// verify length
const password = 'helloWorld888'
const limitLength = 10
const value = weweValidator.verify(password, 'password', limitLength)

// verify general fields
// input label name，example: verify (value, '地区')
const address = '杭州市'
const value = weweValidator.verify(address, '地区')
```

#### attr explain
1. `typeArr` : verify attr array 
1. `typeKeyValue` : verify attr key and value

#### function

function|parameter|default|required|description|
--|--|--|--|--|
verify|value|string|required|a string value needs to verify|
verify|key|string|optional|key attr|
verify|limitLength|number|optional|a number limit value's length|
