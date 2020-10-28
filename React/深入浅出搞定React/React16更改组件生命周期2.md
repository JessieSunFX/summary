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