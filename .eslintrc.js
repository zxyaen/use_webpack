//eslint配置文件

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