# git-commit-export-html

[English](./README.md 'English')

![npm](https://img.shields.io/npm/v/@muyi086/git-commit-export-html) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/git-commit-export-html) ![npm](https://img.shields.io/npm/dt/@muyi086/git-commit-export-html) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## 安装
```SHELL
npm install @muyi086/git-commit-export-html
# common JS
const gitCommitExportHtml = require('@muyi086/git-commit-export-html')
```

## 使用

```JS
const options = {
  since: '2021-02-29', // 开始时间
  until: '2021-04-01', // 结束时间
  number: 1000, // 获取的条数
  // default fields: ['abbrevHash', 'hash', 'subject', 'authorName']
  // hash - 长哈希
  // abbrevHash - 简写哈希
  // treeHash - 树哈希
  // abbrevTreeHash - 简写树哈希
  // parentHashes - 父哈希
  // abbrevParentHashes - 简写父哈希
  // authorName - commit作者名称
  // authorEmail - commit作者邮箱
  // authorDate - commit作者日期
  // authorDateRel - commit作者相对日期
  // committerName - 提交人姓名
  // committerEmail - 提交人邮箱
  // committerDate - 提交人日期
  // committerDateRel - 提交人相对日期
  // subject - 提交主题
  // body - 提交主体
  // rawBody - raw body (subject + body)
  // tag - 提交raw tag
  fields: ['subject', 'authorName', 'authorDate']
}
gitCommitExportHtml(options)
```
