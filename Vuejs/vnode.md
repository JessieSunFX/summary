## 用vnode来描述一个DOM结构

- 虚拟节点就是用一个对象来描述真实的dom元素
```
// 真实的元素节点：
<div>
  hello
  <span>Vue!</span>
</div>

// VNode描述：
{
  tag: 'div',
  children: [
    {
      text: 'hello'
    }, 
    {
      tag: 'span',
      children: [
        {
          text: 'Vue!'
        }
      ]
    }
  ],
}
```
