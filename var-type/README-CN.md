# var-type

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/var-type) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/var-type) ![npm](https://img.shields.io/npm/dt/@muyi086/var-type) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/var-type
# common JS
const { varType } = require('@muyi086/var-type')
# es6
import { varType } from '@muyi086/var-type'
```

## 使用
```JS
// 是否Array
const a = null
varType.isArray(a)
varType['isArray'](a)

// 是否ArrayBuffer
varType.isArrayBuffer(a)

// 是否Blob
varType.isBlob(a)

// 是否Boolean
varType.isBoolean(a)

// 是否Date
varType.isDate(a)

// 是否File
varType.isFile(a)

// 是否FormData
varType.isFormData(a)

// 是否Function
varType.isFunction(a)

// 是否Map
varType.isMap(a)

// 是否Null
varType.isNull(a)

// 是否Number
varType.isNumber(a)

// 是否Object
varType.isObject(a)

// 是否RegExp
varType.isRegExp(a)

// 是否Set
varType.isSet(a)

// 是否String
varType.isString(a)

// 是否URLSearchParams
varType.isURLSearchParams(a)

// 是否undefined
varType.isUndefined(a)

// 是否WeakMap
varType.isWeakMap(a)

// 是否WeakSet
varType.isWeakSet(a)

// 是否Buffer
varType.isBuffer(a)

// 是否isStream
varType.isStream(a)

// 是否isProxy
varType.isProxy(a)
```