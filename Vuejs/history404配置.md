## Vue路由history模式 404问题

### nginx
1. try_files
  ```
  location / {
      root   D:\Test\exprice\dist;
  　　index  index.html index.htm;
      try_files $uri $uri/ /index.html;
  }
  ```
  - 当用户请求 http://localhost/example 时，这里的 $uri 就是 /example。 
  - try_files 会到硬盘里尝试找这个文件。如果存在名为 /$root/example（其中 $root 是项目代码安装目录）的文件，就直接把这个文件的内容发送给用户。 
  - 显然，目录中没有叫 example 的文件。然后就看 $uri/，增加了一个 /，也就是看有没有名为 /$root/example/ 的目录。 
  - 又找不到，就会 fall back 到 try_files 的最后一个选项 /index.html，发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求到 http://localhost/index.html 

2. error_page
  ```
  location /{
  　　root   /data/nginx/html;
  　　index  index.html index.htm;
  　　error_page 404 /index.html;
  }
  ```


  - 给个警告，这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。
  - 为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，给出一个 404 页面。
  ```
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '*', component: NotFoundComponent }
    ]
  })
  ```