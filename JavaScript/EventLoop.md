## JS执行机制/运行机制/时间循环/EventLoop
- https://www.jianshu.com/p/1368d375aa66

- JavaScript是单线程的，单线程就意味着同一时间只能干一件事。

- 广义上，同步任务和异步任务
- 首先判断JS是同步还是异步，同步就进入主线程运行，异步就进入event table.
- 异步任务在event table中注册事件，当满足触发条件后，（触发条件可能是延时也可能是ajax回调），被推入event queue
- 同步任务进入主线程后一直执行，直到主线程空闲时，才会去event queue中查看是否有可执行的异步任务，如果有就推入主线程中。

- 更精细定义，宏任务和微任务
1. 宏任务、微任务都是队列， 一段代码执行时，会先执行宏任务中的同步代码。
2. 进行第一轮事件循环的时候会把全部的js脚本当成一个宏任务来运行。
3. 如果执行中遇到setTimeout之类的宏任务，就把这个setTimeout内部的函数推入[宏任务的队列]中，下一轮宏任务执行时调用。
4. 如果执行中遇到promise.then()之类的微任务，就会推入到[当前宏任务的微任务队列]中， 在本轮宏任务的同步代码都执行完成后，依次执行所有的微任务。
5. 第一轮事件循环中 当执行完全部的同步代码以及微任务队列中的事件，这一轮事件循环就结束了， 开始第二轮事件循环。
6. 第二轮事件循环同理先执行宏任务中的同步代码，遇到其他宏任务代码块继续追加到[宏任务的队列]中，遇到微任务，就会推入到[当前宏任务的微任务队列]中，在本轮宏任务的同步代码执行都完成后， 依次执行当前所有的微任务。
7. 开始第三轮循环往复..

### 如何知道主线程执行栈为空
- js引擎存在monitoring process进程，会持续不断的检查 主线程 执行栈是否为空，一旦为空，就会去event queue那里检查是否有等待被调用的函数

### 宏任务
- I/O
- setTimeout
- setInterval
- setImmediate
- requestAnimationFram
- MessageChannel
- postMessage
- 整个script代码块

### 微任务
- process.nextTick
- MutationObserver
- Promise.then catch finally
- callback
- Object.observe