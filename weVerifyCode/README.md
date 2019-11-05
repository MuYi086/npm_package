## weVerifyCode

#### install
```
npm install weverifycode
```

#### use
```
// dom create
<canvas id="canvas"></canvas>
// import and use
let util = require('weverifycode')
util.weVerifyCode.random(3, 5)

#### function
random(type, len, slash = true, point = true)
1. type: (code type mix) required number
    * 1: number
    * 2: letter
    * 3: number and letter

1. len: (code length) required number

1. slash: (has slash) optional boolean
    * default true
1. point: (has point) optional boolean
    * default true