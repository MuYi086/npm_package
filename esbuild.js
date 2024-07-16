const { build } = require('esbuild')
// 输出为CommonJS格式  
build({  
  entryPoints: ['qs/lib/index.ts'], // 入口文件  
  outfile: 'qs/lib/index.min.cjs', // 输出文件  
  format: 'cjs', // 输出为CommonJS格式  
  minify: true, // 压缩代码
  bundle: true, // 打包成单个文件  
}).catch(() => process.exit(1))

// 输出为ES Modules格式  
build({  
  entryPoints: ['qs/lib/index.ts'], // 入口文件  
  outfile: 'qs/lib/index.min.mjs', // 输出文件  
  format: 'esm', // 输出为ES Modules格式
  minify: true, // 压缩代码
  bundle: true, // 打包成单个文件s
}).catch(() => process.exit(1))