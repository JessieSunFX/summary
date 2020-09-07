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