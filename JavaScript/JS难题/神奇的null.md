## 神奇的null

```
[typeof null, null instanceof Object]

// A. ["object", false]
// B. [null, false]
// C. ["object", true]
// D. other
```

- 答案是A。
- 在MDN关于 null 的文档中也特别指出来了，typeof null 的结果是 "object"，它是ECMAScript的bug，其实应该是 "null"。但这个bug由来已久，在JavaScript中已经存在了将近二十年，也许永远不会修复，因为这牵扯到太多的Web系统，修复它会产生更多的bug，令许多系统无法正常工作。
- 而 instanceof 运算符是用来测试一个对象在其原型链构造函数上是否具有 prototype 属性，null 值并不是以 Object 原型创建出来的，所以 null instanceof Object 返回 false。

- 参考资料：
- MDN：null
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null
- MDN：instanceof
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
- CSDN博客：null instanceof Object 求解？
- https://bbs.csdn.net/topics/370040293

