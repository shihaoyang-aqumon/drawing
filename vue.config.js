
const path  = require('path')
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports= {
    publicPath: './', // 部署应用包时的基本URL
    outputDir: 'dist', // 打包生成的目录
    assetsDir: process.env.NODE_ENV, // 静态文件放置目录
    indexPath: 'main.html', // 输出路径，相对于outputDir
    filenameHashing: true, // 生成的静态资源文件名包含hash
    lintOnSave: true, // 每次保存代码时需要通过lint 
    productionSourceMap: !IS_PROD, // 去掉打包生成map文件
    chainWebpack: (config) => {
        config.resolve.symlinks(true)
    },
    configureWebpack: (config) =>{
        if( process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            let optimization = {
                runtimeChunk: 'single',
                splitChunk: {
                    chunks: 'all',
                    maxInitialRequest: Infinity,
                    minSize: 20000,
                }
            }
        }
    },
    css: {
        extract: true,  // 将组件中的css提取到一个独立的css文件中
    }
}
