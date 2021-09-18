
//为重置alias做准备
const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)
}

const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');


let baseUrl = '';
if(process.env.NODE_ENV == 'production') baseUrl = 'production-sub-path';

const targetApi = 'http://192.168.10.223:8081/';



module.exports = {
    publicPath:baseUrl,
    lintOnSave:false,    //关闭eslint检查
    productionSourceMap:false,
    devServer: {
        publicPath:baseUrl,
        host:'0.0.0.0',
        port:2222,
        proxy:{
           '/':{
               //目标api地址
               target:targetApi,
               pathRewrite:{'^/api':'/'},
               //将主机标头的原点更改为目标url.
               changeOrigin:true,
               //如果要代理 websockets
               ws:false
           }
        },
        overlay: {
            warnings: false, //不显示警告
            errors: false	//不显示错误
        }
    },
    css:{
        //是否使用css分离插件 ExtractTextPlugin
        extract:false,
        sourceMap:false,
        modules:false,
    },
    //重置alias
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@pages", resolve("src/pages"))
    },
    configureWebpack: config => {
        let plugins = [
            new TerserPlugin({
                terserOptions: {
                    warnings:false,
                    compress:{
                        drop_console:false,
                        drop_debugger:false,
                    },
                    output:{
                        //去掉注释内容
                        comments:false,
                    }
                },
                sourceMap:true,
                parallel:true,
            }),
            // new BundleAnalyzerPlugin({
            //     analyzerPort:9999
            // }),
            new CompressionPlugin({
                test:/\.js$|\.html$|.\css/,
                threshold: 10240, //对超过10k的数据压缩
                deleteOriginalAssets: false, //不删除源文件
            })
        ];
        if(process.env.NODE_ENV == 'production'){
            config.plugins = [...config.plugins, ...plugins];
        }
    }
}