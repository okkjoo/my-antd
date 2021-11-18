入门之后做什么好？

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

### Button 组件

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

### Menu 组件

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

### Icon 组件

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

注意要引入全部图标才能方便显示

```tsx
//可以在要使用的地方或者直接在 icon.tsx 中引入，这里我为了方便直接在icon.tsx中引入了

import { library } from '@fortawesome/fontawesome-svg-core' // 导入图标仓库
import { fas } from '@fortawesome/free-solid-svg-icons' // 全部图标
library.add(fas) // 把图标添加进仓库
```



### Transition 组件

通过二次封装 fontAwesomeIcon 制作一个自己组件库的动画效果。

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

  - 容器选项 —— 为了有时需要覆盖原先的元素的动画效果，在该元素外层包裹一个容器，将需要设置的动画放在容器上即可。
  
  - 新知识：
  
    `config.disabled`设置为`true`即可直接将全局动画改为同步，对于组件本身就会感受不到这些动画变化。——方便测试

```tsx

import { config } from 'react-transition-group'

config.disabled = true
```



### Input 组件

#### 需求分析

- 自动补全

- 属性分析👇

  ```jsx
  <Input 
      disabled
      size="lg|sm"
      icon="fontawesome 支持的图标"
      prepand="input 前缀,string | ReactElement"
      append="input 后缀, string | ReactElement"
      {...restProps} 支持其他所有的 HTMLInput 属性  
  />
  ```


### AutoComplete 组件

#### 需求分析

```tsx
//字符串数据提供，数据选择放在组件外部，因为可能直接异步获取，并不使用到传入的数据
const dataStr = ['1','2','abc','']

interface AutoCompleteProps {
    fetchSuggestions : (keyword: string) => string[] || Promise<string[]>, //过滤值
    onSelect: (item: string) => void,//用户选了哪个
}
    
 //in component
const handleChange = (keyword: string) =>{
    return dataStr.filter(item => item.includes(keyword))//1. 同步
    return fetch(`url?keyword=${keyword}`)//2. 异步
}

const handleSelect = (item: string) =>{
    console.log(item)
}
//组件的使用
<AutoComplete
    fetchSuggestions = {handleChange}
    onSelect = {handleSelect}
/>
```

- 用户选项                        custon option
- 键盘移动事件                 keyborad support
- 函数防抖                         debounce
- 下拉菜单的展开与收起 click outside

##### 异步请求中的防抖

目前：每输入一个字符，都会发送一次异步请求，这会导致多余的请求甚至不能保证最后返回的结果是最后发送的请求所需的。

需要改进为：每输入一个字符后过一小段时间后确保用户不再输入字符后再发送请求。

**函数防抖的原理：**

通过一个闭包保存一个标记，保存`定时器`的返回，每当用户触发就清空之前的定时器并重新开始计时。

现成的： lodash 中的 `_.debounce(func, [wait = 0], [options={}])`

我选择的是：自定义Hook

###### 自定义Hook : useDebounce

```tsx
//src/hook/useDebounce.tsx
import { useEffect, useState } from 'react'

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce

```

##### 键盘事件

- 上下：拟选择某一项，并且高亮
- enter： 选择该项填充 input 并关闭菜单
- esc： 关闭菜单
- 再次更新 input 内内容时，`highlightIndex`要重置

##### 点击菜单外部收起菜单

1. 要辨认点击的位置
2. 辨认界面上的所有click事件
3. 绑定一个够大的点击事件——`componentRef`
4. 给 document 绑定一个点击事件
5. 判断点击的是什么元素
6. 根据`e.target`来拿到当前点击了到底什么元素
7. 判断整个 DOM 中是否包含这个节点

###### 自定义Hook: useClickOutside

 

##### 遇到的 bug

每次 激活 onSelect 后，想要的效果是：item.value 填充 input ，菜单消失;

但是因为每次 value 改变，又会调用一次 useEffect ，导致再次 fecth 一次数据——需要一个 flag 让其知道什么时候更新数据、什么时候不更新。

并且这个flag 不需要引起组件的重新渲染，只需要保持一个不同的状态即可。—— 使用 useRef

### UpLoad 组件 ⭐

#### 需求分析

- 借助 AJAX 在页面不跳转的情况下，完成文件上传
- 上传的可视化效果
  - 上传时
  - 上传成功
  - 上传失败
  - 取消文件
- 拖动、点击、预览

 <img src="https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20211115165224259.png" alt="image-20211115165224259" style="zoom:80%;" />

