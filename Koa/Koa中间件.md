## koa中间件执行顺序
- 中间件执行就像洋葱一样，最早use的中间件，放在最外层。处理顺序从左到右，左边接收一个request，右边输出返回response
- koa官方文档把外层中间件称为“上游”，内层中间件称为“下游”
- 一般的中间件都会执行两次，调用next之前为第一次，调用next时把控制传递给下游的下一个中间件。当下游不再有中间件或者没有执行next函数时，就将依次恢复上游中间件的行为，让上游中间件执行next之后的代码

## Koa常用中间件

### koa-compose
#### 将多个中间件合并成单一中间件，方便重用和导出

### koa-bodyparser
#### 把POST参数解析到ctx.request.body中

### koa-router
#### 可以直接使用get和post来定位并且减少代码量

### koa-static
#### 加载静态资源

### koa-view
#### 加载html模板文件列入ejs或者pug
