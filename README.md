# summary

- vuejs 父子组件的生命周期顺序
- vuex actions 传参
- vue路由传递参数 context 
- ES6 map 和 set
- vuejs 常用指令
- vuejs 修饰符
- 缓存
- 技术信息来源 简书、掘金、知乎、github
- vue中key 为什么不能是index
    - https://blog.csdn.net/aihuanhuan110/article/details/98223011
    - 除了 Person1 之外，剩下的 Person3、Person4，因为被发现与相应 key 的绑定关系有变化，所以被重新渲染，这会影响性能。
    - 如果此时 list 的 item 是 select 的选项，其中 Person3 是选中的，这个时候 Person2 被删除了，用 index 作为 key 就会变成是 Person4 选中的了，这就产生了bug。
    - 如果使用唯一id作为key，删除 Person2 后，剩下的元素因为与 key 的关系没有发生变化，都不会被重新渲染，从而达到提升性能的目的。此时，list 的 item 作为 select 的选项，也不会出现上面所描述的bug。
- Promise async await
- 对联通云了解多少


- vuejs生命周期
- 父子组件传参
- js 基本数据类型
- array的常用方法
    - 不改变原数组的方法 concat join slice
    - 改变原数组 pop push shift unshift splice reverse sort

- 对象数组 根据时间排序 
```
arr.sort(function(a,b){
    return Date.parse(b.time) - Date.parse(a.time);// 倒序
});
arr.sort(function(a,b){
    return Date.parse(a.time) - Date.parse(b.time);// 正序
});

```
- vuex 理解
- 原型、原型链
- computed 和 watch

## 猿辅导
- 少儿编程行业发展
1.  少儿编程是指针对3-18岁青少儿开设的课程，通过可视化图形编程和编程游戏启蒙等课程，培养学生的逻辑思维能力、计算能力和创新能力等。
2.   得益于我国教育适龄人口数量的不断增长、家长越来越重视教育以及国家人工智能政策出台，这为我国少儿编程教育带来了发展机遇。
3. 编程猫、小码王、核桃编程、编玩编学、傲梦少儿编程等
    - 傲梦编程 8个等级，对应不同课程、年龄、竞赛
4. 少儿编程资本关注度持续提高，行业将迎来爆发期，主要归功于政策利好以及家长认知的转变。
5. 兴趣、能力、自信心、未来就业、参加比赛
- 对教研岗位的思考和想法
1. 明确授课对象，站在对方的角度思考问题，比如接收能力、知识储备，循序渐进
2. 与讲师做好配合，积极听取其对教研内容的意见
3. 不断提升自己的专业素养，时刻关注行业发展，纵向扩展 && 横向扩展
4. 根据受众不同的需求 研发不同的课程，如：自己研发小程序    

- 技术问题，基础原生为主

