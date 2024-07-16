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
 * 获取Git标签，并返回标签引用数组。
 * @returns {string[]} Git标签引用数组。  
 */
const getGitTags = (): string[] => {
  try {
    const tagsOutput = execGitCommand('git show-ref --tags')
    return tagsOutput.match(/refs\/tags\/.+/ig) || []
  } catch (e) {
    return []
  }
}

/**  
 * 从标签引用数组中获取最新的Git标签。  
 * @param {string[]} tagsArr Git标签引用数组。  
 * @returns {string} 最新的Git标签。  
 */  
const getLatestGitTag = (tagsArr: string[]): string => {  
  if (tagsArr.length > 0) {
    return tagsArr[tagsArr.length - 1].replace('refs/tags/', '')
  }
  return ''
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
 * 获取所有Git提交相关信息。  
 * @returns {object} 包含所有Git提交相关信息的对象。  
 */
export const gitCommitInfo = (): object => {  
  const projectName = getOriginProjectName()
  const branch = getCurrentGitBranch()
  const gitUserName = getGitUserName()
  const gitUserEmail = getGitUserEmail()
  const { commitName, commitEmail, commitDate, commitSubject, commitHash } = getLastGitCommitInfo()
  const tagsArr = getGitTags()
  const latestTag = getLatestGitTag(tagsArr)
  return {  
    projectName,  
    branch,  
    gitUserName,  
    gitUserEmail,  
    commitName,  
    commitEmail,  
    commitDate,  
    commitSubject,  
    commitHash,  
    latestTag  
  }
}
