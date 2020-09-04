## url从输入到页面展示的过程
- https://www.cnblogs.com/qing-5/p/11126524.html
1. DNS解析URL的过程
2. 浏览器发送请求与服务器交互的过程
3. 浏览器对接收到的html页面渲染的过程

### DNS解析URL的过程
- DNS解析的过程就是寻找哪个服务器上有请求的资源。
- 因为ip地址不容易记忆，一般会使用URL域名（如www.baidu.com）作为网址。
- DNS解析就是将域名翻译成IP地址的过程。
- 具体过程：
1. 浏览器缓存：浏览器会按照一定的频率 缓存DNS记录
2. 操作系统缓存：如果浏览器缓存中找不到需要的DNS记录，就会去操作系统中找
3. 路由缓存：路由器也有DNS缓存
4. ISP的DNS服务器：ISP有专门的DNS服务器应对DNS查询请求
5. 根服务器：ISP的DNS服务器找不到之后，就要向根服务器发出请求，进行递归查询

### 浏览器与服务器交互过程
1. 首先浏览器利用tcp协议通过三次握手与服务器建立连接
    - http请求包括header和body。header中包括请求的方式（get和post）、请求的协议 （http、https、ftp）、请求的地址ip、缓存cookie。body中有请求的内容。
2. 浏览器根据解析到的IP地址和端口号发起http的get请求.
3. 服务器接收到http请求之后，开始搜索html页面，并使用http返回响应报文
4. 若状态码为200显示响应成功，浏览器接收到返回的html页面之后，开始进行页面的渲染

### 浏览器页面渲染过程
1. 浏览器通过深度遍历的方式，解析HTML，生成DOM树
2. 解析CSS，生成CSS DOM树
3. 将DOM树和CSS DOM树关联，生成渲染树Render Tree
4. 布局Render Tree(Layout/reflow)，负责各元素尺寸、位置的计算
5. 绘制Render Tree(paint)，绘制页面像素信息
6. 将像素发送给GPU，展示在页面上(Display)
