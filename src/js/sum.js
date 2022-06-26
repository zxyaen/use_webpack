// 累加模块
export default function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
}