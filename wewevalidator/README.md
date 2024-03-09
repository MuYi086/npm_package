## wewevalidator

[中文](https://github.com/MuYi086/npm_package/blob/master/wewevalidator/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/wewevalidator) ![npm bundle size](https://img.shields.io/bundlephobia/min/wewevalidator) ![npm](https://img.shields.io/npm/dt/wewevalidator) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

#### install
```SHELL
npm install wewevalidator
# common JS
const wewevalidator = require('wewevalidator')
# es6
import wewevalidator from 'wewevalidator'
```

#### use
```JS
// phone
const phone = '15507810249'
const value = wewevalidator.verify(phone, 'phone')

// telPhone
const telPhone = '0571-4340259'
const value = wewevalidator.verify(telPhone, 'telPhone')

// email
const email = 'yanglu4340@gmail.com'
const value = wewevalidator.verify(email, 'email')

// password
const password = 'helloWorld888'
const value = wewevalidator.verify(password, 'password')

// dateTime
const dateTime = '2020-11-03'
const value = wewevalidator.verify(dateTime, 'dateTime')

// identityCard
const identityCard = '43062319181212003X'
const value = wewevalidator.verify(identityCard, 'identityCard')

// website
const url = 'www.baidu.com'
const value = wewevalidator.verify(url, 'website')

// taxnum
const taxnum = '259595959529592'
const value = wewevalidator.verify(taxnum, 'taxnum')

// isNum
const temp = '259595'
const value = wewevalidator.verify(temp, 'isNum')

// isImg
const temp = 'jpg'
const value = wewevalidator.verify(temp, 'isImg')

// isVideo
const temp = 'mp4'
const value = wewevalidator.verify(temp, 'isVideo')

// isAudio
const temp = 'mp3'
const value = wewevalidator.verify(temp, 'isAudio')

// isLetter
const temp = 'mp3'
const value = wewevalidator.verify(temp, 'isLetter')

// isNumLetter
const temp = 'mp3'
const value = wewevalidator.verify(temp, 'isNumLetter')

// isHanzi
const temp = '张三'
const value = wewevalidator.verify(temp, 'isHanzi')

// verify length
const password = 'helloWorld888'
const limitLength = 10
const value = wewevalidator.verify(password, 'password', limitLength)

// verify general fields
// input label name，example: verify (value, '地区')
const address = '杭州市'
const value = wewevalidator.verify(address, '地区')
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
