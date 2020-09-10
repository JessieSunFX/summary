## react context 
```
interface ContextProps {
  category: string;
  selectedData: any;
  onInputChange: (id: string, value: any, isBlur: boolean) => void;
}

// 创建一个 theme Context,
export const InspectorContext = React.createContext({} as ContextProps); // TS断言

// 父组件使用
<InspectorContext.Provider
    value={{
    category: selectedData && selectedData.category,
    selectedData: selectedData,
    onInputChange: this.handleInputChange,
    }}
>
    {selectedData && <SelectionInspector />}
</InspectorContext.Provider>

// 子孙组件使用
import { InspectorContext } from "../FlowManage";
const { selectedData, onInputChange } = useContext(InspectorContext);
// contextType ??? access时未初始化

// 或者
<InspectorContext.Consumer>
    {({ category }) =>
        category && (
        <div id="myInspectorDiv" className="inspector">
            {/* 开发中... */}
            {/* <Form layout="vertical">{this.renderObjectDetails1()}</Form> */}
            {this.renderObjectDetails1(category)}

            {/* 原来的table表格 */}
            {/* <table>
        <tbody>{this.renderObjectDetails()}</tbody>
    </table> */}
        </div>
        )
    }
</InspectorContext.Consumer>
```