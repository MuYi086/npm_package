# git-commit-export-html

[中文](https://github.com/MuYi086/npm_package/blob/master/git-commit-export-html/README-CN.md '中文')

![npm](https://img.shields.io/npm/v/@muyi086/git-commit-export-html) ![npm bundle size](https://img.shields.io/bundlephobia/min/@muyi086/git-commit-export-html) ![npm](https://img.shields.io/npm/dt/@muyi086/git-commit-export-html) ![GitHub](https://img.shields.io/github/license/MuYi086/npm_package)

## Install
```SHELL
npm install @muyi086/git-commit-export-html
# common JS
const { gitCommitExportHtml } = require('@muyi086/git-commit-export-html')
```

## Use

```JS
const options = {
  since: '2021-02-29', // start time
  until: '2021-04-01', // end time
  number: 1000, // records limit
  // default fields: ['abbrevHash', 'hash', 'subject', 'authorName']
  // hash - the long hash of the commit
  // abbrevHash - the abbreviated commit hash
  // treeHash - the tree hash of the commit
  // abbrevTreeHash - the abbreviated commit hash
  // parentHashes - the parent hashes
  // abbrevParentHashes - the abbreviated parent hashes
  // authorName - author name of the commit
  // authorEmail - author email of the commit
  // authorDate - author date of the commit
  // authorDateRel - relative author date of the commit
  // committerName - committer name
  // committerEmail - committer email
  // committerDate - committer date
  // committerDateRel - relative committer date
  // subject - commit message (first line)
  // body - commit body
  // rawBody - raw body (subject + body)
  // tag - raw tag information of commit
  fields: ['subject', 'authorName', 'authorDate']
}
gitCommitExportHtml(options)
```
