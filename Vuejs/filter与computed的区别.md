## filter与computed 区别

1. 触发时机
- computed 属性背后的处理逻辑比较复杂，依赖 Vue 的数据更新通知机制，在属性所依赖的其他数据项发生变化时才会重新触发计算。优点是计算频率相对较低；缺点是依赖于组件，难以抽取成独立逻辑，也就是复用性低。
- filter 则显的简单很多，只在显式调用时触发，一般应用在模板渲染上。优点是容易在组件外抽象；缺点是每次模板渲染时都需要重新执行计算。

2. 应用范围
- computed 很广泛，可以应用在其他computed、methods、生命周期函数、模板；

- filter 一般只应用于模板渲染上，如果要在其他位置复用，需要使用 this._f 函数：
```
Vue.component('HelloWorld', {
    filters: {
        hello() {
            return 'hello';
        }
    },
    methods: {
        ping() {
            return `${this._f('hello')()} world`;
        }
    }
})
```
- 在使用上filter支持链式调用，这为其增加了组合拼接的能力：
```
<span> {{ name | normalize | capitalize }} </span>
```

3. 定义方式
- computed 属性只能在组件内部或通过mixins对象定义；
- filter 有两种定义方式，一是在组件内部通过 filters 属性定义；一是在组件外部通过 Vue.filter 函数定义：
```
Vue.component('HelloWorld', {
    filters: {
        hello() {
            return 'hello';
        }
    }
});
Vue.filter('hello', ()=> 'hello');
```

4. 应用规则
- filter 无法缓存，调用频率高，因此特别适用于格式化输出场景，比如日期格式化。filter 具有组合调用能力，因此可以在项目架构层面定义一堆基础的、简单的filter，按需在组件内组合适用。

- computed 属性具有缓存能力，在组件内普适性更强，因此适用于复杂的数据转换、统计等场景。