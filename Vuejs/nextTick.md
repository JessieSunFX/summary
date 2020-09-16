
### vm.$nextTick([callback])
- 将回调延迟到下次DOM更新循环之后执行。
- 在修改数据之后立即使用它，然后等待DOM更新。
- 跟全局方法Vue.nextTick一样，不同的是回调的this 自动绑定到调用它的实例上。

### 应用场景
- 数据变化后要执行某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构
- created 钩子函数进行DOM操作

### nextTick实现原理
-http://dwz.date/crtf

- Vue中对DOM的更新策略
- 为什么要异步更新DOM

1. 能力检测
    - Vue 在内部尝试对异步队列使用原生的 Promise.then、MutationObserver 和 setImmediate, 如果执行环境不支持，会采用setTimeout(fn, 0)代替
    - 宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务
    - 首先声明了两个变量： microTimerFunc 和 macroTimerFunc ，它们分别对应的是 micro task 的函数和 macro task 的函数。
    - 对于 macro task 的实现，优先检测是否支持原生 setImmediate，这是一个高版本 IE 和Edge 才支持的特性，不支持的话再去检测是否支持原生的 MessageChannel，如果也不支持的话就会降级为 setTimeout 0；
    - 而对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话去检测是否原生支持MutationObserver，不支持的话直接指向 macro task 的实现。
2. 根据能力检测以不同方式执行回调队列
```
http://www.bubuko.com/infodetail-3219154.html?__cf_chl_jschl_tk__=1d0e1e34252c0af5974313027888d314c6c3e259-1599009274-0-AWJE8uuPQuz3grI_zhGx4tGZTqj4p6hrJeoJu5pCMif8oTfv4XbGnsXkRD1UxAcohiTYZWtJqIXnt0vY3gd-LId3ORFwQFljrTeOcrW_K09oMaOsoWffay6dyrs5gau8KKntRbgKQGaIFi_OnvSDoM0romae_aLMEc80v0iA10LWnHhiyd-M4lyMnOdovuVZVsAEf0SaNsvl8fbD1qAGKNsPoKsq9e5txlmfcnTj6m7CnacwhPWrKEKQq4SDWrR1HrseHhzlTyMcbQNvG-PKICSiPsUSUqhlvKdlcDRIjJaLmG2xLrDX12AxVabU6cOMKA
```