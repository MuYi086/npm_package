## weImgToBase64

[中文](https://github.com/ougege/npm_package/blob/master/weImgToBase64/README-CN.md '中文')

#### install
```SHELL
npm install weimgtobase64
```

#### use
```JS
const util = require('weimgtobase64')
// parse img url
let url = 'http://img.qipeiren.com/UploadFile/UserProPic/2019/11/23/4b65b8aadcfb0ac65a91.jpg'
console.log(util.weImgToBase64.parse(imgOjb))
// parse img object
let img = document.getElementById('test')
console.log(util.weImgToBase64.parse(imgOjb))
// useCanvas img object
let img = document.getElementById('test')
console.log(util.weImgToBase64.useCanvas(imgOjb))
```

#### function

function|parameter|default|required|description|
--|--|--|--|--|
parse|string/object||optional|a img object or img url|
useCanvas|object||required|a img object|


#### tips
As soon as you draw into a canvas any data that was loaded from another origin without CORS approval, the canvas becomes tainted.A tainted canvas is one which is no longer considered secure, and any attempts to retrieve image data back from the canvas will cause an exception to be thrown.

#### wiki
1. [Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 'Allowing cross-origin use of images and canvas')