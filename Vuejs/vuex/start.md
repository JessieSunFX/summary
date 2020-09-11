## start
- 每一个 Vuex 应用的核心就是 store（仓库）。
- “store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
- Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation，这样可以方便地跟踪每一个状态的变化。

- 为了在 Vue 组件中访问 this.$store property，需要为 Vue 实例提供创建好的 store。Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：
```
new Vue({
  el: '#app',
  store,
})
```
- 现在可以从组件的方法提交一个变更：
```
methods: {
    increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    }
}
```
