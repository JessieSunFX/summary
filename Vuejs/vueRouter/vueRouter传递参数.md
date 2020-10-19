## vue-router 传递参数

### vue-router 路由跳转分两大类
- 编程式跳转 router.push
- 声明式跳转 \<router-link>

### 编程式跳转三种方式
1. this.$router.push("detail")
    - detail为要跳转的路由地址，传参可以通过查询参数的方式。

2. 命名路由 this.$router.push({name:"detail",params:{personId:33}}) 
    - 命名路由的前提就是在注册路由的地方需要给路由命名
        ```
        export default new Router({
            routes: [
                {
                    path: '/',
                    name: 'HelloWorld',
                    component: HelloWorld
                },
                {
                    path: '/news',
                    name: 'news',
                    component: News
                }
            ]
        })
        ```
    - detail为要跳转的路由命名，params为传递的参数
    - 目标页面可以使用this.$route.params.personId来获取传递的参数
    - 该方式有一个缺点就是在目标页面刷新时传递过来的参数会丢失，类似表单提交。

3. 查询参数 this.$router.push({path:"/detail",query:{personId:33}}) 
    - 查询参数其实就是在路由地址后面带上参数和传统的url参数一致的
    - detail为要跳转的路由地址，query为传递的参数
    - 目标页面使用this.$route.query.personId来获取传递的参数，该方式会把传递的参数放在url上，如：localhost:8080/#/detail/?personId=33。

### 声明式跳转三种方式（优缺点与编程式相同）
1. \<router-link to="detail">跳转到详情页\</router-link>

2. \<router-link :to="{name:'detail',params:{personId:33}}">跳转到详情页\</router-link>

3. \<router-link :to="{path:'/detail',query:{personId:33}}">跳转到详情页\</router-link>


