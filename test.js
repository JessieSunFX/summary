import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

// 可汗学院
// immutable.js

// 学习跟做笔记要同步
// 扫录笔
// learn hacks
// 难点卡片：
// 1. 拆卡片
// 2. 语言表达问题-》用自己的语言重新表达
// 3. 不理解 -》 重新学
// 做笔记不要不理解的东西，一定要是自己学过、理解透、等待复习的东西放进来复习
// 学到哪，复习到哪，anki做到哪
// 先小后大、先分后总
// 知乎：如何长时间专注 信息转化率问题  信息单位削小


Object.defineProperty(obj,key,{
    enumerable:true,
    configurable: true,
    get: function reactiveGetter() {
        const value= getter? getter.call(obj): value
        if(Dep.target) {
            dep.depend()
            if(childOb) {
                childOb.dep.depend()
                if(Array.isArray(value)) {
                    dependArray(value)
                }
            }
        }
    },
    set: function reactiveSetter(newVal) {
        const value = getter ? getter.call(obj) : val
        if(newVal === value || (newVal !== newVal && value !== value)) {
            return 
        }
        val = newVal
        childOb = !shallow && observe(newVal)
        dep.notify()
    }
})

/**
 * 1.beforeCreate: 实例初始化之后，数据观测data observer、event/watcher事件配置之前被调用
 * 2.created: 实例创建完成后被立即调用，此时实例已经完成以下配置：数据观测data observe、property和方法的运算、watch/event事件回调。但挂载阶段还没开始，所以$el property还不可用
 * 3.beforeMount: 挂载开始之前被调用，相关的render函数首次被渲染
 * 4.mounted: 实例被挂载后调用，此时el被新创建的vm.$el替换
 * 5.beforeUpdate: 数据更新时调用，发生在虚拟DOM打补丁之前
 * 6.updated: 由于数据更改导致的虚拟DOM 重新渲染和打补丁，在这之后会调用该钩子
 * 7.activated: 被 keep-alive 缓存的组件激活时调用
 * 8.deactivated: 被 keep-alive 缓存的组件停用时调用
 * 9.beforeDestroy: 实例销毁之前被调用，此时实例仍然完全可用
 * 10.destroyed: 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器都被移除，所有的子实例也都被销毁。
 * 11.errorCapture: 当捕获一个来自子孙组件的错误时被调用
 */