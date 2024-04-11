/**
 * @Description: get commit info
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/npm_package
 * @Date: 2021/04/11 08:50
 */
const { execSync } = require('child_process')

/**
 * 执行git命令
 * @param {*} statement
 * @returns string
 */
const commonExecGitStatement = (statement) => {
  try {
    return execSync(statement, { encoding: 'utf8' }).trim()
  } catch (e) {
    return new Error('执行git命令失败')
  }
}

/**
 * 获取当前分支
 * @returns string
 */
const getGitBranch = () => {
  const statement = 'git symbolic-ref --short -q HEAD'
  return commonExecGitStatement(statement)
}

/**
 * 获取git用户名
 * @returns string
 */
const getGitName = () => {
  const statement = 'git config user.name'
  return commonExecGitStatement(statement)
}

/**
 * 获取git邮箱
 * @returns string
 */
const getGitEmail = () => {
  const statement = 'git config user.email'
  return commonExecGitStatement(statement)
}

/**
 * 获取git标签
 * @returns string
 */
const getGitShowRefTags = () => {
  const statement = 'git show-ref --tags'
  const showRefTags = commonExecGitStatement(statement)
  let tagsArr = []
  if (showRefTags) {
    tagsArr = showRefTags.match(/refs\/tags\/.+/ig)
  }
  return tagsArr
}

/**
 * 从tagsArr截取最后一个tag
 * @param {*} arr
 * @returns string
 */
const getLatestTagFromTagsArr = (arr = []) => {
  if (arr) {
    const latestTag = arr[arr.length - 1]
    return latestTag.replace('refs/tags/', '')
  } else {
    return ''
  }
}

/**
 * 获取上一次commit信息
 * @returns object
 */
const getGitLastCommitInfo = () => {
  const commitNameCode = 'git log -1 --pretty=format:%cn'
  const commitEmailCode = 'git log -1 --pretty=format:%ce'
  const commitName = commonExecGitStatement(commitNameCode)
  const commitEmail = commonExecGitStatement(commitEmailCode)
  const commitDateCode = 'git log -1 --pretty=format:%ci'
  const commitDate = commonExecGitStatement(commitDateCode)
  const commitSubjectCode = 'git log -1 --pretty=format:%s'
  const commitSubject = commonExecGitStatement(commitSubjectCode)
  const commitHashCode = 'git log -1 --pretty=format:%H'
  const commitHash = commonExecGitStatement(commitHashCode)
  return { commitName, commitEmail, commitDate, commitSubject, commitHash }
}

/**
 * 主函数
 * @returns object
 */
const gitCommitInfo = () => {
  const branch = getGitBranch()
  const name = getGitName()
  const email = getGitEmail()
  const { commitName, commitEmail, commitDate, commitSubject, commitHash } = getGitLastCommitInfo()
  const showRefTags = getGitShowRefTags()
  const latestTag = getLatestTagFromTagsArr(showRefTags)
  return {
    branch,
    gitUserName: name,
    gitUserEmail: email,
    commitName,
    commitEmail,
    commitDate,
    commitSubject,
    commitHash,
    latestTag
  }
}

module.exports = gitCommitInfo
