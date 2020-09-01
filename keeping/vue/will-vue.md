- vue 中如何使用发布订阅模式的
- vue中如何检测数组/对象的变化
- vue响应式原理
- vue diff算法的原理，这里我谈了vue的diff和react的diff，并且分析了他们相同点和不同点
- delete和Vue.delete删除数组区别
- v-modal原理
- 怎么定义vue-router动态路由, 如何获取动态参数
- 为什么通过vuex的motution修改state参数不会报错, 但是直接修改state参数就会报错?
- MVVM框架是什么? 和其他框架jQuery有什么区别? 适合哪些场景?
- 常见设计模式? Vue 中用了哪些设计模式?
- 用过哪些vuejs的内置组件
- 请简单实现双向数据绑定 mvvm。
- vue-cli 底层
- 如何避免Vuex中函数造成全局污染
- vue原理

	1. 创建vue实例, data函数返回一个data对象, 利用数据劫持监听data变化
	1. 当监听到data改变时, 借用发布订阅模式, 将data数据更新到视图
	1. 当视图变化时, 利用事件监听将视图层同步到data对象中
