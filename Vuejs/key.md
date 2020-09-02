## vue.js中的key

- 类型： Number/String
- key 的特殊属性主要用在 Vue的虚拟DOM算法，在新旧nodes对比时辨识Vnodes
- 如果不使用key，Vue 会使用一种最大限度减少动态元素，并且尽可能的尝试就地修复/复用相同类型元素的算法
- 而使用key时，它会基于key的变化重新排列元素顺序，并且会移除key 不存在的元素
- 有相同父元素的子元素必须有独特的key，重复的key会造成渲染错误

### 应用
1. 最常见的用例是结合 v-for
2. 也可以用于强制替换元素/组件，而不是重复使用它
- 完整地触发组件的生命周期钩子
- 触发过渡

```
// 当text发生改变时，<span>总是会被替换而不是被修改，因此会触发过渡
<transition>
    <span :key="text">{{text}}</span>
</transition>
```
