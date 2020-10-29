## 为什么React16要更改组件的生命周期（下）？

### getDerivedStateFromProps
```
static getDerivedStateFromProps(props, state)
```
1. 静态方法。不依赖组件实例而存在，方法内部访问不到this
2. 接收两个参数：props和state，分别代表当前组件接收到的来自父组件的props 和 当前组件自身的state
3. 需要一个对象格式的返回值。React 需要用这个返回值来更新(派生)组件的state
- 注：getDerivedStateFromProps 方法对 state 的更新动作并非“覆盖”式的更新，而是针对某个属性的定向更新。

### React 16.4 的挂载和卸载流程都与 16.3 保持一致，差异在于更新流程：
- 16.4 中任何因素触发的组件更新流程(包括由 this.setState 和 forceUpdate 触发的更新流程)都会触发getDerivedStateFromProps
- 16.3 中只有父组件的更新会触发该生命周期

### why getDerivedStateFromProps 代替 componentWillReceiveProps ？
- 与componentDidUpdate一起，这个新的生命周期涵盖过时 componentWillReceiveProps 的所有用例
- 合理的减法
- 被定义为 static 方法，无法做任何类似于 this.fetch()、不合理的 this.setState (会导致死循环的那种) 这类可能会产生副作用的操作   
- react 16 强制推行  `只用 getDerivedStateFromProps 来完成 props 到 state 的映射`

### getSnapshotBeforeUpdate
```
getSnapshotBeforeUpdate(prevProps, prevState){
    // ...
}
```
- 需要一个返回值，返回值会作为第三个参数给到 componentDidUpdate
- 执行时机是在render方法之后，真实DOM更新之前
- 这个阶段，可以同时获取到更新前的真实 DOM 和更新前后的 state & props 信息
- 与 componentDidUpdate 一起，涵盖过时的 componentWillUpdate 的所有用例(官方)

### fiber 架构解析
- 使原本同步的渲染过程变成异步的
- 将一个大的更新任务拆解为许多个小任务
- 每当执行完一个小任务，渲染线程都会把主线程交回去
- 渲染线程不再“一去不回头”，而是可以被打断的
- 两个特性：任务拆解、可打断

### 根据能否被打断，生命周期划分为三个阶段
- render阶段：纯净且没有副作用，可能会被 react 暂停、终止或重新启动
- pre-commit阶段：可以获取 dom
- commit阶段：可以使用 dom, 运行副作用，安排更新
- render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行

### “废旧立新” 背后的思考
- render 阶段的生命周期可能被重复执行
- 16 废弃的生命周期
    - componentWillMount
    - componentWillUpdate
    - componentWillReceiveProps
-  共性：都处于 render 阶段，都可能重复被执行