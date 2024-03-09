## weverifycode

[中文](https://github.com/MuYi086/npm_package/blob/master/weverifycode/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/weverifycode) ![npm bundle size](https://img.shields.io/bundlephobia/min/weverifycode) ![npm](https://img.shields.io/npm/dt/weverifycode) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

#### install
```SHELL
npm install weverifycode
# common JS
const weverifycode = require('weverifycode')
# es6
import weverifycode from 'weverifycode'
```

#### use
```JS
// dom create
<canvas id="canvas"></canvas>
// import and use
weverifycode.random(3, 5)
// full code
random(type, len, slash = true, point = true)
```

#### function

function|parameter|default|required|description|
--|--|--|--|--|
random|type|number|required|code type mix (1: number;2: letter;3: number and letter)|
random|len|number|required|code length|
random|slash|Boolean true|optional|has slash|
random|point|Boolean true|optional|has point|