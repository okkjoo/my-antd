> - 入门之后做什么好？
> - 怎样的代码算是高质量？
> - 项目经验？

# 使用 React + Typescript 打造自己的组件库——zhou-cl

cl 是 component library

[TOC]

## 前置知识

- 前端开发基础知识（html、css、js——es6）
- react 基础知识
- 用过 npm

### Typescript

我也写过一篇笔记记录 ts 的简单使用，可以当作手册一样查询使用。

[我的手册链接](https://www.yuque.com/qzhou/learning/wo7r7c)

## 能学习 / 锻炼到

- TS

  ![image-20210919103333769](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20210919103333769.png)

- React Hook

- React 测试

- 项目流程

- 前端知识点查缺补漏

- 解决问题的思路和方法

## 思考/会做什么

- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件单元测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成

## 开动

`npx create-react-app my-app --template typescript`

### 整体文件结构

![image-20210921202835306](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20210921202835306.png)

### 样式方案

- inline css ❌
- css in js ❌
- 预处理器 Sass  ✔
  - vscode有插件(Live Sass Compiler)可以直接编译 
  - 使用node-sass `yarn add node-sass@4.14.1 ` ，因为新版本的node-sass 不兼容了
- normalize.css ✔ 

#### 样式文件结构

![image-20210921202607927](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20210921202607927.png)

#### 色彩体系

![image-20210921204121617](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20210921204121617.png)

- 系统色板 = 基础色板 +  中性色板
- 产品色板 = 品牌色(主色调和副色调) + 功能色板(成功失败状态等)

参考：

- [中国色](http://zhongguose.com/)

#### 组件样式变量

- 基础色彩系统
- 科学的字体系统
  - 字体家族
    - 优先系统字体
    - 无衬线字体（默认）
    - 等宽字体（代码）
  - 字体大小
    - 用rem控制
    - 要有不同变量以供选择
    - 标题等另外设置，基于base控制
  - 字重（相对于字体高度的笔画粗细）
    - 同样多种变量以供选择
  - 行高
    - 同上
- 常用样式
  - 表单
  - 按钮
  - 边框和阴影
  - 背景
- 可配置开关

#### 工具

classnames 用于方便地控制 className

## 各个组件

### Button

#### 需求分析

- 不同的大小 size
  - 控制 padding
- 不同的类型 type
  - Primary
  - Default
  - Danger
  - Link Button
- 不同的状态
  - disabled
    - 还要设置鼠标 cursor

### Menu

#### 需求分析

- 基本样式
  - 展示方法
    - 横向(默认)
      - Horizontal
    - 纵向
      - vertical
  - 功能
    - 下拉
    - 展开
      - SubMenu
  - 状态
    - 高亮 is-active
    - disabled

### Icon

#### icon发展

- 雪碧图 CSS sprite
- Font Icon
- SVG

#### SVG

##### 优势

- 完全可控
- SVG 即取即用，Font Icon要下载相关字体文件
- Font Icon 有些奇怪的bug——没加载好文件的情况

##### react-fontawesome

使用第三方库、二次封装

[github仓库](https://github.com/FortAwesome/react-fontawesome)

```
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
```

#### 二次封装

内部使用返回`fontAwesomeIcon`标签，外面套一层自己组件库相关的属性进行控制，如：

- 主题色

  - 用到SCSS的循环赋值方法——`each` 、`map` 

- 动画效果

  - 原生CSS （首选方案）

    - transform
    - transition

  - 但react中有用不了原生动画的情况

    - display：none 后再出现，会使得 出现效果与动画末尾时机重叠，过渡动画自然就失去了

    - 所以就需要有**延时**的解决方案——有一个针对react动画实现的库😀

      > Exposes simple components useful for defining entering and exiting transitions. React Transition Group is not an animation library like [React-Motion](https://github.com/chenglou/react-motion), it does not animate styles by itself. Instead it exposes transition stages, manages classes and group elements and manipulates the DOM in useful ways, making the implementation of actual visual transitions much easier.
      >
      > 公开用于定义进入和退出转换的简单组件。React Transition Group 不是像[React-Motion](https://github.com/chenglou/react-motion)那样的动画库，它**本身不会动画样式**。相反，它公开转换阶段，管理类和组元素并以有用的方式操作 DOM，使实际视觉转换的实现更加容易。

    - 之前我也有用过 ——[ 详细笔记](https://www.yuque.com/qzhou/learning/szwcrw)

## 测试

### 重要性

- 高质量代码
- 更早发现成本
- 方便重构和升级
- 开发更为敏捷

### 测试框架 

#### Jest

 [Jest中文网](https://www.jestjs.cn/)

这个也是 cra 的默认内置测试框架，所以直接	`npx jest xxx.test.js`即可运行，命令后面加一个`--watch`就表示一直监视

---

#### React Test Library

[raect官方推荐](https://zh-hans.reactjs.org/docs/test-utils.html#gatsby-focus-wrapper)

也是作为react默认自带的测试工具

`package.json`

![image-20210924105223944](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20210924105223944.png)

 `yarn run test`即可运行所有 `.test.tsx`结尾的文件

##### jest-dom

在原来的断言库中新增了许多方法——针对DOM，也是内置好的，见上图。

该扩展有关入口——``setupTest.ts`，cra 模板里也有的 ，在src文件夹下。



### 书写测试

- case分类
- mock 模拟用户动作
  - jest.fn()
  - fireEvent
  - toHaveBeenCalled()
- beforeEach()钩子
-  
  - data-testid
  - getByTestId()
- cleanup 
- toBeVisible
- 异步
  - async
  - await
    - wait

## 查漏补缺

### SCSS

- each map

  ```scss
  @each $key, $val in $theme-colors {
    .icon-#{$key} {
      color: $val;
    }
  }
  ```

  

### React

- React.children.map
- React.cloneElement()
- React中原生CSS比较难实现的过渡动画

### git commit规范

#### type

指明 git commit 的类别，应该使用以下类型:

- 『feat』: 新增功能
- 『fix』: 修复 bug

- 『docs』: 仅仅修改了文档，比如 README, CHANGELOG 等等
- 『test』: 增加/修改测试用例，包括单元测试、集成测试等

- 『style』: 修改了空行、缩进格式、引用包排序等等（不改变代码逻辑）
- 『perf』: 优化相关内容，比如提升性能、体验、算法等

- 『refactor』: 代码重构，「没有新功能或者 bug 修复」
- 『chore』: 改变构建流程、或者增加依赖库、工具等

- 『revert』: 回滚到上一个版本
- 『merge』: 代码合并
