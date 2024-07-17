/**
 * @Description: 找到用户一个时间段的提交记录，生成对应的html和json文件
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2023/12/11 18:32
 */
import { gitlogPromise } from 'gitlog'
import { gitCommitInfo } from '@muyi086/git-commit-info'
import { resolve } from 'path'
import fs from 'fs'

interface Options {  
  since: string;  
  until: string;  
  number: number;  
  fields: string[];  
}  
/**
 * 构造最新的options
 * @param {*} options
 * @returns GitLogOptions
 */
const constructOptions = (options: Options): any => {
  const newOptions = {
    repo: resolve('.git'),
    execOptions: { maxBuffer: 1000 * 1024 },
    ...options
  }
  return newOptions
}
/**
 * 找出当前用户的commit记录,生成对应的html和json
 * @param {*} commits 提交记录
 * @param {*} options 用户配置
 */
const findCurrentUseCommit = (commits: object[], options: Options) => {
  const { gitUserName } = gitCommitInfo()
  const userCommitArr = commits.filter((c: any) => c.authorName === gitUserName)
    .filter((d: any) => !d.subject.includes('Merge'))
  const dealArr = userCommitArr.map((ucA: any) => {
    const newObj: any = {}
    options.fields.forEach((li: string) => {
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
 * @param {*} options 用户配置
 */
export const gitCommitExportHtml = (options: Options) => {
  const newOptions = constructOptions(options)
  gitlogPromise(newOptions)
    .then((commits: any) => findCurrentUseCommit(commits, options))
    .catch((err: Error) => console.log(err))
}