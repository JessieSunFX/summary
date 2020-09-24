# summary

- vuejs 父子组件的生命周期顺序
- vuex actions 传参
- vue路由传递参数 context 
- ES6 map 和 set
- vuejs 常用指令
- vuejs 修饰符
- 缓存
- 技术信息来源 简书、掘金、知乎、github
- vue中key 为什么不能是index
    - https://blog.csdn.net/aihuanhuan110/article/details/98223011
    - 除了 Person1 之外，剩下的 Person3、Person4，因为被发现与相应 key 的绑定关系有变化，所以被重新渲染，这会影响性能。
    - 如果此时 list 的 item 是 select 的选项，其中 Person3 是选中的，这个时候 Person2 被删除了，用 index 作为 key 就会变成是 Person4 选中的了，这就产生了bug。
    - 如果使用唯一id作为key，删除 Person2 后，剩下的元素因为与 key 的关系没有发生变化，都不会被重新渲染，从而达到提升性能的目的。此时，list 的 item 作为 select 的选项，也不会出现上面所描述的bug。
- Promise async await
- 对联通云了解多少


- vuejs生命周期
- 父子组件传参
- js 基本数据类型
- array的常用方法
    - 不改变原数组的方法 concat join slice
    - 改变原数组 pop push shift unshift splice reverse sort

- 对象数组 根据时间排序 
```
arr.sort(function(a,b){
    return Date.parse(b.time) - Date.parse(a.time);// 倒序
});
arr.sort(function(a,b){
    return Date.parse(a.time) - Date.parse(b.time);// 正序
});

```
- vuex 理解
- 原型、原型链
- computed 和 watch

