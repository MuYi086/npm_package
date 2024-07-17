# var-type

[中文](https://github.com/MuYi086/npm_package/blob/master/var-type/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/var-type) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/var-type) ![npm](https://img.shields.io/npm/dt/@muyi086/var-type) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/var-type
# common JS
const { varType } = require('@muyi086/var-type')
# es6
import { varType } from '@muyi086/var-type'
```

## Use
```JS
// isArray
const a = null
varType.isArray(a)
varType['isArray'](a)

// isArrayBuffer
varType.isArrayBuffer(a)

// isBlob
varType.isBlob(a)

// isBoolean
varType.isBoolean(a)

// isDate
varType.isDate(a)

// isFile
varType.isFile(a)

// isFormData
varType.isFormData(a)

// isFunction
varType.isFunction(a)

// isMap
varType.isMap(a)

// isNull
varType.isNull(a)

// isNumber
varType.isNumber(a)

// isObject
varType.isObject(a)

// isRegExp
varType.isRegExp(a)

// isSet
varType.isSet(a)

// isString
varType.isString(a)

// isURLSearchParams
varType.isURLSearchParams(a)

// isUndefined
varType.isUndefined(a)

// isWeakMap
varType.isWeakMap(a)

// isWeakSet
varType.isWeakSet(a)

// isBuffer
varType.isBuffer(a)

// isStream
varType.isStream(a)

// isProxy
varType.isProxy(a)
```