## 谈一下对MVVM原理的理解

![avatar](./img/mvvm.jpg)

- https://zhuanlan.zhihu.com/p/53703176

## 什么是MVVM?
- MVVM 是 Model-View-ViewModel 的缩写，是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 视图，它负责将数据模型转化成 视图 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

- 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

- ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

- vm: object.defineProperty + 发布订阅模式

## mvvm和mvc的区别
- 都是一种设计思想
- mvc中的controller演变成了mvvm中的viewModel
- mvvm主要解决mvc中的问题：
- 1. 大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验
- 2. 当Model频繁发生变化，开发者需要主动更新到View