/**
 * @Description: get commit info
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
import { execSync } from 'child_process'

/**  
 * 执行Git命令并返回处理后的结果。  
 * @param {string} command 要执行的Git命令。  
 * @returns {string} 命令执行后的处理结果。  
 */
const execGitCommand = (command: string): string => {  
  try {
    return execSync(command, { encoding: 'utf8' }).trim()
  } catch (error) {
    console.error(`执行Git命令 "${command}" 出错：`, error)
    return '' 
  }
}

/**  
 * 获取当前Git分支名。  
 * @returns {string} 当前Git分支名。  
 */
const getCurrentGitBranch = (): string => {
  return execGitCommand('git symbolic-ref --short -q HEAD')
}

/**  
 * 获取Git用户名。  
 * @returns {string} Git用户名。  
 */
const getGitUserName = (): string => {
  return execGitCommand('git config user.name')
}

/**  
 * 获取Git用户邮箱。  
 * @returns {string} Git用户邮箱。  
 */
const getGitUserEmail = (): string => {
  return execGitCommand('git config user.email')
}

/**
 * 比较两个版本号（支持语义化版本号）
 * @param {string} a 版本号A
 * @param {string} b 版本号B
 * @returns {number} 比较结果：负数表示a < b，0表示相等，正数表示a > b
 */
const compareVersions = (a: string, b: string): number => {
  // 移除 refs/tags/ 前缀
  const versionA = a.replace('refs/tags/', '')
  const versionB = b.replace('refs/tags/', '')
  
  // 提取版本号部分（移除v前缀）
  const cleanA = versionA.replace(/^v/, '')
  const cleanB = versionB.replace(/^v/, '')
  
  // 分割版本号
  const partsA = cleanA.split('.').map(part => {
    // 处理预发布版本（如 1.0.0-beta.1）
    const numPart = part.match(/^\d+/)?.[0] || '0'
    return parseInt(numPart, 10) || 0
  })
  const partsB = cleanB.split('.').map(part => {
    const numPart = part.match(/^\d+/)?.[0] || '0'
    return parseInt(numPart, 10) || 0
  })
  
  // 确保两个数组长度一致
  const maxLength = Math.max(partsA.length, partsB.length)
  while (partsA.length < maxLength) partsA.push(0)
  while (partsB.length < maxLength) partsB.push(0)
  
  // 逐位比较
  for (let i = 0; i < maxLength; i++) {
    if (partsA[i] !== partsB[i]) {
      return partsA[i] - partsB[i]
    }
  }
  
  return 0
}

/**
 * 获取Git标签，并返回按版本号排序的标签引用数组。
 * @returns {string[]} Git标签引用数组。  
 */
const getGitTags = (): string[] => {
  try {
    const tagsOutput = execGitCommand('git show-ref --tags')
    const tags = tagsOutput.match(/refs\/tags\/.+/ig) || []
    
    // 按版本号排序（最新的排在最后）
    return tags.sort(compareVersions)
  } catch (e) {
    return []
  }
}

/**  
 * 从标签引用数组中获取指定位置的Git标签。  
 * @param {string[]} tagsArr Git标签引用数组。  
 * @param {number} position 位置索引，-1表示最新，-2表示上一个，以此类推。  
 * @returns {string} 指定位置的Git标签。  
 */  
const getGitTagByPosition = (tagsArr: string[], position: number): string => {
  if (tagsArr.length >= Math.abs(position)) {
    const index = tagsArr.length + position
    if (index >= 0) {
      return tagsArr[index].replace('refs/tags/', '')
    }
  }
  return ''
}

/**  
 * 从标签引用数组中获取最新的Git标签。  
 * @param {string[]} tagsArr Git标签引用数组。  
 * @returns {string} 最新的Git标签。  
 */  
const getLatestGitTag = (tagsArr: string[]): string => {  
  return getGitTagByPosition(tagsArr, -1)
}

/**  
 * 获取Git远程URL中的项目名。  
 * @returns {string} Git远程项目名。  
 */
const getOriginProjectName = (): string => {  
  const remoteOutput = execGitCommand('git remote -v')
  const match = remoteOutput.match(/\/([^\/]+)\.git/)
  if (match) {
    return match[1]
  }
  return ''
}

/**  
 * 获取最后一次Git提交的信息。  
 * @returns {object} 包含提交信息的对象。  
 */  
const getLastGitCommitInfo = (): { commitName: string, commitEmail: string, commitDate: string, commitSubject: string, commitHash: string } => {  
  const commitName = execGitCommand('git log -1 --pretty=format:%cn')
  const commitEmail = execGitCommand('git log -1 --pretty=format:%ce')
  const commitDate = execGitCommand('git log -1 --pretty=format:%ci')
  const commitSubject = execGitCommand('git log -1 --pretty=format:%s')
  const commitHash = execGitCommand('git log -1 --pretty=format:%H')
  return { commitName, commitEmail, commitDate, commitSubject, commitHash }
}

/**  
 * 获取两个tag之间的所有commit subject。  
 * @param {string} latestTag 最新的tag。  
 * @param {string} previousTag 上一个tag。  
 * @returns {string[]} 两个tag之间的所有commit subject数组。  
 */  
const getCommitSubjectsBetweenTags = (latestTag: string, previousTag: string): string[] => {
  if (!latestTag || !previousTag) {
    return []
  }
  
  try {
    const command = `git log ${previousTag}..${latestTag} --pretty=format:%s`
    const output = execGitCommand(command)
    return output ? output.split('\n').filter(subject => subject.trim() !== '') : []
  } catch (error) {
    console.error(`获取tag之间的commit subject出错：`, error)
    return []
  }
}

/**  
 * 获取上一个tag（倒数第二个tag）。  
 * @param {string[]} tagsArr Git标签引用数组。  
 * @returns {string} 上一个tag。  
 */  
const getPreviousGitTag = (tagsArr: string[]): string => {
  return getGitTagByPosition(tagsArr, -2)
}

/**  
 * 获取所有Git提交相关信息。  
 * @param {string} env 环境参数，当为'prod'时获取两个tag之间的所有commit subject。  
 * @returns {object} 包含所有Git提交相关信息的对象。  
 */
export const gitCommitInfo = (env: string = ''): object => {  
  const projectName = getOriginProjectName()
  const branch = getCurrentGitBranch()
  const gitUserName = getGitUserName()
  const gitUserEmail = getGitUserEmail()
  const { commitName, commitEmail, commitDate, commitSubject, commitHash } = getLastGitCommitInfo()
  const tagsArr = getGitTags()
  const latestTag = getLatestGitTag(tagsArr)
  
  // 当env为prod时，获取两个tag之间的所有commit subject
  if (env === 'prod') {
    const previousTag = getPreviousGitTag(tagsArr)
    const commitSubjects = getCommitSubjectsBetweenTags(latestTag, previousTag)
    
    return {
      projectName,
      branch,
      gitUserName,
      gitUserEmail,
      commitName,
      commitEmail,
      commitDate,
      commitSubjects: commitSubjects,  // 返回所有subject的数组
      commitHash,
      latestTag,
      previousTag
    }
  }
  
  // 非prod环境，保持原有逻辑
  return {  
    projectName,  
    branch,  
    gitUserName,  
    gitUserEmail,  
    commitName,  
    commitEmail,  
    commitDate,  
    commitSubject,  // 单个subject
    commitHash,
    latestTag
  }
}
