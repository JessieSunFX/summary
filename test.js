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
 * float clear vertical-align 将失效
 * 容器属性：
 * flex-direction: row row-reverse column column-reverse
 * flex-wrap: no-wrap wrap wrap-reverse
 * flex-flow
 * justify-content: flex-start flex-end center space-between space-around
 * align-items: flex-start flex-end center baseline stretch默认
 * align-content： flex-start flex-end center space-between space-around stretch默认
 * 
 * 项目属性
 * order 0默认
 * flex-grow 0默认
 * flex-shrink 1默认
 * flex-basis auto默认
 * flex auto(1,1,auto) none(0,0,auto)
 * align-self:auto默认 flex-start flex-end center baseline stretch
 */

