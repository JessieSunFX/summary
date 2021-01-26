## 愤怒的reduce

```
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]

// A. an error
// B. [9, 0]
// C. [9, NaN]
// D. [9, undefined]
``` 

- 答案是A。MDN文档中关于 Array.prototype.reduce() 写得很清楚：
- 如果数组为空并且没有提供initialValue， 会抛出TypeError 。
- 如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
- 参考资料：
- MDN：Array.prototype.reduce()
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce