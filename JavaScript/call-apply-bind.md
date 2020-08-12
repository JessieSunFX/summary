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
    const args = [...arguments].slice(1)
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
```
Function.prototype.myBind = function(context) {
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    // 返回一个绑定this的函数，这里我们需要保存this
    const _this = this
    const args = [...arguments].slice(1)
    // 返回一个函数
    return function F() {
        // 因为返回一个函数，我们可以new F()需要判断能当做构造函数吗
        if(this instanceof F){
            return new _this(...args, ...arguments)
        }else {
            return _this.apply(context, args.concat(...arguments))
        }
    }
}
```
### bind返回一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过new的方式
### 对于直接调用来说，这里选择了apply的方式，但是对于参数需要注意以下情况：
### 因为bind可以实现类似这样的代码f.bind(obj,1)(2),所以我们需要将两边的参数拼接起来，于是就有了这样的实现args.concat(...arguments)
### new的方式，我们先判断this，对于new的情况，不会被任何方式改变this，所以对于这种情况我们需要忽略传入的this