## 触发 BFC 的条件(满足任一即可)

1. overflow:hidden, auto, scroll

	- 唯一问题就是容器盒子外的元素会被隐藏

1. float: left,right: 

	- 浮动元素失去了元素自身流体自适应性, 无法自适应填满容器

1. 绝对定位或固定定位: position:absolute, fixed; 

	- 脱离文档流太严重

1. display: inline-block
	
	- 会出现元素尺寸收缩, 无法自适应填满容器
	- 但是IE6/7: 会自适应填满容器

1. display: table-cell
	
	- 缺点1: 宽度随内容变化, 无法自适应填满容器
	- 但是1: 可以设置一个超大宽度, table-cell元素设置的宽度再大, 实际宽度也不会超过容器的宽度, 所以可以设置非常大的宽度9999px, 从而实现自适应填满容器
	- 缺点2: 应付连续英文字符换行会吃力

1. display: table-row
	
	- 对width无感, 无法自适应填满容器

1. display: table-caption

	- 一般不用

1. 根元素，即 HTML 元素

## 推荐的BFC触发条件

> 自适应铺满容器

```css
.bfc{
	overflow:hidden;
}
```

```css
/* 缺点: 连续英文字符无法换行 */
.bfc {
　display: table-cell; 
	width: 9999px;
}

/* 解决: 连续英文字符无法换行 */
.word-break {
　display: table;
　width: 100%;
　table-layout: fixed;
　word-break: break-all;
}
```

