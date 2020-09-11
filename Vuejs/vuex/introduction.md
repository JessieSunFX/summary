## vuex

- 状态管理模式
- 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
- Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能

### 状态管理模式

- 状态自管理应用包含以下几个部分：
1. state，驱动应用的数据源；
2. view，以声明方式将 state 映射到视图；
3. actions，响应在 view 上的用户输入导致的状态变化。

- 以下是一个表示“单向数据流”理念的简单示意：
![avatar](./img/introduction.png)

### 单向数据流问题

- 当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
1. 多个视图依赖于同一状态。
2. 来自不同视图的行为需要变更同一状态。

- 对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
- 对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。
- 以上的这些模式非常脆弱，通常会导致无法维护的代码。

### 解决方案

- 为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！
- 通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

![avatar](./img/vuex.png)

### 应用场景
- 需要构建一个中大型单页应用，很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择