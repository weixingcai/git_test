const path = require("path"); //调用node.js中的路径
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //删除输出目中之前旧的文件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: {
    index: "./src/App" //需要打包的文件
  },
  output: {
    // filename: "[name].[chunkhash:8].js", //增加8位的哈希值  //输入的文件名是什么，生成的文件名也是什么
    filename: "[name].js", ////输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, "./out") //指定生成的文件目录
  },
  mode: "development", //开发模式，没有对js等文件压缩，默认生成的是压缩文件
  module: {
    rules: [
        {
        test:/\.vue$/,
        use:['vue-loader']
    },{
        test:/\.css$/,
        use:['style-loader','css-loader','sass-loader']
    },{
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
    },{
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader:'url-loader',
        options: {
          limit:1,
          name:'[name].[hash:7].[ext]'
        }
    }, {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
      },
        // {
      //   test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader:'url-loader',
      //   options: {
      //     limit:1,
      //     name:'[name].[hash:7].[ext]'
      //   }
      // },{
      //   test:/\.(js|vue)$/,
      //       loader: 'eslint-loader',
      //       enforce: "pre",
      //       options: {
      //           formatter:require('eslint-friendly-formatter'),
      //           emitWarning:false
      //       }
      //   }
    ]
  },
  //其他解决方案配置
  resolve: {
    extensions: ['*', '.js', '.json', '.css', '.scss', '.vue']//添加在此的后缀所对应的文件可以省略后缀
  },
  plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin()
  ]
};
