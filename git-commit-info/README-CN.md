# git-commit-info

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/git-commit-info) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/git-commit-info) ![npm](https://img.shields.io/npm/dt/@muyi086/git-commit-info) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/git-commit-info
# common JS
const { gitCommitInfo } = require('@muyi086/git-commit-info')
```

## 使用
```JS
const {
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
} = gitCommitInfo()
// 远程仓库名、分支、当前用户名、当前用户邮箱、提交用户名、提交用户邮箱、提交日期、提交主题、提交哈希、最近标签
console.log(projectName, branch, gitUserName, gitUserEmail, commitName, commitEmail, commitDate, commitSubject, commitHash, latestTag)
```