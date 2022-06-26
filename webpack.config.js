const path = require("path")
const EslintPlugin = require("eslint-webpack-plugin")



module.exports = {
    // 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        // 文件输出路径
        path: path.resolve(__dirname, "dist"),  //绝对路径
        // 入口文件打包输出目录
        filename: "static/js/main.js",
        // 自动清空上一次打包内容
        clean: true,
    },
    // 加载器 loader
    module: {
        rules: [
            // loader配置
            // 处理css
            {
                test: /\.css$/,  //检测以css结尾文件
                use: [

                    "style-loader",   //通过创建style标签将js中css显示
                    "css-loader",     //将css资源编译成commonjs的模块到js中
                ]
            },
            // 处理scss
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }
                ],
            },
            // 对图片的处理
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于10k图片转化成base64编码,默认转化8k大小图片
                        maxSize: 10 * 1024,
                    }
                },

                generator: {
                    filename: 'static/img/[hash:10][ext][query]' // 局部指定输出位置
                },
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: 'static/media/[hash:10][ext][query]' // 局部指定输出位置
                },
            }
        ]
    },
    //插件
    plugins: [
        new ESLintPlugin(
            {
                // 检测那些目录下的文件
                context:path.resolve(__dirname,"src")
            }
        ),
    ],
    // 模式
    mode: "development"
}