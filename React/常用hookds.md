## 常用hooks
- useState
- useRef 与渲染无关的数据可以使用useRef存储，不需要useState管理状态。
- useReducer()：action 钩子
- useEffect()：副作用钩子
- useContext: 在组件之间共享状态
- useMemo:执行昂贵计算
- useCallback: 跟useMemo比较类似，但它返回的是缓存的函数

- 可以使用命令式或useEffect的方式管理定时器，但往往使用useEffect更为方便，也能照顾到组件销毁时的情况。
- 对于不希望引发useEffect的数据，可以使用useRef管理形成一种“作弊”骗过eslint，同时确保能在useEffect的闭包中取到最新的值。