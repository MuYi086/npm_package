/**
 * @Description: 找到用户一个时间段的提交记录，生成对应的html和json文件
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2023/12/11 18:32
 */
const { gitlogPromise } = require('gitlog')
const gitCommitInfo = require('@muyi086/git-commit-info')
const { resolve } = require('path')
const fs = require('fs')
/**
 * 构造最新的options
 * @param {*} options
 * @returns object
 */
const constructOptions = (options) => {
  const newOptions = {
    repo: resolve('.git'),
    execOptions: { maxBuffer: 1000 * 1024 },
    ...options
  }
  return newOptions
}
/**
 * 找出当前用户的commit记录,生成对应的html和json
 * @param {*} commits 
 * @param {*} options 
 */
const findCurrentUseCommit = (commits, options) => {
  const { gitUserName } = gitCommitInfo()
  const userCommitArr = commits.filter(c => c.authorName === gitUserName)
    .filter(d => !d.subject.includes('Merge'))
  const dealArr = userCommitArr.map(ucA => {
    const newObj = {}
    options.fields.forEach(li => {
      newObj[li] = ucA[li]
    })
    return newObj
  })
  let cmtStr = '<html>'
  for (let i = 0; i < dealArr.length; i++) {
    const item = dealArr[i].subject
    cmtStr += `${i + 1}、${item};<br/>`
  }
  cmtStr += '</html>'
  fs.writeFileSync('commintLogConsole.json', `${JSON.stringify(dealArr)}`)
  fs.writeFileSync('commintLogConsole.html', cmtStr)
}
/**
 * 生成log相关的html和json记录
 * @param {*} options 
 */
function gitCommitExportHtml (options) {
  const newOptions = constructOptions(options)
  gitlogPromise(newOptions)
    .then((commits) => findCurrentUseCommit(commits, options))
    .catch((err) => console.log(err))
}
module.exports = gitCommitExportHtml
