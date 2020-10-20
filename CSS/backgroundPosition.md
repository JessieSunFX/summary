## background-position

- 设置背景图像的起始位置。
- 这个属性设置背景原图像（由 background-image 定义）的位置，背景图像如果要重复，将从这一点开始。
- 您需要把 background-attachment 属性设置为 "fixed"，才能保证该属性在 Firefox 和 Opera 中正常工作。
- 默认值：0% 0%
- 继承性：no
- 版本：CSS1
- JavaScript 语法：object.style.backgroundPosition="center"
- top left/top center/top right/center left/center center/center right/bottom left/bottom center/bottom right ：如果您仅规定了一个关键词，那么第二个值将是"center"。
- x% y% ：左上角是 0% 0%。右下角是 100% 100%。如果您仅规定了一个值，另一个值将是 50%。
- xpos ypos ：左上角是 0 0。单位是像素 (0px 0px) 或任何其他的 CSS 单位。如果您仅规定了一个值，另一个值将是50%。您可以混合使用 % 和 position 值。