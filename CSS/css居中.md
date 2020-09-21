## 水平居中

### 内联元素（inline、inline-*）
- 此类元素需要水平居中，则父级元素必须是块级元素(block level)，且父级元素上需要这样设置样式：
```
.parent {
    text-align: center;
}
```

### 块级元素
- 块级元素水平居中，需要设置margin-left和margin-right为auto，且需要显示设置宽度，不然就占满整行，就无所谓水平居中了。
```
.block {
    width: 300px;
    margin: 0 auto;
}
```

### 同一行多个块级元素
- 如果是在同一行里需要居中多个块级元素，可以尝试下面的两种方法：
```
/* 方法一 */
.parent {
    text-align: center;
}
.parent div {
    display: inline-block;
}
/* 方法二 */
.parent {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
```

## 垂直居中

### 单行文本
- 通过设置上下内间距一致达到垂直居中的效果：
```
.single-line {
    padding-top: 10px;
    padding-bottom: 10px;
}
```
- 通过设置height和line-height一致达到垂直居中：
```
.single-line {
    height: 100px;
    line-height: 100px;
}
```

### 多行文本
- 通过使用表格来垂直居中，但是这种方法显得很累赘：
```
<table>
    <tbody>
        <tr>
            <td>通过表格使得多行文本自动垂直居中通过表格使得多行文本自动垂直居中通过表格使得多行文本自动垂直居中</td>
        </tr>
    </tbody>
</table>
```

- 通过设置vertical-align属性和将元素设置为table-cell，且父元素要设置为table元素，这个和上面那种原理其实是一样的：
```
.parent {
    display: table;
}
.parent div {
    display: table-cell;
    vertical-align: middle;
}
```

- 通过伸缩盒来垂直居中：
```
.flex-vertically {
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
}
```

### 块级元素垂直居中
- 知道块元素的高度，那么使用绝对定位和负的margin即可实现垂直居中：
```
.parent {
    position: relative;
}
.parent div {
    position: absolute;
    top: 50%;
    height: 50px;
    margin-top: -25px;
}
```

- 块级元素高度是可变的，这个时候就需要用transform的Y轴平移来实现了：
```
.parent {
    position: relative;
}
.parent div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

- 也可以使用flex:
```
.parent {
   -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
}
```

- 如果对于块级元素高度不是固定的，且不由内容决定，那么还可以这么设置：
```
.parent {
    position: relative;
}
.parent div {
    position: absolute;
    top: 30%;
    bottom: 30%; 
}
```

## 水平垂直居中
### 知道宽高的盒子
```
.parent {
    position: realtive;
}
.parent div {
    width: 300px;
    height: 300px;
    posotion: absoltue;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
}
```

### 不知道宽高的盒子
```
.parent {
    position: realtive;
}
.parent div {
    posotion: absoltue;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);   
}
```
### 使用flex
```
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 设置为table元素
```
<div class="a">
    <div class="b">
        <div class="c">
        </div>
    </div>
</div>
.a{
    display: table;
    width:100%;
    height:100px;
}
.b{
    display: table-cell;
    vertical-align: middle;
}
.c{
  width:30px;
  margin: 0 auto;
}
```