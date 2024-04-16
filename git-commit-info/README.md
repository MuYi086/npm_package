# git-commit-info

[中文](https://github.com/MuYi086/npm_package/blob/master/git-commit-info/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/git-commit-info) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/git-commit-info) ![npm](https://img.shields.io/npm/dt/@muyi086/git-commit-info) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/git-commit-info
# common JS
const gitCommitInfo = require('@muyi086/git-commit-info')
```

## Use
```JS
const { 
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
// branch, gitUserName, gitUserEmail, commitName, commitEmail, commitDate, commitSubject, commitHash, latestTag
console.log(branch, gitUserName, gitUserEmail, commitName, commitEmail, commitDate, commitSubject, commitHash, latestTag)
```