## parseInt 遇上 map

```
["1", "2", "3"].map(parseInt)

// A. ["1", "2", "3"]
// B. [1, 2, 3]
// C. [0, 1, 2]
// D. other
```

- 答案是D。实际上返回的结果是 [1, NaN, NaN] ，因为 parseInt 函数只需要两个参数 parseInt(value, radix) ，而 map 的回调函数需要三个参数 callback(currentValue, index, array)。

- MDN文档中指明 parseInt 第二个参数是一个2到36之间的整数值，用于指定转换中采用的基数。如果省略该参数或其值为0，则数字将以10为基础来解析。

- 如果该参数小于2或者大于36，则 parseInt 返回 NaN。此外，转换失败也会返回 NaN。

- 现在来分析问题。parseInt("1", 0) 的结果是当作十进制来解析，返回 1；parseInt("2", 1) 的第二个参数非法，返回 NaN；parseInt("3", 2) 在二进制中，"3" 是非法字符，转换失败，返回 NaN。

- 参考资料：
- MDN: Array.prototype.map()
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- MDN: parseInt
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt

## parseInt小贼
```
parseInt(3, 8);
parseInt(3, 2);
parseInt(3, 0);

// A. 3, 3, 3
// B. 3, 3, NaN
// C. 3, NaN, NaN
// D. other
```

- 答案是D。实际结果是 3, NaN, 3。

## 淘气的map

```
var ary = Array(3);
ary[0] = 2;
ary.map(function(elem) {
  return "1";
});

// A. [2, 1, 1]
// B. ["1", "1", "1"]
// C. [2, "1", "1"]
// D. other
```

- 答案是D。实际上结果是 ["1", empty x 2]，因为规范写得很清楚：

- map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值组合起来形成一个新数组。callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
- 被赋值为 undefined 的索引 callback 也会被调用；

- 参考资料：
- MDN: Array.prototype.map()