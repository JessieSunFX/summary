## 常用loader

1. 模板:
    - html-loader:将HTML文件导出编译为字符串，可供js识别的其中一个模块
    - pug-loader : 加载pug模板
    - jade-loader : 加载jade模板(是pug的前身，由于商标问题改名为pug)
    - ejs-loader : 加载ejs模板
    - handlebars-loader : 将Handlebars模板转移为HTML

2. 样式:

    - css-loader : 解析css文件中代码
    - style-loader : 将css模块作为样式导出到DOM中 Adds CSS to the DOM by injecting a \<style> tag
    - less-loader : 加载和转义less文件
    - sass-loader : 加载和转义sass/scss文件
    - postcss-loader : 使用postcss加载和转义css/sss文件

3. 脚本转换编译:

    - script-loader : 在全局上下文中执行一次javascript文件，不需要解析
    - babel-loader : 加载ES6+ 代码后使用Babel转义为ES5后浏览器才能解析
    - typescript-loader : 加载Typescript脚本文件
    - coffee-loader : 加载Coffeescript脚本文件

4. JSON加载:

    - json-loader : 加载json文件（默认包含）
    - json5-loader : 加载和转义JSON5文件

5. Files文件
    
    - raw-loader : 加载文件原始内容(utf-8格式)
    - url-loader : 多数用于加载图片资源,超过文件大小显示则返回data URL
    - file-loader : 将文件发送到输出的文件夹并返回URL(相对路径)
    - jshint-loader : 检查代码格式错误

6. 加载框架:

    - vue-loader : 加载和转义vue组件
    - angualr2-template–loader : 加载和转义angular组件
    - react-hot-loader : 动态刷新和转义react组件中修改的部分,基于webpack-dev-server插件需先安装,然后在webpack.config.js中引用react-hot-loader