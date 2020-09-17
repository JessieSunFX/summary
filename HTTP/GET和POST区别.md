## get和post的区别

- 大小方面
    + GET传输一般2-8K,IE限制2K（"GET数据有长度限制"，其实是指"URL的长度限制"；HTTP协议本身对URL长度并没有做任何规定，实际的限制是由客户端/浏览器以及服务端决定的。）
    + POST没有大小限制
- 安全方面
    + GET通过url明文传输，POST通过body传输，本身都不安全，因为HTTP就是明文传输
- 浏览器记录
    + GET请求浏览器会记录（GET历史参数保留在浏览器历史中）
    + POST不会（POST参数不会保存在浏览器历史中）
- 浏览器后退/刷新
    + GET无害
    + POST数据会被重复提交（不是幂等的，重复请求可能带来意想不到的后果；浏览器应该告知用户数据会被重新提交）
- 浏览器收藏
    + GET可以收藏
    + POST不可以（有副作用，浏览器实现为不能把POST请求保存为书签）
- 浏览器缓存
    + GET可以缓存
    + POST不会（有副作用，不幂等，不能随意多次执行，因此不能缓存）
- 编码方式
    + GET通过url编码，编码类型 application/x-www-form-urlencoded
    + POST编码类型 application/x-www-form-urlencoded 或 multipart/form-data，为二进制数据使用多重编码
- TCP数据包
    + GET产生一个数据包（浏览器会把http header和data一并发送出去，服务器响应200(返回数据)）
    + POST产生2个数据包（浏览器先发送header，服务器响应100 continue，浏览器再发送 data，服务器响应200 ok(返回数据)）
- 使用方式（习惯上讲）
    + GET主要拉取数据
    + POST主要提交保存数据 