```tsx
<Upload
    action='https://...' //后端接口
    beforeUpload={()=>{}}
    onProgress={()=>{}}
    onChange={()=>{}}
    OnSuccesss={()=>{}}
    OnError={()=>{}}
    OnRemoved={()=>{}}
>
 	<Button>click to upload</Button>  //可以自定义
</Upload>
```

##### 上传文件功能

经典：借助表单 form 功能，再设置 input type 为 file，来完成文件的选择。然后再用 form 的 submit 来提交。

因为文件是二进制文件，所以要设置`encType='multiline/form-data'`

```tsx
<div style={{ marginTop: '100px', marginLeft: '100px' }}>
          <form
            method='post'
            encType='multiline/form-data'
         	 action='http://jsonplaceholder.typicode.com/posts'
          >
            <input type='file' name='FILE' />
            <button type='submit'>Submit</button>
          </form>
        </div>
```



⭐js 异步请求：

借助 FormData

```tsx
const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files: FileList | null = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios
        .post('http://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Content-Type': 'multiline/form-data',
          },
        })
        .then((resp) => {
          console.log(resp)
        })
    }
  }

//app.tsx
...
return(
    <div style={{ marginTop: '100px', marginLeft: '100px' }}>
          <input
            type='file'
            name='FILE'
            onChange={handleFileChange}
          />
        </div>
)
```

##### 更多的配置项

- http post请求
  - 自定义 Header
  - 自定义name 属性：发到后端的文件参数名称
  - 自定义formData 属性： 额外数据
  - 自定义withCredentials：是否携带cookie（axios config 自带）
- 自定义input 自带的约束属性：
  -  [multipe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#multiple)（文件的多选）
  - [accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#accept)（文件类型）

###### 遇到的bug

多个文件上传时，只显示了最后选择的哪个。

原因在 _post 方法中这行代码

```tsx
//upload.tsx _post
setFileList([_file, ...fileList])
```

当多个 post 请求发送时，这里的 fileList 还没更新前面新增的文件，就被最后一个post覆盖掉了。所以需要改成

```tsx
setFileList((preFileList) => {
  return [_file, ...preFileList]
})
```

这样传入参数才能确保每次拿到的 fileList 都是最新的。

##### 可视化

###### 不同的状态

每个上传的文件状态都可能不一样，还需要专门存储他们的状态。——用一个存储Upload File 类型的数组

**状态类型：**

```tsx
export type UploadFileStatus =
  | 'ready'
  | 'uploading'
  | 'success'
  | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File //源文件
  response?: any
  error?: any
}

//FC
const [fileList, setFileList] = useState<UploadFile[]>([])
//_post  每次post时更新
 const _post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList])
     //...
 }

```

但是 `setFileList([_file, ...fileList])`的更新是异步的，会导致 axios config 中 onUploadProgress 中拿不到正确的数据。

这就要用到 useState 中调用 set 方法的另一个传参方法——传一个函数。传入的这个函数接收的参数就是**上一次更新的值**。

```tsx
//封装一下更新FileList的方法
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
  ) => {
    setFileList((preFileList) => { // 传入函数
      return preFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj,
          }
        } else {
          return file
        }
      })
    })
  }
//onUploadProgress中
  onUploadProgress: (e) => {
      let percentage = Math.round((e.loaded * 100) / e.total) || 0
      if (percentage < 100) {
          //*
        updateFileList(_file, {
              percent: percentage,
              status: 'uploading',
            })
        if (onProgress) {
          onProgress(percentage, file)
        }
      }
    },
```

同理在success 和 error 时也要更新

```tsx
//...
	.then((resp) => {
        //console.log('resp', resp)
        //*
        updateFileList(_file, {
          status: 'success',
          response: resp.data,
        })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        //console.error('error', err)
        //*
        updateFileList(_file, {
          status: 'error',
          response: err,
        })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
```

###### loading 的进度条 Progress

这个完全可以当作是另外一个组件——因为他实在是太多场景可以复用，所以下一个组件就是  `Progress`。

###### 交互

- 自定义触发元素

  - button
  - ...

- 拖拽上传

- 文件的预处理

  

### Progress 组件

#### 需求分析

主要两部分：

- outer： total 总长度
- inner： percentage 

需要能自定义：

- 颜色
- 高度
- 长度
- 文字
  - 是否显示

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

也可单独运行某个测试`yarn test -- -t "auto"` 不用完全输入整个文件的名字，它会自动查找

##### jest-dom

在原来的断言库中新增了许多方法——针对DOM，也是内置好的，见上图。

该扩展有关入口——``setupTest.ts`，cra 模板里也有的 ，在src文件夹下。



### 书写测试

- case分类
- mock 模拟用户动作
  - jest.fn()
  - fireEvent ：各种事件
    - click：点击
    - change：修改值（input
  - toHaveBeenCalled()
- beforeEach()钩子：在所有测试样例之前执行一些操作

```tsx
beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete',
    ) as HTMLInputElement
  })
