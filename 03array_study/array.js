const arr1 = [1, 2, 3, 5]
const arr2 = ['利息', 'String', 'Word']

// 判断是否为数组，是返回true
Array.isArray(arr1)

// concat 合并数组，返回新数组
let arr3 = arr1.concat(arr2)

// every() 测试数组中每一项是否都符合指定函数的筛选，返回布尔
console.log(arr1.every(item => item < 6));

// some() 测试数组中是否至少有一项符合函数筛选，返回布尔
console.log(arr1.some(item => item > 3));

// filter() 返回一个新数组，为全部通过函数条件的值
console.log(arr1.filter(item => item > 2));

// find()或findIndex() 返回数组中第一个符合数组筛选条件的值或索引
console.log(arr1.find(item => item > 2), arr1.findIndex(item => item > 2));

// forEach() 遍历数组
arr1.forEach((item, index) => {
    console.log(item, index);
})

// includes 判断数组中是否包含一个指定的值，存在返回true
console.log(arr1.includes(2));

// join() 将数组所有元素拼接成字符串
console.log(arr1.join(''), arr2.join(''));

// keys(),返回数组中所有元素索引的对象
console.log(arr1.keys());

// map 方法创建一个新数组，元素是符合函数筛选后的
console.log(arr1.map(item => item * 2));

// pop push 从尾部删除或添加 unshift shift从头部添加或删除

// reverse() 反转数组
arr1.reverse()
console.log(arr1);

// slice() 截取数组，包含begin，不包含end
console.log(arr1.slice(1, 2));

// splice() 删除，替换
arr1.splice(2, 1, 5)
console.log(arr1);