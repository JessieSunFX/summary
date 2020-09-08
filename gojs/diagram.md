- https://blog.csdn.net/weixin_30376509/article/details/99649225?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduend~default-4-99649225.nonecase&utm_term=gojs%E6%92%A4%E9%94%80%20%E9%87%8D%E5%81%9A
- https://blog.csdn.net/qq_29287561/article/details/81066004
- https://www.cnblogs.com/donve/p/11236931.html
- https://my.oschina.net/u/4357988/blog/3347729/print
### 连线
- 曲线
```
 diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        // selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
        // routing: go.Link.AvoidsNodes,
        // routing: go.Link.Orthogonal,
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
```
- 折线
```
diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
        routing: go.Link.AvoidsNodes,
        // routing: go.Link.Orthogonal,
        curve: go.Link.JumpOver,
```

### diagram初始化 && 拖拽复制问题
```
 myDiagram.model = $(go.GraphLinksModel, {
      copiesArrays: false,
      copiesArrayObjects: false,
      // nodeDataArray: nodedata,
      // linkDataArray: linkdata,
      linkKeyProperty: "key",
    });
```

### 拖拽连线脱节
```
myDiagram.model = $(go.GraphLinksModel, {
     
      linkFromPortIdProperty: "fromPort",
      linkToPortIdProperty: "toPort",
     
    });
```

### 关闭按钮居右

```
$(
  go.Panel,
  "Table",
  { stretch: go.GraphObject.Horizontal },

$(
  "Button",
  {
    column: 2,
    alignment: go.Spot.Right,
```

### 边框
```
 go.Node,
    "Auto",
    {
      locationObjectName: "TB",
      locationSpot: go.Spot.Center,
    },
    $(go.Shape, {
      fill: "transparent",
      stroke: "darkblue",
      strokeWidth: 1,
      height: 40,
    }),
```

### 限制palette拖拽区域，防止出现动态滚动条
```
autoScrollRegion：0,
hasVerticalScrollbar:false,
hasHorizontalScrollbar:false
```

### 画布比例自适应
- autoScale
- autoScale:go.Diagram.Uniform,//自适应
- autoScale:go.Diagram.UniformToFill,//自适应
- autoScale:go.Diagram.None,//默认值不自适应

### 禁止删除某一组件
myDiagram.commandHandler.canDeleteSelection = function () {
      //用例获取选中的节点或线
      return myDiagram.selection.all(function (nodeOrLink) {
        // console.log(nodeOrLink.data);
        //判断是否存在不允许删除的节点或线
        if (nodeOrLink.data.name === "开始") {
          console.log("开始组件不允许删除");
          return false;
        } else {
          return true;
        }
      });
    };
