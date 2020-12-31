## Ajax
- https://www.cnblogs.com/mfyngu/p/12207280.html

### 原理
- 通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。
- XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户，达到无刷新的效果。
- XMLHttpRequest这个对象的属性
    - onreadystatechange  每次状态改变所触发事件的事件处理程序。
    - responseText     从服务器进程返回数据的字符串形式。
    - responseXML    从服务器进程返回的DOM兼容的文档数据对象。
    - status           从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
    - status Text       伴随状态码的字符串信息
    - readyState       对象状态值
        - 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
        - 1 (初始化) 对象已建立，尚未调用send方法
        - 2 (发送数据) send方法已调用，但是当前的状态及http头未知
        - 3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，
        - 4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据