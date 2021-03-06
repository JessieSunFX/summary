## cookie、session和token的区别
https://www.jianshu.com/p/ce9802589143#

### cookie
- cookie由服务器生成，发送给浏览器，浏览器把cookie以kv形式保存到某个目录下的文本文件内，下一次请求同一网站时会把该cookie发送给服务器。
- 由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间，所以每个域的cookie数量是有限的。
- 基于cookie的验证是有状态的，就是说验证或者会话信息必须同时在客户端和服务端保存。
- 这个信息服务端一般在数据库中记录，而前端会保存在cookie中。
-  验证的一般流程如下：
    1. 用户输入登录凭据；
    2. 服务器验证凭据是否正确，并创建会话，然后把会话数据存储在数据库中；
    3. 具有会话id的cookie被放置在用户浏览器中；
    4. 在后续请求中，服务器会根据数据库验证会话id，如果验证通过，则继续处理；
    5. 一旦用户登出，服务端和客户端同时销毁该会话。

### session
- session从字面意思，就是会话。服务器要知道当前发请求给自己的是谁。
- 为了做这种区分，服务器就要给每个客户端分配不同的“身份标识”，然后客户端每次向服务器发请求的时候，都带上这个“身份标识”，服务器就知道这个请求来自于谁了。
- 至于客户端怎么保存这个“身份标识”，可以有很多种方式，对于浏览器客户端，大家都默认采用cookie的方式。
- 服务器使用session把用户信息临时保存在服务器上，用户离开网站后session会被销毁。
- 缺点：如果web服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候session会丢失。

### token
- 基于token的验证是无状态的。
- 服务器不记录哪些用户已登录或者已经发布了哪些JWT(Json Web Token)。
- 对服务器的每个请求都需要带上验证请求的token。
- 该标记既可以加在header中，可以在post请求的主体中发送，也可以作为查询参数发送。
```
headers: {
    "Authorization": token
}
```
- 工作流程如下：
    1. 用户输入登录凭据；
    2. 服务器验证凭据是否正确，然后返回一个经过签名的token；
    3. 客户端负责存储token，可以存在local storage 或者 cookie中；
    4. 对服务器的请求带上这个token;
    5. 服务器对JWT进行解码，如果token有效，则处理该请求；
    6. 一旦用户登出，客户端销毁token。

### token相对cookie的优势
- 无状态
- 防跨站请求伪造(CSRF)
- 多站点使用
- 支持移动平台
- 性能
    - 一次网络往返(通过数据库查询session信息)总比做一次 HMACSHA256 计算的Token验证和解析要费时得多