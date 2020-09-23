## actions

### 与mutation的不同

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作
```
actions: {
    incrementAsync({ commit }) {
        setTimeout(() => {
            commit('increment')
        }, 1000)
    }
}
```

### action 参数

- Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
```
actions: {
    increment (context) {
        context.commit('increment')
    }
}
```
- But,context 对象不是 store 实例本身
- 实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
```
actions: {
    increment({ commit }) {
        commit('increment')
    }
}
```

### 分发 Action
- Action 通过 store.dispatch 方法触发
```
store.dispatch('increment')
```
- Actions 支持同样的载荷方式和对象方式进行分发
- 以载荷形式分发
```
store.dispatch('incrementAsync', {
    amount: 10
})
```
- 以对象形式分发
```
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})
```

### 在组件中分发 Action
- 在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
```
import { mapActions } from 'vuex'

export default {
    // ...
    methods: {
        ...mapActions([
            'increment',  // 将`this.increment()` 映射为 `this.$store.dispatch('increment')`

            // `mapActions` 也支持载荷：
            'incrementBy' // 将`this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)` ????
        ]),
        ...mapActions({
            add: 'increment'  // 将`this.add()` 映射为 `this.$store.dispatch('increment')`
        })
    }
}
```

### 组合 Action
- store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
```
actions: {
    actionA({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('someMutation')
                resolve
            }, 1000)
        })
    }
}
```

- 现在可以
```
store.dispatch('actionA').then(() => {
    // ...
})
```

- 在另一个action中也可以
```
actions: {
    // ...
    actionB({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
            commit('someOtherMutation')
        })
    }
}
```

- 利用 async/await 组合 action
```
// 假设 getData() 和 getOtherData 返回的是 Promise

actions: {
    async actionA({ commit }) {
        commit('gotData', await getData())
    },
    async actionB({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
    }
}
```

- 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。