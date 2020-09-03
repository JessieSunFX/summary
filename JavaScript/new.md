## new 一个对象

### new做了哪些事情
1. 创建⼀个新对象
2. 将构造函数中的作⽤域指向该对象
3. 执⾏构造函数中的代码
4. 返回新对象 

### 手写一个【new 函数】
```
function Body() {
    this._bloodVolume = 100;
    this._attackVolume = 500;
}
function newOperation(constructFunc) {
    const newObj = Object.create(null);
    constructFunc.call(newObj);
    return newObj;
}
var monster = newOperation(Body);
```