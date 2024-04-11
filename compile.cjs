const fs = require('fs')
const { minify } = require('terser')
const directory = './validator'
const code = fs.readFileSync(`${directory}/index.js`, 'utf8')
minify(code).then(result => {
  fs.writeFileSync(`${directory}/index.min.js`, result.code, 'utf8')
}) 
