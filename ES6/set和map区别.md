## ES6 Set和Map 区别

- 数据结构定义区别
    - Set类似于数组，但是成员的值都是唯一的，没有重复。使用new Set()创建Set实例
    - Map类似于对象，但是键的范围不限于字符串，各种类型的值都可以作为键值。使用new Map()创建Map实例

- 操作方法的区别
1. size属性
    - set.size
    - map.size
2. 新增
    - set.add(val); 返回Set结构本身
    - map.set(key, val); 返回Map结构本身
3. 删除
    - set.delete(val); 返回布尔值，表示是否删除成功
    - map.delete(key); 返回布尔值，表示是否删除成功
4. 是否包含某个值
    - set.has(val); 返回布尔值，表示是否包含这个值
    - map.has(val); 返回布尔值，表示是否包含这个键
5. 获取值
    - map.get(key); 返回对应键值的值，没有则返回undefined
6. 清除所有成员
    - set.clear(); 没有返回值
    - map.clear(); 没有返回值

- 遍历方法
1. 遍历键名
    - for(let item of set.keys()){ }
    - for(let item of map.keys()){ }
2. 遍历键值
    - for(let item of set.values()){ }
    - for(let item of map.values()){ }
3. 遍历键值对
    - for(let item of set.entries()){ }
    - for(let item of map.entries()){ }
4. 使用回调遍历每个成员
    - set.forEach()
    - map.forEach()

- 应用
1. 数组去重
    - [...new Set(arr)]
    - Array.from(new Set(arr))
2. 重复字符去重
    - [...new Set('ababbc')].join('')