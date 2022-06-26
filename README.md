# webpack的基础使用


```jsx
npm i webpack -g   //全局安装webpack
npm i webpack-cli -g   //webpack-cli 用于在命令行中运行webpack

//直接打包
webpack ./src/main.js --mode development  //开发模式，编译ES module
--mode production  //开发模式，还会压缩代码

//通过配置文件打包
webpack

asset main.js 4.24 KiB [emitted] (name: main)
runtime modules 670 bytes 3 modules
cacheable modules 236 bytes
  ./src/main.js 137 bytes [built] [code generated]
  ./src/js/sum.js 99 bytes [built] [code generated]
webpack 5.73.0 compiled successfully in 58 ms
```

---

## 主要配置

```jsx
module exports = {
	// 入口
    entry: "./src/main.js",  //相对路径
    // 输出
    output: {
        // 文件输出路径
        path: path.resolve(__dirname, "dist"),  //绝对路径
        // 入口文件打包输出目录
        filename: "static/js/main.js",
        // 自动清空path路径下内容
        clean: true,
    },
    // 加载器 loader
    module: {
				rules:{
						//loader配置
				}
		}，
		//插件
    plugins: [

    ],
    // 模式
    mode: "development"   //开发模式
}
```

# 开发模式的使用

### 作用

- 提前进行代码检查，保证代码质量规范
- 编译代码使浏览器可以运行

### 对css处理

```jsx
// 加载器 loader
    module: {
        rules: [
            // loader配置
            {
                text: /\.css$/,  //检测以css结尾文件
                use: [
                    "style-loader",   //通过创建style标签将js中css显示
                    "css-loader",     //将css资源编译成commonjs的模块到js中
                ]
            },
        ],
    },
```

### 对图片的处理

webpack4中需要使用file-loader  url-loader

5中已经内置

```jsx
// 对图片的处理
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于10k图片转化成base64编码,默认转化8k大小图片
                        maxSize: 10 * 1024,
                    }
                }

            }
```

## 分类打包输出到目录

```jsx
generator: {
              filename: 'img/[hash][ext][query]' // 局部指定输出位置
            },

[hash:10]  //哈希值只取10位，缩短文件名减小体积
```

## 字体图标的处理

1. 在相应图标库下载所需图标
2. 将字体文件、css文件一次加入src源文件相应目录下
3. 在html中引用图标
4. 在main.js中导入字体图标css
5. 在webpack中配置

```jsx
{
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",  //不需要转化成base直接以resource源文件输出
        generator: {
            filename: 'static/media/[hash:10][ext][query]' // 局部指定输出位置
	      },
}
```

## 其他资源

1. 配置
    
    音视频资源处理
    
    ```jsx
    test: /\.(mp4|mp3)$/   //直接使用asset处理即可
    type: "asset/resource"
    ```
    

## 设置别名

```jsx
resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          // 下面可以继续新增别名
        }
    }
```

## 对于js资源处理

- 使用Bable处理js兼容性问题
- 使用Eslint检查代码格式

### Eslint检查代码格式

- .eslintrc.js  中配置

```jsx
//安装Eslint插件
npm install eslint-webpack-plugin --save-dev
npm install eslint --save-dev

//引入插件
import EslintPlugin require（“eslint-webpack-plugin”）
```

- 在webpackconfig.js中配置

```jsx
//插件
    plugins: [
        new ESLintPlugin(
            {
                // 检测那些目录下的文件
                context:path.resolve(__dirname,"src")
            }
        ),
    ],
```

- 在 .eslintrc.js

```jsx
module.exports = {
    // 继承eslint规则
    extends: ["eslint:recommended"],
    env: {
        node: true,  //启用node中全局变量
        browser: true,  //启用浏览器中全局变量

    },
    parserOptions: {
        ecmaVersion: 6,  //用来指定你想要使用的 ECMAScript 版本
        sourceType: "module", 
        //设置为 “script” (默认)或"module"（如果代码是 ECMAScript 模块)
        // 对于 ES6+ 的语法和用 import / export 的语法必须用 module. 
    },
    rules: {
        "no-var": 2,
    }
}
```

