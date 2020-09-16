## vue页面返回，保持不变（数据，滚动位置）

```
const router = new Router({
    mode: "history",
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(savedPosition)
        if(savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});
```
- 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。