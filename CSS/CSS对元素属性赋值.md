## CSS对元素属性赋值的详细过程
- https://blog.csdn.net/weixin_33712881/article/details/87977330
1. specified value: 根据指定得到 specified value
2. computed value: 然后 specified value 被解析成可以用于继承的值，也就是 computed value
3. used value: 如果有必要的话，在这一阶段将 computed value 转成绝对值，也就是 used value
4. actual value: 最后根据本地环境的限制，used value 会被转换成 actual value