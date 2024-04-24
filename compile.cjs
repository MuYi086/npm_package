const fs = require('fs')
const { minify } = require('terser')
const chalk = require('chalk')
const directoryArr = [
  'cal', 
  'calendar', 
  'chrome-extension-interface-url-copy',
  'chrome-extension-music163-fetch',
  'git-commit-export-html',
  'git-commit-info', 
  'img-compress',
  'img-to-base64',
  'qs',
  'validator',
  'var-type',
  'verify-code'
]
console.log(chalk.blue('开始压缩代码'))

const pArr = directoryArr.map((li) => {
  const directory = `./${li}`
  return new Promise((resolve, reject) => {
    try {
      const code = fs.readFileSync(`${directory}/index.js`, 'utf8')
      minify(code, { mangle: { toplevel: true } }).then(result => {
        fs.writeFileSync(`${directory}/index.min.js`, result.code, 'utf8')
        console.log(chalk.blue(`${li}目录处理完成`))
        resolve()
      })
    } catch (e) {
      reject(e)
    }
  })
})
Promise.all(pArr).then(res => {
  console.log(chalk.green('压缩完成'))
})


