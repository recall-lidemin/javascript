const arr = [1, 5, 45, 5, 1]

// 利用集合Set实现数组去重,集合set只会存储唯一值,返回一个set对象
// Array.from() 转换为数组

// const newarr = (arr) => Array.from(new Set(arr))
// console.log(newarr(arr));

// 原生去重
function removal(arr) {
    let newarr = []
    let flag = false
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < newarr.length; j++) {
            if (arr[i] === newarr[j]) {
                flag = true
                break
            }
        }
        if (!flag) {
            newarr[newarr.length] = arr[i]
        }
    }
    return newarr
}

console.log(removal(arr));