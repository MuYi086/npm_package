const { build } = require('esbuild')
const path = require('path')
const chalk = require('chalk')

/**
 * 执行build命令
 * @param {*} inputFilePath 入口文件
 * @param {*} outputPath 输出文件
 * @param {*} format 格式: esm, cjs
 * @param {*} platform 运行平台: node, browser, neutral
 * @param {*} minify // 压缩代码
 * @param {*} bundle // 打包成单个文件
 * @returns promise
 */
const excuteBuild = (inputFilePath, outputPath, format = 'cjs', platform = 'neutral', minify = true, bundle = true) => {
  return build({
    entryPoints: [path.resolve(inputFilePath)],
    outfile: path.resolve(outputPath),
    format,
    platform: platform,
    minify,
    bundle,
  })
}

/**
 * 编译脚本
 */
const compileScript = async () => {
  const calInputFilePath = 'cal/lib/index.ts'
  const calOutputCjsPath = 'cal/lib/index.min.cjs'
  const calOutputMjsPath = 'cal/lib/index.min.mjs'
  const calendarInputFilePath = 'calendar/lib/index.ts'
  const calendarOutputCjsPath = 'calendar/lib/index.min.cjs'
  const calendarOutputMjsPath = 'calendar/lib/index.min.mjs'
  const gitCommitExportHtmlInputFilePath = 'git-commit-export-html/lib/index.ts'
  const gitCommitExportHtmlOutputCjsPath = 'git-commit-export-html/lib/index.min.cjs'
  const gitCommitInfoInputFilePath = 'git-commit-info/lib/index.ts'
  const gitCommitInfoOutputCjsPath = 'git-commit-info/lib/index.min.cjs'
  const imgCompressInputFilePath = 'img-compress/lib/index.ts'
  const imgCompressOutputCjsPath = 'img-compress/lib/index.min.cjs'
  const imgCompressOutputMjsPath = 'img-compress/lib/index.min.mjs'
  const imgToBase64InputFilePath = 'img-to-base64/lib/index.ts'
  const imgToBase64OutputCjsPath = 'img-to-base64/lib/index.min.cjs'
  const imgToBase64OutputMjsPath = 'img-to-base64/lib/index.min.mjs'
  const qsInputFilePath = 'qs/lib/index.ts'
  const qsOutputCjsPath = 'qs/lib/index.min.cjs'
  const qsOutputMjsPath = 'qs/lib/index.min.mjs'
  const validatorInputFilePath = 'validator/lib/index.js'
  const validatorOutputCjsPath = 'validator/lib/index.min.cjs'
  const validatorOutputMjsPath = 'validator/lib/index.min.mjs'
  const varTypeInputFilePath = 'var-type/lib/index.js'
  const varTypeOutputCjsPath = 'var-type/lib/index.min.cjs'
  const varTypeOutputMjsPath = 'var-type/lib/index.min.mjs'
  const verifyCodeInputFilePath = 'verify-code/lib/index.ts'
  const verifyCodeOutputCjsPath = 'verify-code/lib/index.min.cjs'
  const verifyCodeOutputMjsPath = 'verify-code/lib/index.min.mjs'
  try {
    console.log(chalk.blue('-------------------------编译/cal----------------------'))
    await excuteBuild(calInputFilePath, calOutputCjsPath, 'cjs')
    await excuteBuild(calInputFilePath, calOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/calendar----------------------'))
    await excuteBuild(calendarInputFilePath, calendarOutputCjsPath, 'cjs')
    await excuteBuild(calendarInputFilePath, calendarOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/git-commit-export-html----------------------'))
    // await excuteBuild(gitCommitExportHtmlInputFilePath, gitCommitExportHtmlOutputCjsPath, 'cjs', 'node')
    console.log(chalk.blue('-------------------------编译/git-commit-info----------------------'))
    await excuteBuild(gitCommitInfoInputFilePath, gitCommitInfoOutputCjsPath, 'cjs', 'node')
    console.log(chalk.blue('-------------------------编译/img-compress----------------------'))
    await excuteBuild(imgCompressInputFilePath, imgCompressOutputCjsPath, 'cjs')
    await excuteBuild(imgCompressInputFilePath, imgCompressOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/img-to-base64----------------------'))
    await excuteBuild(imgToBase64InputFilePath, imgToBase64OutputCjsPath, 'cjs')
    await excuteBuild(imgToBase64InputFilePath, imgToBase64OutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/qs----------------------'))
    await excuteBuild(qsInputFilePath, qsOutputCjsPath, 'cjs')
    await excuteBuild(qsInputFilePath, qsOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/validator----------------------'))
    await excuteBuild(validatorInputFilePath, validatorOutputCjsPath, 'cjs')
    await excuteBuild(validatorInputFilePath, validatorOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/var-type----------------------'))
    await excuteBuild(varTypeInputFilePath, varTypeOutputCjsPath, 'cjs')
    await excuteBuild(varTypeInputFilePath, varTypeOutputMjsPath, 'esm')
    console.log(chalk.blue('-------------------------编译/verify-code----------------------'))
    await excuteBuild(verifyCodeInputFilePath, verifyCodeOutputCjsPath, 'cjs')
    await excuteBuild(verifyCodeInputFilePath, verifyCodeOutputMjsPath, 'esm')
    console.log(chalk.green('编译完成,全部成功!'))
  } catch (e) {
    console.error(chalk.red('编译失败', e))
    process.exit(1)
  }
}

compileScript()
