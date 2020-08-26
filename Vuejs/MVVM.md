## 谈一下对MVVM原理的理解

![avatar](./img/mvvm.jpg)
### 传统的MVC指的是，用户操作会请求服务端路由，路由会调用对应的控制器来处理，控制器会获取数据。将结果返回给前端，页面重新渲染。

### MVVM：传统的前端会将数据手动渲染到页面上，MVVM模式不需要用户手动操作dom元素，将数据绑定到viewModel层上，会自动将数据渲染到页面中，视图变化会通知viewModel层更新数据。

### ViewModel 就是我们MVVM模式中的桥梁。

- https://zhuanlan.zhihu.com/p/53703176

## 什么是MVVM?
- MVVM是 Model-View-ViewModel 的缩写。MVVM是一种设计思想。 
- Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；
- View代表UI组件，它负责将数据模型转化成UI展现出来；
- ViewModel 是一个同步View 和 Model的对象

- 在MVVM架构下，View和Model之间并没有直接的联系，而是通过ViewModel进行交互。
- ViewModel通过双向数据绑定把View层连接了起来，而View和Model之间的同步工作完全是自动的，无需人为干涉。
- 因此开发者只需关注业务逻辑，不需要手动操作DOM；
- 不需要关注数据状态的同步问题，复杂的数据状态维护完全由MVVM来统一管理。
- 数据驱动的开发方法

## mvvm和mvc的区别
- 都是一种设计思想
- mvc中的controller演变成了mvvm中的viewModel
- mvvm主要解决mvc中的问题：
- 1. 大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验
- 2. 当Model频繁发生变化，开发者需要主动更新到View