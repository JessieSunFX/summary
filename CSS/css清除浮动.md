## css清除浮动

### 父级元素设置高度，手动撑开
### 浮动元素结尾增加空标签，设置clear:both
### 父元素设置overflow:hidden
### 父元素添加伪类:after和zoom
#### IE8以上和非IE浏览器才支持:after，zoom(IE专有属性)可解决IE6,IE7浮动问题
```
.clearfloat:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
}
.clearfloat{
    zoom:1;
}
```