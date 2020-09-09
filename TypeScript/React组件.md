## ts写React组件
- https://www.cnblogs.com/everlose/p/12518852.html
- https://juejin.im/post/6844903612787720206

### 无状态组件
```
import React, { MouseEvent, SFC } from 'react'

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  src: string,
  show: boolean,
}

const BigImage: SFC<Props> = ({ onClick, show, src }) => {
  return show ? <div className="big-img-wrap" onClick={onClick}>
      <div className="big-img-content">
        <img src={src} className="big-img"} alt="" />
      </div>
  </div> : null;
}

export default IMBigImage;
```

### 有状态组件
```
import React, { Component } from 'react';

import { Button } from 'antd';

type IProps = Readonly<{
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: Function;
}>;

const initialState = { clickCount: 0 };
type IState = Readonly<typeof initialState>;

class ButtonCounter extends Component<IProps, IState> {
  readonly state: IState = initialState;
  
  componentWillReceiveProps(nextProps: any) {
    const { value } = nextProps;
    if (value) {
      this.setState({
        clickCount: value
      })
    }
  }

  render() {
    const { clickCount } = this.state;
    const { className, style } = this.props;
    return (
      <div className={`${className}`} style={`${style}`}>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
        You've clicked me {clickCount} times!
      </div>
    );
  }

  private handleIncrement = () => {
    const { onChange } = this.props;
    const { clickCount } = this.state;
    this.setState({
      clickCount: clickCount + 1,
    });  
    onChange && onChange(clickCount + 1);
  };
  private handleDecrement = () => {
    const { onChange } = this.props;
    const { clickCount } = this.state;
    this.setState({
      clickCount: clickCount - 1,
    });  
    onChange && onChange(clickCount - 1);
  }
}
```