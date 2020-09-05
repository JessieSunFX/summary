## promise
- https://es6.ruanyifeng.com/#docs/promise#Promise-al
- https://zhuanlan.zhihu.com/p/58428287
- https://zhuanlan.zhihu.com/p/183801144

### 实现原理
- 说到底，Promise 也还是使用回调函数，只不过是把回调封装在了内部，使用上一直通过 then 方法的链式调用，使得多层的回调嵌套看起来变成了同一层的，书写上以及理解上会更直观和简洁一些

#### 基础版本
```
//极简的实现+链式调用+延迟机制+状态
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        if (this.state === 'pending') {//在resolve之前，添加到callbacks中
            this.callbacks.push(onFulfilled);
        } else {//在resolve之后，直接执行回调，返回结果了
            onFulfilled(this.value);
        }
        return this;
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(fn => fn(value));
    }
}
```
- 调用 then 方法，将想要在 Promise 异步操作成功时执行的 onFulfilled 放入callbacks队列，其实也就是注册回调函数，可以向观察者模式方向思考；
- 创建 Promise 实例时传入的函数会被赋予一个函数类型的参数，即 resolve，它接收一个参数 value，代表异步操作返回的结果，当异步操作执行成功后，会调用resolve方法，这时候其实真正执行的操作是将 callbacks 队列中的回调一一执行；
- then 方法能够链式调用,只需要在 then 中 return this 即可。
- 加入延迟机制,保证在 resolve 执行时，then方法的 onFulfilled 已经注册完成
- 增加状态，解决 在 resolve 执行后，再通过 then 注册上来的 onFulfilled 没有机会执行 的问题
- 当增加完状态之后，原先的_resolve中的定时器可以去掉了。
- 当reolve同步执行时，虽然callbacks为空，回调函数还没有注册上来，但没有关系，因为后面注册上来时，判断状态为fulfilled，会立即执行回调
- resolve 执行时，会将状态设置为 fulfilled ，并把 value 的值存起来，在此之后调用 then 添加的新回调，都会立即执行，直接返回保存的value值。
- 一个初具功能的Promise就实现好了，它实现了 then，实现了链式调用，实现了状态管理等等。
- 但仔细想想，链式调用的实现只是在 then 中 return 了 this，因为是同一个实例，调用再多次 then 也只能返回相同的一个结果，这显然是不能满足我们的要求的。

#### Promise链式调用
```
//完整的实现
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        return new Promise(resolve => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
}
```
- 每个 then 注册的 onFulfilled 都返回了不同的结果，层层递进，很明显在 then 方法中 return this 不能达到这个效果
- 引入真正的链式调用，then 返回的一定是一个新的Promise实例。
- 真正的链式 Promise 是指在当前 Promise 达到 fulfilled 状态后，即开始进行下一个 Promise（后邻 Promise）。那么我们如何衔接当前 Promise 和后邻 Promise 呢？
- then 方法中，创建并返回了新的 Promise 实例，这是串行Promise的基础，是实现真正链式调用的根本
- then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
- 根据规范，onFulfilled 是可以为空的，为空时不调用 onFulfilled
- 当第一个 Promise 成功时，resolve 方法将其状态置为 fulfilled ，并保存 resolve 带过来的value。
- 然后取出 callbacks 中的对象，执行当前 Promise的 onFulfilled，返回值通过调用第二个 Promise 的 resolve 方法，传递给第二个 Promise。


### 用过的promise方法
- Promise.prototype.then()
    - 为 Promise 实例添加状态改变时的回调函数。
    - then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
    - then方法返回的是一个新的Promise实例
    ```
    getJSON("/posts.json").then(function(json) {
        return json.post;
    }).then(function(post) {
        // ...
    });
    ```

- Promise.prototype.catch()
    - .then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

- Promise.prototype.finally()
    - 用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。\
    ```
    promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});
    ```

- Promise.all()
    - 用于将多个 Promise 实例，包装成一个新的 Promise 实例。
    - const p = Promise.all([p1, p2, p3]);
    - 参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
    - p的状态由p1、p2、p3决定，分成两种情况。
        1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
        2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

- Promise.race()
    - 同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
    - const p = Promise.race([p1, p2, p3]);
    - 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
    - 参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用Promise.resolve()方法，将参数转为 Promise 实例

- Promise.allSettled()
    - 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
    - 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
    - 返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。
    - 状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。

- Promise.any()
    - 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
    - 跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。

- Promise.resolve()
    - 将现有对象转为 Promise 对象，参数分为4种情况：
    1. 参数是一个 Promise 实例
    - 不做任何修改、原封不动地返回这个实例
    2. 参数是一个thenable对象
    - 将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法
    3. 参数不是具有then方法的对象，或根本就不是对象
    - 返回一个新的 Promise 对象，状态为resolved
    4. 不带有任何参数
    - 返回一个resolved状态的 Promise 对象
    - 希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法

- Promise.reject()
    - 返回一个新的 Promise 实例，该实例的状态为rejected

- Promise.try()
    - 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API


### promise几种状态
- pending 进行中
- fulfilled 已成功
- rejected 已失败
- 状态改变只能是pending到fulfilled或者pending到rejected。状态改变不可逆。

### promise使用场景
- 实现串行任务队列，解决回调地狱- 任务队列是指A完成了调用B，B完成了调用C
- promise和ajax如何结合使用
- 调用多个数据接口
- 加载图片
```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### promise缺陷
- promise一旦执行，无法中途取消
- promise的错误无法在外部被捕捉到，只能在内部进行预判处理
- promise的内如何执行，监测起来很难