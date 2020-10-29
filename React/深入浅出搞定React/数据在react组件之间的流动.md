## 数据如何在 react 组件之间流动？(上)

### react 核心特征：数据驱动视图
```
UI = render(data)
或者
UI = f(data)
```

### 基于 props 的单向数据流
- props 传参适合处理的三种场景
1. 父子组件通信
- react 的数据流是单向的，父组件可以直接将 this.props 传入子组件 

2. 子父组件通信
- 父组件传递给子组件的是一个 `绑定了自身上下文的函数`，子组件在调用该函数时，可以`将想要交给父组件的数据以函数入参的形式给出去`

3. 兄弟组件通信
- 共享同一个父组件：兄弟 转换为 父子 && 子父

- 层层传递 props 要不得

### 利用“发布-订阅”模式驱动数据流
- socket.io 模块
- node.js中，许多原生模块也是以 EventEmitter 为基类实现的
- Vue.js中，全局事件总线 EventBus

### 理解事件的发布-订阅机制
- 早期最广泛的应用，是在浏览器的 DOM 事件中
- addEventListener
- 优点：监听事件的位置和触发事件的位置是不受限的

### 发布-订阅模型 API设计思路
- on()：负责注册事件的监听器，指定事件触发时的回调函数
- emit()：负责触发事件，可以通过传参使其在触发的时候携带数据
- off()：负责监听器的删除

### 发布-订阅模型编码实现
1. 事件和监听函数的对应关系如何处理？
    - 对应关系 -》映射 -》对象
2. 如何实现订阅
    - 注册事件监听函数的过程
    - 写 操作
3. 如何实现发布
    - 触发安装在某个事件上的监听函数
    - 读 操作
```
class myEventEmitter {
    constructor() {
        // 用来存储事件和监听函数之间的关系
        this.eventMap = {}
    }
    // type 事件的名称
    on(type, handler) {
        // handler 必须是一个函数，如果不是直接报错
        if(!(handler instanceof Function)) {
            throw new Error("哥 你错了 请传一个函数");
        }
        // 判断 type 事件对应的队列是否存在
        if(!this.eventMap[type]) {
            // 若不存在，新建该队列
            this.eventMap[type] = [];
        } 
        // 若存在，直接往队列里推入 handler
        this.eventMap[type].push(handler); 
    }
    // params 数据的载体
    emit(type, params) {
        // 假设该事件是有订阅的（对应的事件队列存在）
        if(this.eventMap[type]) {
            // 将事件队列里的 handler 依次执行出队
            this.eventMap[type].forEach((handler, index) => {
                handler(params);
            })
        }
    }
    off(type, handler) {
        if(this.eventMap[type]) {
            this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
        }
    }
}
```