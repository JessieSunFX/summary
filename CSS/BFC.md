## BFC
- https://zhuanlan.zhihu.com/p/25321647
- 块级格式化上下文 Block Formatting Context
- 具有 BFC 特性的元素可以看作是隔离了的独立容器，子元素不会在布局上影响到外部元素，也不会受外部元素的影响
- BFC元素不会发生margin重叠，BFC元素也可以清除浮动的影响

### 什么情况下触发BFC?
- \<html>根元素
- 浮动元素：float:left 或 right
- overflow的值为auto、scroll 或 hidden
- display的值为 table-cell、table-caption 或 inline-block
- 绝对定位/固定定位:position:absolute 或 fixed
#### 只要元素符合上面任意一个条件，就无需使用clear:both属性去清除浮动的影响

### BFC用途
1. 去margin重叠- 放在不同的BFC容器中
2. 清除浮动
3. 实现更健壮、更智能的自适应布局- 如阻止元素被浮动元素覆盖

### 适用于自适应布局的BFC
- overflow: hidden/auto IE7及以上版本浏览器
- display: table-cell IE8及以上版本浏览器
- display: inline-block IE6/IE7

### 两套IE7 及以上版本浏览器适配的自适应解决方案
1. 借助 overflow 属性
- 缺点：子元素要定位到父元素外面可能会被隐藏
```
.lbf-content {
    overflow: hidden;
}
```
2. 融合 display:table-cell 和 display: inline-block
- 无法直接让连续英文字符换行
```
.lbf-content{
    display: table-cell;
    width: 9999px;
}
```

### 连续英文换行
```
.word-break {
    display: table;
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
}
```


### 为什么要清除浮动的影响
- 因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素的布局和定位

### float
- left
- right
- none 默认
- inherit

### overflow
- visible 默认
- hidden
- scroll
- auto
- inherit

### position
- absolute
- fixed
- relative
- static 默认
- inherit
