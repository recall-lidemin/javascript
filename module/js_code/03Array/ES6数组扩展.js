/** 
 * 
 * ES6数组扩展
 * 
 */

// 1.扩展运算符（...）
// 它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
// 他可以把数组变成参数序列
let arr = [1, 2, 3]

console.log(...arr); // print: 1  2  3
let arr1 = [1, 2]

arr.push(...arr1)
console.log(arr); // print: [ 1, 2, 3, 1, 2 ]

// arr.push(arr1)
// console.log(arr); // print: [ 1, 2, 3, [ 1, 2 ] ]

// ----------------------------应用-----------------------------
// 1.1 替代了 apply 方法
let arr2 = [2, 5, 4, 3]
// console.log(Math.max.apply(null, arr2));
console.log(Math.max(...arr2));

// 1.2 复制数组(浅拷贝)
let array = [1, 2, 3]
// let newarray = [...array]
let [...newarray] = array // 解构赋值
console.log(newarray);

// 1.3 合并数组
let array1 = [4, 5, 6]
let newarr1 = [...array, ...array1]
console.log(newarray, newarr1);

// 1.4解构赋值，用于数组赋值，只能放在最后一位，不然会报错
// let [...first, rest] = [1, 2, 3, 4] // 报错：Rest element must be last element
let [first, ...rest] = [1, 2, 3, 4]
console.log(first, rest); // print: 1,[2,3,4]

// 1.5 实现了 Iterator 接口的对象
// 真实数组 = [...伪数组]

// 1.6 Map 和 Set 结构，Generator 函数