配置项： [http://eslint.cn/docs/rules/](http://eslint.cn/docs/rules/)

- .eslintignore 存放不需要进行检查的目录或文件

### babel使用

- 安装相应依赖

```jsx
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

- webpack中配置

```jsx
rules:[
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
]
```

- babel.config.js中配置

```jsx
module.exports={
    // 使用智能预设
    presets: ['@babel/preset-env'],
}
```

## 对HTML资源的处理

```jsx
plugins:[
		new HtmlWebpackPlugin(
            {
                // 指定模版文件路径为public下的index.html
                template: path.resolve(__dirname, "public/index.html")
            },
        ),
]
```

- 打包完成后，css文件，js文件会统一放在一个js中

```jsx
<script defer src="static/js/main.js"></script>
```

> defer属性 ：
> 

defer 属性是一个布尔属性。

defer 属性规定当页面已完成加载后，才会执行脚本。

仅适用于外部js引入时使用，且要以src方式引入

## webpack服务器&自动化

- 安装服务器插件

```jsx
npm i webpack-dev-server -D
```

- 搭建开发服务器
    
    开发模式下不会有输出，在内存中运行
    

```jsx
devServer: {
        host: "localhost",  //指定主机ip
        port: 9000,  //指定端口
        open: true,  //是否自动打开浏览器
    },
```

# 生产模式

## 对目录优化

- 创建config目录
    - webpack.dev.js  开发模式config文件
        
        ```jsx
        // 输出
            output: {
                // 开发模式不需要输出
                path: undefined,
                // 入口文件打包输出目录
                filename: "static/js/main.js",
                // // 自动清空上一次打包内容
                // clean: true,
            },
        // 开发服务器
            devServer: {
                host: "localhost",
                port: 9000,
                open: true,
            },
        // 模式
            mode: "development"
        ```
        
    
    运行：webpack serve  —config webpack.dev.js
    
    - webpack.prod.js  生产模式config文件
    
    ```jsx
    // 输出
        output: {
            // 文件输出路径
            path: path.resolve(__dirname, "../dist"),  //绝对路径
            // 入口文件打包输出目录
            filename: "static/js/main.js",
            // 自动清空上一次打包内容
            clean: true,
        },
    // 模式
        mode: "production"
    ```
    
    运行：webpack   —config webpack.prod.js
    
    在pakeage.json中配置指令方便运行
    
    ```jsx
    "scripts": {
        "start": "npm run dev",
        "dev": "webpack serve --config ./config/webpack.dev.js ",
        "build": "webpack --config ./config/webpack.prod.js"
      }
    ```
    

> 注意⚠️：此处配置之后，在相应的webpack.(dev|prod)文件中的入口文件配置处，路径要做更改，否则会报错
> 

<aside>
💡 在package中运行配置文件是在根目录下，在config文件夹中运行，是运行在config目录下

</aside>

### 单独打包css      mini-css-extract-plugin

- 当把css文件和js文件打包到一起时，js会通过一个style标签引入css，在网络较差的环境下，容易造成css加载过慢，出现闪屏现象
- 将css单独打包，通过link标签引入
- 使用****MiniCssExtractPlugin插件****
    
    安装依赖
    
    ```jsx
    npm install --save-dev mini-css-extract-plugin
    ```
    

在webpack.prod.js中配置

```jsx
//引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins:[
		new MiniCssExtractPlugin(
		          {
		              //指定输出路径和名称
		              filename:"static/css/main.css"
		          }
			        ),
]

module: {
        rules: [
						{
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "sass-loader", // 将 Sass 编译成 CSS

                ],
            },
				]
}

//将style.loader改为MiniCssExtractPlugin.loader
```

### css的兼容性处理       postcss-loader

安装依赖

```jsx
npm install --save-dev postcss-loader postcss postcss-preset-env
```

配置

> 注意⚠️：这个lodaer必须放在css-lodaer下面less-loader上面
> 

```jsx
//在webpack.prod.js中配置loader
{
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                "postcss-preset-env",
            ]
        }
    }
},

//在package.json中配置需要兼容的浏览器列表
"browserslist": [
    ">1%"              //适配99%的浏览器
		"last 2 version"   //适配最近两个版本
		"not dead"         //还在正常使用的版本
  ]
```

## 封装loader函数

```jsx
//封装loader函数
function getLoader(opt) {   //传参可以为sass或less等loader
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
    ].filter(Boolean)   //过滤掉 undefined的opt
}
```

## 对css进行压缩

安装插件

```jsx
npm install css-minimizer-webpack-plugin --save-dev
```

使用插件

```jsx
pulgins:[
		new CssMinimizerPlugin(),
]

```

## 对html，js进行压缩

webpack打包过程中会自动进行压缩