## diff算法
- 源码路径： vue/src/core/vdom/patch.js

### diff算法的时间复杂度

- 两个树的完全的diff算法是一个时间复杂度为O(n^3)的问题
- 将两个DOM树的所有节点两两对比，时间复杂度O(n^2)
- 再进行树的编辑(插入、替换、删除)需要遍历一次，因此时间复杂度为O(n^3)

- vue进行了优化，O(n^3)复杂度的问题转换成O(n)复杂度的问题，只比较同级不考虑跨级问题
- 在前端中，很少会跨越层级地移动dom元素。所以 Virtual Dom 只会对同一个层级的元素进行对比。

### vue中diff算法原理
- https://blog.csdn.net/weixin_34304013/article/details/91368678

1. patch 
    - 函数接收两个参数 oldVnode 和 vnode 分别代表旧节点和新节点
    - 如果vnode不存在，而oldVnode存在，则调用 invokeDestroyHook 销毁旧的节点
    - 如果oldVnode不存在，而vnode存在，则调用 createElm 创建新的节点
    - 如果oldVnode和vnode都存在
        - 如果oldVnode不是真实节点且和vnode是相同节点（调用sameVnode比较），则调用patchVnode进行patch
        - 否则，调用createElm创建新的DOM节点，并插入到真实的父节点中，同时调用removeVnodes将旧的节点从父节点中移除。
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
    - 如果vnode和oldVnode完全一致，则什么都不做处理，直接返回
    - 如果oldVnode和vnode都是静态节点，且具有相同的key，并且当vnode是克隆节点或是v-once指令控制的节点时，只需要把oldVnode的elm和oldVnode.children都复制到vnode上即可
    - 如果vnode不是文本节点或注释节点
        - 如果vnode的children和oldVnode的children都存在，且不完全相等，则调用 updateChildren 更新子节点
        - 如果只有vnode存在子节点，则调用 addVnodes 添加这些子节点
        - 如果只有oldVnode存在子节点，则调用 removeVnodes 移除这些子节点
        - 如果oldVnode和vnode都不存在子节点，但是oldVnode为文本节点或注释节点，则把 oldVnode.elm 的文本内容置为空
    - 如果vnode是文本节点或注释节点，并且vnode.text和oldVnode.text不相等，则更新oldVnode的文本内容为vnode.text

3. updateChildren
    - updateChildren方法主要通过while循环去对比2棵树的子节点来更新dom,通过对比新的来改变旧的，以达到新旧统一的目的。
    1. 如果oldStartVnode不存在，则将oldStartVnode设置为下一个节点
    2. 如果oldEndVnode不存在，则将oldEndVnode设置为上一个节点
    3. 如果oldStartVnode和newStartVnode是同一个节点（sameVnode），则调用patchVnode进行patch重复流程，同时将oldStartVnode和newStartVnode设置为下一个节点
    4. 如果oldEndVnode和newEndVnode是同一个节点（sameVnode），则调用patchVnode进行patch重复流程，同时将oldEndVnode和newEndVnode设置为上一个节点
    5. 如果oldStartVnode和newEndVnode是同一个节点（sameVnode），则调用patchVnode进行patch重复流程，将oldStartVnode.elm移动到oldEndVnode.elm的后面,同时将oldStartVnode设置为下一个节点，newEndVnode设置为上一个节点
    6. 如果oldEndVnode和newStartVnode是同一个节点（sameVnode），则调用patchVnode进行patch重复流程，将oldEndVnode.elm移动到oldStartVnode.elm的前面,同时将oldEndVnode设置为上一个节点，newStartVnode设置为下一个节点
    7. 否则，尝试在oldChildren中查找与newStartVnode具有相同key的节点
        - 如果没有找到，则说明newStartVnode是一个新节点，则调用createElem创建一个新节点，同时将newStartVnode设置为下一个节点
        - 如果找到了具有相同key的节点 vnodeToMove
            - 如果找到的节点与newStartVnode是同一个节点（sameVnode），则调用patchVnode进行patch重复流程，同时把vnodeToMove.elm移动到oldStartVnode.elm之前，并把newStartVnode设置为下一个节点
            - 否则，调用createElm创建一个新的节点，同时把newStartVnode设置为下一个节点
    - 上述过程中，循环条件为oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx，即oldChildren和newChildren节点在遍历过程中如果任意一个的开始索引和结束索引重合，则表明遍历结束。

    - 遍历结束后，还需针对oldChildren和newChildren没有遍历的节点进行处理，分为以下两种情况：
    1. 如果oldStartIdx大于oldEndIdx，说明newChildren可能还未遍历完，则需要调用addVnodes添加newStartIdx到newEndIdx之间的节点
    2. 如果newStartIdx大于newEndIdx，说明oldChildren可能还未遍历完，则需要调用removeVnodes移除oldStartIdx到oldEndIdx之间的节点

    - 整个过程是逐步找到更新前后vdom的差异，然后将差异反应到DOM树上（也就是patch），Vue的patch是即时的，并不是打包所有修改最后一起操作DOM（React则是将更新放入队列后集中处理），朋友们会问这样做性能很差吧？实际上现代浏览器对这样的DOM操作做了优化，并无差别。


```
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }
```

4. Vue提升diff性能
    - 优先处理特殊场景
    - “原地复用”


