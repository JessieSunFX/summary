## keep-alive
- Vue的一个内部组件，适合用来缓存不需要实时更新的组件，这样可以保留组件状态避免重新渲染
- props
    - include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
    - exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
    - max - 数字。最多可以缓存多少组件实例。

- \<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
- 和 \<transition> 相似，\<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
- 当组件在\<keep-alive>内被切换，它的activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
- \<keep-alive> 不会在函数式组件中正常工作，因为它们没有缓存实例。

### keep-alive部分页面不刷新如何实现
1. exclude
2. 路由设置时 meta keep-alive:false
3. activated deactivated声明周期