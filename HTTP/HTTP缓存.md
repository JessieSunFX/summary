# HTTP 缓存

- https://zhuanlan.zhihu.com/p/80551769
- https://github.com/amandakelake/blog/issues/41
- 作用: 缓解服务器端压力, 提升性能
- 分类: 1. 强缓存; 2. 协商缓存

## 1. 强缓存和协商缓存区别

- 优先级: 强缓存优先级高于协商缓存
- 是否发送请求: 强缓存命中不会向服务器发送任何请求，直接从本地缓存中读取文件
- 返回状态码: 200(form memory cache 内存), 200(from disk cache 硬盘)
- 通过两个响应头控制强缓存: Expires 和 Cache-Control

    - 如果服务端没有设置 Cache-Control/Expires: 参考 RFC 规则

### Cache-Control: 资源过期的相对时间(多少秒)

- 优先级高于 Expires
- 出现于 HTTP1.1

```bash
max-age = 315360000; # 缓存的内容将在 xxx 秒后失效
no-cache; # 走协商缓存
no-store; # 禁用缓存(包括协商缓存)
private; # 内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存)
public; # 所有内容都将被缓存(客户端和代理服务器都可缓存)
```

### Expires: 资源过期的绝对时间(时间值)

- 到期时间由服务端生成
- 受客户端时间影响存在误差
- 优先级低于 Cache-Control
- 出现于 HTTP1.0
- 一般不推荐设置, 推荐设置`Cache-Control`的`max-age`

```js
// Expires:Wed, 11 May 2018 07:20:00 GMT
```

### 如何设置 Cache-Control,Expires

1. nginx 设置 Cache-Control,Expires

```bash
location ~ .*\.(css|js|swf|php|htm|html )$ {
  add_header Cache-Control no-store;
}

location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
  #过期时间为30天，
  #图片文件不怎么更新，过期可以设大一点，
  #如果频繁更新，则可以设置得小一点。
  expires 30d;
}
```

2. meta 标签设置 Cache-Control,Expires

```xml
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Expires" content="0" />
```

---

## 2.协商缓存:

- 协商缓存需要配合强缓存使用, 不启动强缓存则协商缓存无意义
- 当浏览器对某个资源的请求没有命中强缓存，就会发一个请求到服务器, 验证是否命中协商缓存, 命中则返回 304, 读取本地缓存

### 1. 控制协商缓存 Last-Modified，If-Modified-Since

- 优先级低, 精度略低, 性能高
- 基于文件修改时间判断文件是否变化
- 浏览器会在 request header 加上 If-Modified-Since（上次返回的 Last-Modified 的值），询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来

### 2. 控制协商缓存 ETag、If-None-Match

- 优先级高, 精度高, 性能差
- 基于文件内容判断文件是否变化
- 原理: 内容变化导致ETag变化, 客户端会将上次的Etag(If-None-Match字段)发给服务端, 服务端对比最新Etag是否有变化, 决定是否返回新资源

## HTTP 几种缓存状态码区别

- 200: 缓存失效, 返回新的资源文件
- 200(from cache): 强缓 Expires/Cache-Control 两者都存在，未过期，Cache-Control 优先 Expires 时，浏览器从本地获取资源成功
- 304(Not Modified )：协商缓存 Last-modified/Etag 没有过期时，服务端返回状态码 304

## HTTP 缓存使用需知

1. 协商缓存需要配合强缓存使用, 如果不启用强缓存, 协商缓存也没有意义
2. 大部分 web 服务器都默认开启了协商缓存, 同时启用【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】
3. 缓存的顺序
   Cache-Control —— 请求服务器之前
   Expires —— 请求服务器之前
   If-None-Match (Etag) —— 请求服务器
   If-Modified-Since (Last-Modified) —— 请求服务器

## 分布式响应头使用协议缓存缓存需注意

- 分布式系统里多台机器间文件的 Last-Modified 必须保持一致，以免负载均衡到不同机器导致比对失败；
- 分布式系统尽量关闭掉 ETag(每台机器生成的 ETag 都会不一样）；

## 如何清除 HTTP 缓存

1. ctrl+F5
2. ctrl+shift+delete 清除缓存(就是浏览器清除缓存的选项)
3. 调试台 network 选项, 选中"disable Cache"
4. 请求后面加时间戳或随机数
5. html 标签禁用缓存字段
6. 浏览器刷新按钮右键,"清空缓存并硬性重新加载"

## webpack 如何配置可以不影响浏览器缓存

- webpack 打包时, 文件名追加 hash 值, 就是为了防止浏览器缓存(强缓存,协商缓存)
- 这个 hash 值就是根据文件属性值生成的, 我们只用控制 hash 不改变就可以实现长缓存

- 首先实现代码分离: 将业务代码和第三方库的代码(如 lodash.js)分开打包成不同的文件

  - 业务代码打包后(如:app42342nfa.js), 当文件改变时, hash 值也会随着改变
  - 第三方库代码打包后(如:vendors-app423kfanf.js), 通常文件没有改动, 所以 hash 值不会变

- 幸运的是 vue-cli3 已经帮我们把 webpack 的代码分离配置好了

  - app.8ca03f35.css 业务代码(css)
  - chunk-vendors.77c4b76d.css 第三方库的 css 代码(如:bootstrap)

  - app.7bcdebea.js 业务代码(js,css,html)
  - chunk-vendors.8a35cab5.js 第三方 js 库代码(如:lodash)
