## meta标签viewport 
- https://www.cnblogs.com/gaogch/p/10628613.html

- 浏览器默认的viewport 叫做 layout viewport, 这个layout viewport的宽度可以通过 document.documentElement.clientWidth 来获取
- 浏览器可视区域的大小，叫 visual viewport,它的宽度可以通过 window.innerWidth 来获取
- 移动设备的理想viewport，ideal viewport

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
- 让当前viewport的宽度等于设备的宽度
- meta viewport 有6个属性

|  |  |
| --- | --- |
| width | 设置layout viewport的宽度，为一个正整数，或字符串“device-width” |  
| initial-scale	| 设置页面的初始缩放值，为一个数字，可以带小数 |
| minimum-scale |  允许用户的最小缩放值，为一个数字，可以带小数 |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数 |
| height | 设置layout viewport  的高度，这个属性对我们并不重要，很少使用 |
| user-scalable | 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许 |

