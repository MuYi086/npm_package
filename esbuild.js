const { build } = require('esbuild')
const path = require('path')
const excuteBuild = (inputFilePath, outputPath, format = 'cjs', platform = 'neutral', minify = true, bundle = true) => {
  return build({
    entryPoints: [path.resolve(inputFilePath)], // 入口文件
    outfile: path.resolve(outputPath), // 输出文件 
    format, // 输出为CommonJS格式: esm, cjs
    platform: platform, // 使用platform: node, browser, neutral
    minify, // 压缩代码
    bundle, // 打包成单个文件
  })
}

const compileScript = async () => {
  const inputFilePath = 'git-commit-info/lib/index.ts'
  const outputCjsPath = 'git-commit-info/lib/index.min.cjs'
  const outputMjsPath = 'git-commit-info/lib/index.min.mjs'
  try {
    await excuteBuild(inputFilePath, outputCjsPath, 'cjs', 'node')
    // await excuteBuild(inputFilePath, outputMjsPath, 'esm', 'node')
    console.log('编译成功!')
  } catch (e) {
    console.error('编译失败', e)
    process.exit(1)
  }
}

compileScript()

// console.log('-------------------------git-commit-info----------------------')
// build({
//   entryPoints: ['git-commit-info/lib/index.ts'], // 入口文件
//   outfile: 'git-commit-info/lib/index.min.cjs', // 输出文件 
//   format: 'cjs', // 输出为CommonJS格式
//   minify: true, // 压缩代码
//   bundle: true, // 打包成单个文件
// }).catch(() => process.exit(1))

// // 输出为ES Modules格式  
// build({
//   entryPoints: ['git-commit-info/lib/index.ts'], // 入口文件
//   outfile: 'git-commit-info/lib/index.min.mjs', // 输出文件 
//   format: 'esm', // 输出为ES Modules格式
//   minify: true, // 压缩代码
//   bundle: true, // 打包成单个文件
// }).catch(() => process.exit(1))