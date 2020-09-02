## keep-alive
- \<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
- 当组件在\<keep-alive>内被切换，它的activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

### keep-alive部分页面不刷新如何实现
1. exclude
2. 路由设置时 meta keep-alive:false
3. activated deactivated声明周期