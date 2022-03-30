## wewevalidator

[中文](https://github.com/ougege/npm_package/blob/master/wewevalidator/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/wewevalidator) ![npm bundle size](https://img.shields.io/bundlephobia/min/wewevalidator) ![npm](https://img.shields.io/npm/dt/wewevalidator) ![GitHub](https://img.shields.io/github/license/ougege/npm_package)

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
let phone = '15507810249'
let value = wewevalidator.verify(phone, 'phone')

// telPhone
let telPhone = '0571-4340259'
let value = wewevalidator.verify(telPhone, 'telPhone')

// email
let email = 'yanglu4340@gmail.com'
let value = wewevalidator.verify(email, 'email')

// password
let password = 'helloWorld888'
let value = wewevalidator.verify(password, 'password')

// dateTime
let dateTime = '2020-11-03'
let value = wewevalidator.verify(dateTime, 'dateTime')

// identityCard
let identityCard = '43062319181212003X'
let value = wewevalidator.verify(identityCard, 'identityCard')

// verify length
let password = 'helloWorld888'
let limitLength = 10
let value = wewevalidator.verify(password, 'password', limitLength)

// verify general fields
// input label name，example: verify (value, '地区')
let address = '杭州市'
let value = wewevalidator.verify(address, '地区')
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
