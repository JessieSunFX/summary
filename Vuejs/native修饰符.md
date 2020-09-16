## .native修饰符- 将原生事件绑定到组件
- https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6
- 想要在一个组件的根元素上直接监听一个原生事件，可以使用 v-on 的 .native 修饰符

### 替代方案
- Vue 提供了一个 $listeners property，它是一个对象，里面包含了作用在这个组件上的除.native修饰符的所有监听器。例如：
```
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```
- 有了这个 $listeners property，就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。