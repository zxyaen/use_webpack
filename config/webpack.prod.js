const path = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

//封装loader函数
function getLoader(opt) {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader", // 将 CSS 转化成 CommonJS 模块
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",
                    ],
                },
            }
        },
        opt,
    ].filter(Boolean)
}


module.exports = {
    // 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        // 文件输出路径
        path: path.resolve(__dirname, "../dist"),  //绝对路径
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
                use: getLoader(),
            },
            // 处理scss
            {
                test: /\.s[ac]ss$/,
                use: getLoader("sass-loader")
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
            // 对字体图标的处理
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: 'static/media/[hash:10][ext][query]' // 局部指定输出位置
                },
            },
            // 对于babel处理
            {
                test: /\.js$/,
                exclude: /(node_modules)/,  //排除
                use: {  //use可省略
                    loader: 'babel-loader',
                    // options: {       在外面文件夹单独配置方便后期修改
                    //     presets: ['@babel/preset-env']
                    // }
                }
            }
        ]
    },
    //插件
    plugins: [
        // eslint语法检查插件
        new ESLintPlugin(
            {
                // 检测那些目录下的文件
                context: path.resolve(__dirname, "../src")
            }
        ),
        // html自动引入js文件插件
        new HtmlWebpackPlugin(
            {
                // 指定模版文件路径为public下的index.html
                template: path.resolve(__dirname, "../public/index.html")
            },
        ),
        new MiniCssExtractPlugin(
            {
                //指定输出路径和名称
                filename: "static/css/main.css"
            }
        ),
        new CssMinimizerPlugin(),
    ],

    // 模式
    mode: "production"
}