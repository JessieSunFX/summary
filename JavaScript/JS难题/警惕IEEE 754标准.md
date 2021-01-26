## 警惕IEEE 754标准

```
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
[two - one == one, eight - six == two]

// A. [true, false]
// B. [false, false]
// C. [true, false]
// D. other
```

- 答案是C。JavaScript中采用 双精度浮点数 格式，即IEEE 754标准。在该格式下，有些数字无法表示出来，比如：0.1 + 0.2 = 0.30000000000000004 ，这不是JavaScript的锅，所有采用该标准的语言都有这个问题，比如：Java、Python等。

- 参考资料：
- Wiki：Double-precision floating-point format
- https://en.wikipedia.org/wiki/Double-precision_floating-point_format

- 解决方案：
- bignumber.js
- https://zhuanlan.zhihu.com/p/100380291
- https://github.com/MikeMcl/bignumber.js
