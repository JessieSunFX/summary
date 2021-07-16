## 为什么vue没有完全遵循mvvm?
- https://www.zhihu.com/question/327050991

1. mvvm在vue中的体现；
- model对应组件中的data、props属性；
- view对应组件中的template(也包括style?);
- viewmodel继承自vue类的组件实例；
2. vue哪些地方违反了mvvm;
- 严格的mvvm要求view不能直接和model通信，vue在组件中提供了$refs这个属性，让model可以直接操作view，违反了这一规定，所以说vue没有完全遵循mvvm。