```

- 
  - data-testid
  - getByTestId()

- cleanup 
- toBeVisible
- 异步
  - async
  - await
    - waitFor
- wrapper.container : 获得DOM节点



## 文档 storybook

### 开发痛点

- cra 入口文件不适合管理组件库
- 缺少行为追踪和属性调试功能

### 我需要的

-  分开展示各个组件不同属性下的状态
- 能追踪组建的行为并且具有属性调试的功能
- 为组件自动生成文档和属性列表

### story

[使用指南](https://www.jianshu.com/p/9cb75ae50515)

[官网](https://storybook.js.org/)

### addons

#### decorater

给文档添加css样式

没啥好说的，简单

#### info-addon

控制文档的展示信息

```sh
yanr add -D @storybook/addon-info
yarn add  @types/storybook__addon-info  
```

### react-docgen

react的文档自动生成器

storybook 自带了这个，但是我们还需要让他支持 typescript

`  yarn add --dev react-docgen-typescript-loader `

 #### JSDoc

一种注释格式

`/**       */`

支持 markdown

详细点击：[JSDoc 介绍](https://www.shouce.ren/api/view/a/13232)

## 查漏补缺

### CSS

#### SCSS

- each map

  ```scss
  @each $key, $val in $theme-colors {
    .icon-#{$key} {
      color: $val;
    }
  }
  ```

#### 动画效果

别人做好的动画合集https://animate.style/

### JavaScript

#### 异步发送请求

##### Axios

`yarn add axios --save`

fetch 没有办法原生检测请求进度——Upload 组件非常看重这点。



###### config

- get请求第二个参数就是config
- post 请求第三个参数就是config，第二个参数是 postData
- onUploadProgress 可获得 上传进度

常用的 config

```tsx
axios
      .get('http://jsonplaceholder.typicode.com/posts/1', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        responseType: 'json',
        onUploadProgress: (e) => {
            let percentage =
              Math.round((e.loaded * 100) / e.total) || 0
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file)
              }
            }
          },
      })
      .then((resp) => {
        setTitle(resp.data.title)
      })
```



**异步请求怎么上传文件：**已经在前面写了。

##### 在线请求测试服务

- [JSONPlaceholder](http://jsonplaceholder.typicode.com/)
- [Mocky](https://designer.mocky.io/)

我选用的是前者



### typescript

- Omit : 忽略接口中的某个值

  ```jsx
  export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
        //...
    }
  ```

- 处理复杂数据结构 —— `autoComplete`组件中传入的数据来源

  ```tsx
  
  interface DataSourceObject {
    value: string
  }
  export type DataSourceType<T = {}> = T & DataSourceObject
  ```

- Partial 只要是其中一部分就行，不管全不全

  ```tsx
   const updateFileList = (
      updateFile: UploadFile,
      updateObj: Partial<UploadFile>,
    ) => {}
  ```

  



### React

- React.children.map

- React.cloneElement()

  ```tsx
  React.cloneElement(
    element,//必须是一个存在的React组件或者原生DOM
    [props],//配置当前element的props
    [...children]//配置当前element的children，较少使用
  )
  
  //常与 React.Children.map 和 this.props.children搭配使用
  React.Children.map(this.props.children,child=>{
      React.cloneElement(child,{...props},children)
  })
  ```

  

- React中原生CSS比较难实现的过渡动画

- displayName

- createContext：  通过Context提供一个全局态的store, 结合 useContext 使用

  ```tsx
  //Menu.tsx
  interface IMenuContext {
    index: string
    onSelect?: SelectCallback
    mode?: MenuMode
    defaultOpenSubMenus?: string[]
  }
  export const MenuContext = createContext<IMenuContext>({ index: '0' })
  //item.tsx
  const context = useContext(MenuContext)
  
  ```

- useState 调用 set 方法时传入函数

### git commit规范

#### type

指明 git  commit 的类别，应该使用以下类型:

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
