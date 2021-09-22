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

## 各个组件

