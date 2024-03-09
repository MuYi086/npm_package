## weimgcompress

[中文](https://github.com/MuYi086/npm_package/blob/master/weimgcompress/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/weimgcompress) ![npm bundle size](https://img.shields.io/bundlephobia/min/weimgcompress) ![npm](https://img.shields.io/npm/dt/weimgcompress) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

#### install
```SHELL
npm install weimgcompress
# common JS
const weimgcompress = require('weimgcompress')
# es6
import weimgcompress from 'weimgcompress'
```

#### use
```JS
// compress img, return base64
console.log(weimgcompress.compress(imgObj, quality))
// download compressed img
console.log(weimgcompress.downloadImg(imgObj, name, quality))
```

#### function

function|parameter|default|required|description|
--|--|--|--|--|
compress|object||required|a img object|
compress|number|1|optional|a float between 0 and 1|
downloadImg|object||required|a img object|
downloadImg|string||required|name for save new img|
downloadImg|number|1|optional|a float between 0 and 1|


#### tips
A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.

#### wiki
1. [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL 'HTMLCanvasElement.toDataURL()')