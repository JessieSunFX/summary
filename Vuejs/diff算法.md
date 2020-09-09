## diff算法

### diff算法的时间复杂度

- 两个树的完全的diff算法是一个时间复杂度为O(n^3)的问题
- 将两个DOM树的所有节点两两对比，时间复杂度O(n^2)
- 再进行树的编辑(插入、替换、删除)需要遍历一次，因此时间复杂度为O(n^3)

- vue进行了优化，O(n^3)复杂度的问题转换成O(n)复杂度的问题，只比较同级不考虑跨级问题
- 在前端中，很少会跨越层级地移动dom元素。所以 Virtual Dom 只会对同一个层级的元素进行对比。

### vue中diff算法原理

1. patch 函数接收两个参数 oldVnode 和 vnode 分别代表旧节点和新节点
    - 判断两个节点是否值得比较，值得比较则执行patchVnode
    - 不值得比较则用 vnode 替换 oldVnode
    ```
    function sameVnode(a, b) {
        return (
            // key值
            a.key === b.key &&
            // 标签名
            a.tag === b.tag &&
            // 是否为注释节点
            a.isComment === b.isComment &&
            // 是否都定义了data，data包含一些具体信息，例如onClick, style
            isDef(a.data) === isDef(b.data) &&
            // 当标签是<input>的时候，type必须相同
            sameInputType(a, b)
        )
    }
    ```

2. patchVnode
    - 找到对应的真实dom，称为el
    - 判断 vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接return 
    - 如果他们都有文本节点并且不相等，那么将el的文本节点设置为 vnode 的文本节点
    - 如果 oldVnode 有子节点而 vnode 没有，则删除el的子节点
    - 如果 oldVnode 没有子节点而 vnode 有，则将 vnode 的子节点真实化之后添加到el
    - 如果两者都有子节点并且不相等，则执行updateChildren函数比较子节点（重点）

3. updateChildren
    - 循环内：每次循环都会处理一个节点，处理之后将节点标记为已处理（oldVdom和newVdom都要进行标记，如果节点只出现在其中一个vdom中，则另一个vdom中不需要进行标记）
    - 标记的方法有2种，当节点正好在vdom的指针处，移动指针将它排除到未处理列表之外即可，否则就要采用其他方法，Vue的做法是将节点设置为undefined
        1. 处理头部同类型节点
        2. 处理尾部同类型节点
        3. 处理头尾/尾头同类型节点
        4. 处理新增的节点
        5. 处理更新的节点
    - 循环后：可能newVdom或者oldVdom中还有未处理的节点
    - 如果是newVdom中有未处理节点，则这些节点是需要新增的节点，做新增处理；
    - 如果是oldVdom中有未处理节点，则这些节点是需要删除的节点，做删除处理
       
    - 整个过程是逐步找到更新前后vdom的差异，然后将差异反应到DOM树上（也就是patch），特别要提一下Vue的patch是即时的，并不是打包所有修改最后一起操作DOM（React则是将更新放入队列后集中处理），朋友们会问这样做性能很差吧？实际上现代浏览器对这样的DOM操作做了优化，并无差别。

4. Vue提升diff性能
    - 优先处理特殊场景
    - “原地复用”


