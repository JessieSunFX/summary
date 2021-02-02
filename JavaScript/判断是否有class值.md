## 判断是否有 class 值

1. jQuery
- $("html").hasClass("no-js");

2. 只考虑支持HTML5 classList API的浏览器
- document.querySelector("body").classList.contains("no-js");

3. jQuery 实现 hasClass 源码：
```
var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
    hasClass: function(selector) {
        var className = " " + selector + " ",
            i = 0,
            l = this.length;
        for(; i < l; i++) {
            if(this[i].nodeType === 1 && 
                (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                return true;
            }
        }
        return false;

    }
})
```
- \t 匹配一个制表符
- \r 匹配一个回车符
- \n 匹配一个换行符
- \f 匹配一个换页符
