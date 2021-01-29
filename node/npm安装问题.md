## mac系统中npm全局安装提示没有权限
- 方法一：
- https://blog.csdn.net/weixin_43974907/article/details/108386380
- sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
- 方法二：
- https://blog.csdn.net/shaleilei/article/details/80812410
- 在命令行前面添加sudo获取管理员权限，输入管理员密码就行

## node 版本升级
- https://blog.csdn.net/guzhao593/article/details/81712016

## npm ERR! Unexpected end of JSON input while parsing near..
- https://blog.csdn.net/zsl15039718107/article/details/104128166/