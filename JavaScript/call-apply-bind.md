# call/apply/bind作用和区别

## 他们都可以改变函数的作用域

## call/apply可以直接执行该函数，而bind不会立刻执行
## call/apply作用类似，都可以改变指针和执行函数，区别在于传参不同，call需要单个传参，apply通过数组传参

# 手写call,apply,bind函数
## 一句话总结：其实都不用记，用脑子去推就好了；
## 核心点是为传进来的对象context添加fn这个函数属性，然后context就可以执行fn这个函数，也就是改变了fn的this指向
## 考虑两点：
- 第一个参数为undefined或null的时候，那么会转变为window
- 改变了this执行，让新的对象可以执行该函数
```
Funtion.prototype.myCall = function(context) {
    if(typeof context === "undefined" || context === null) {
        context = window
    }
    // context = context || window 和上面的代码一样
    context.fn = this
    const args = [...argument].slice(1)
    const result = context.fn(args)
    delete context.fn
    return result
}
``` 
### 实现分析：
- 首先context为可选参数，如果不传的话默认上下文是window
- 接下来给context创建一个fn属性，并将值设置为需要调用的函数
- 因为call可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来
- 然后调用函数并将对象上的函数删除

## apply和call实现类似，不同的就是参数的处理
```
Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result
    if(arguments[1]) {
        result = context.fn(...arguments[1])
    } else{
        result = context.fn()
    }
    delete context.fn
    return result
}
```

## 因为bind转换后的函数可以作为构造函数使用，此时this应该指向构造出的实例，而不是bind绑定的第一个参数