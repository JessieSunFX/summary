## margin:auto
- 《CSS世界》4.3.4 深入理解CSS中的margin:auto;

### 前置知识
1. 有时候元素没有设置width或height,也会自动填充；

```
<div></div>
```
- 此<div>宽度会自动填满容器

2. 有时候元素没有设置width或height,也会自动填充对应的方位；
```
div{
    position: absolute;
    left: 0;
    right: 0;
}
```
- 此时<div>宽度会自动填满包含块容器；

- 如果设置width或height,自动填充特性就会被覆盖；
- margin:auto就是为了填充闲置的尺寸而设计的。

### margin:auto填充规则：
1. 如果一侧定值，一侧auto,则auto为剩余空间大小；
```
.father{
    width: 300px;
}
.son{
    width: 200px;
    margin-right: 80px;
    margin-left auto;
}
```
- 左边距20px;
- margin的‘auto’不是摆设，是具有强烈的计算意味的关键字，用来计算元素对应方向应该获得的剩余间距大小。
- 由于css世界中margin的初始值是0，因此，上面例子如果margin-right缺失，实现的效果正好是块级元素右对齐；
```
.son{
    width: 200px;
    margin-left: auto;
}
```
- 想让块级元素右对齐，不要就一个float:right，很多时候margin-left:auto才是最佳实践；
- margin属性的auto计算就是为块级元素左中右对齐而设计的，和内联元素使用text-align控制左中右对齐遥相呼应！

2. 如果两侧均auto,则平分剩余空间；

### margin:atuo 疑问-- 为什么明明容器定高、元素定高，margin:auto却无法垂直居中？
```
.father{
    height: 200px;
}
.son{
    height: 100px;
    margin: auto;
}
```
- 原因在于触发margin:auto计算有一个前提条件，就是width或height为auto时，元素是具有对应方向的自动填充特性的。
- 解决方法1：用writing-mode改变文档流的方向：
```
.father{
    height: 200px;
    writing-mode: vertical-lr;
}
.son{
    height: 100px;
    margin: auto;
}
```
- 缺点：水平方向无法居中；

- 解决方法2: 绝对定位元素的margin:auto居中；
```
.father{
    height: 200px;
    position: relative;
}
.son{
    pisition: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
```
- 此时，.son这个元素的尺寸表现为“格式化宽度和格式化高度”，和<div>的“正常流宽度”一样，同属于外部尺寸，也就是尺寸自动填充父级元素的可用尺寸。
- 此时，给.son设置尺寸：
```
.son{
    pisition: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 100px;
}
```
- 宽高被限制，原本应该填充的空间被空余了出来，这多余的空间就是margin:auto计算的空间，这时再设置margin:auto:
```
.son{
    pisition: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 100px;
    margin: auto;
}
```
- .son元素就水平方向和垂直方向同时居中了，因为auto正好把上下左右剩余空间全部等分。
- 注意：跟先后顺序没有关系，top等放到最后也一样；
- 由于绝对定位元素的格式化高度即使父元素height:auto也是支持的，因此其应用场景相当广泛；
- 不足：IE8及以上版本浏览器才支持。

### margin:atuo 疑问-- 元素尺寸比外面的大，auto该怎么计算？
- 剩余可用空间都没有了，会被当作0来处理，也就是auto会被计算成0，相当于没有设置margin属性值。

### 替换元素margin:auto
- 对于替换元素，设置display:block,margin:auto计算规则同样适合。



