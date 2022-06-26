// 入口文件

// import con from "./js/console.log";
import sum from "./js/sum";

// 引入样式文件
import "./css/index.css"
import "./scss/index.scss"

// 引入字体文件
import "./css/iconfont.css"

// console.log(con());
console.log(sum(2, 4, 6, 8, 11));

// 配置eslint完成后，由于禁用了var，所以此处使用var定义变量无法编译通过
// var res = sum(1, 2)
// console.log(res);