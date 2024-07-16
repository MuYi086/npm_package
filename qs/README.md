# qs

[中文](https://github.com/MuYi086/npm_package/blob/master/qs/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/qs) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/qs) ![npm](https://img.shields.io/npm/dt/@muyi086/qs) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/qs
# common JS
const { qs } = require('@muyi086/qs')
# es6
import { qs } from '@muyi086/qs'
```

## Use
```JS
const queryObj = {
  runEnv: 'mp-weixin',
  shopTabType: 0,
  hasLocation: true,
  longitude: 120.209885,
  latitude: 30.246592,
  vConsole: 0
}
console.log(qs.stringify(queryObj))


const url = '?runEnv=mp-weixin&shopTabType=0&hasLocation=true&longitude=120.209885&latitude=30.246592&vConsole=0'
console.log(qs.parse(url))
```