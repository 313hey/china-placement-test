# 你现在的代码怎么改（两大题+图片选项+说明页）

## 文件结构（放到 docs/ 或同级目录）
- index.html
- exam.html
- result.html
- questions.js
- app.js
- audio/
  - L01.mp3 ... L15.mp3
- img/
  - L01_A.png ... L08_D.png

## 图片插入规则
本版本支持 choices 写成：
- "纯文字"
或
- { text: "A. ...", img: "img/L01_A.png" }

你只要把图片放进 img/ 并按命名规则命名，就会自动显示。

## 两个“说明/示例页”
- L00：听力说明（type: info, points: 0）
- R00：第二大题说明（type: info, points: 0）

它们不计分，但会作为第一页/分段开头出现。
