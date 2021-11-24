# **zhou-cl**--使用 React + Typescript 打造自己的组件库

cl 是 component library

**该组件库只是我在学习时练习的一个小项目**

如果你真的想用、看看什么效果：

## 使用

### 安装

`npm i zhou-cl`

### 引用

**组件**

以Button组件为例：

`import {Button} from 'zhou-cl'` 

**样式**

`import "zhou-cl/dist/index.css"`

---

以下是学习时做的笔记。

---



入门之后做什么好？

> - 怎样的代码算是高质量？
> - 项目经验？



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

`npx create-react-app zhou-cl --template typescript`

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

https://fontawesome.com/icons?d=gallery

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

- 自定义触发元素 children
  - button
  - ...
- 拖拽上传
- 文件的预处理

**拖拽**：

- DragOver: 拖进来
- DragLeave：拖出去
- onDrop：拖进来后松开

触发拖拽进入、离开、放入时的**状态**



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
  - jest.fn() 监控本该调用的函数是否触发
  - fireEvent ：各种事件
    - click：点击
    - change：修改值（input
  - toHaveBeenCalled()
  - 第三方组件、自己写的组件
  - ⭐axios
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

- expect.objectContaining(object) : 省略一些实在测试不了的

  ```tsx
  expect(testProps.onRemove).toHaveBeenCalledWith(
      //本来还是 uploadFile 类型，但是其中的uid与当时时间有关，无法复制
        expect.objectContaining({
          raw: testFile,
          status: 'success',
          name: 'test.png',
        }),
      )
  ```

#### 动画延迟导致的测试bug

```tsx
// ./src/Menu/subMenu.tsx
return (
      <Transition in={menuOpen} timeout={300} animation='zoom-in-top'>
        <ul className={subMenuoClasses}>{childrenComponent}</ul>
      </Transition>
    )
```

其中展开动画有延迟，就会导致测试展开时，拿不到想要的展开元素——拿到的是null。可以通过 mock ，最后测试中调用的就不是真正的 Transition 组件，而是一个“平替”。

```tsx
// ./src/Menu/menu.test.tsx
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    },
  }
})
```



#### 异步怎么测试

```tsx
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>  //让断言编译器知道，这个 axios 不是真正的  axios 而是mock出来的         //...
                                         describe('test upload component', () => {
  beforeEach(() => {
    //...
  })
  it('upload process should works fine', async () => {
    //...
    //第一种写法
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'zzz!'})
    // })
    //第二种
    mockedAxios.post.mockResolvedValue({ data: 'zzz!' })
    //... 之后就是已经成功发送异步请求后的情况了，与其他一样 expect
      
  })
})

```

其实最好是将 mockedAxios 放到 beforeEach 中，毕竟后面的测试也要用到异步请求。

```tsx
beforeEach(() => {
    //...
    mockedAxios.post.mockResolvedValue({ data: 'zzz!' })
  })
```



#### 拖拽、放置事件的检测

```tsx
it('drag and drop files should works fine', () => {
	//drag 事件 ✔
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
	//drop 事件 ❌
    fireEvent.drop(uploadArea, {
      dataTransfer: { files: [testFile] },
    })
  })
```

但是 drop 事件因为 jsdom 的原因，不能直接测试——那就自己 createEvent 一个drop 事件对象。并用 defineProperty 扩展该对象，并触发自定义对象

```tsx
//drag ✔
//...
//drop 事件 ✔
	const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea, mockDropEvent)
//...
```





关于 Jest 的更多，可以查看[官网文档](https://www.jestjs.cn/docs/mock-functions)

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



## JavaScript 模块打包与发布

### 发展历程

- comonjs
- AMD
- es6⭐

#### 模块（module)的定义

- 一组可重用的代码
- 可维护性
- 可复用性

### webpack

[webpack中文文档](https://www.webpackjs.com/)

由于浏览器环境的特殊性，像nodejs中同步加载的方法没法在浏览器中使用。——于是便出现了一种工具（module bundler）：将浏览器不支持的模块进行编译转换合并，生成能在浏览器运行的代码。

webpack就是一个bundler，其将所有资源制作为与js平等的模块，并以一致的方法将他们加载进来。对外只暴露**一个**js文件作为入口。

### 其余类似的 module bundler

- rollup.js
- Parcel

### 选择模块格式

**UMD**: 兼容commonjs、AMD、es6，能直接在浏览器使用而不需要用户再安装 plugin。可通过 `script`和`link`标签直接引入文件。**但是，**

>  强烈不推荐如此使用，因为这样无法按需加载，而且难以获得底层依赖模块的bug快速修复支持。——来自 antd 官网

且体积非常大。不推荐使用。

commonJS、ES 模块——最好选择ES模块

> ES 模块是官方标准，也是Javascript 语言明确的发展方向，而CommonJS模块是一种特殊的传统格式，在ES模块被提出前作为暂时的解决方案。ES模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如循环引用和动态绑定等高级功能。——来自Rollup.js 中文网

**create-react-app 也是采用ES模块形式**

---

### 模块入口文件

- 先重构一下代码使得每个组件都有一个 `index.tsx`导出所有的组件相关的东西，来简化入口文件代码。

- tsc 编译 https://www.tslang.cn/docs/handbook/tsconfig-json.html

  - cra 自带的 `tsconfig.json`与开发相关
  - `tsconfig.build.json`与最后打包模块相关

  ```json
  //tsconfig.build.json
  {
    //编译选项
    "compilerOptions": {
      "outDir": "build", //编译打包后的文件放 build 文件夹
      "module": "esnext", //打包为 es模块
      "target": "es5", //编译为es5，将高版本的特性用低版本的代码实现解决浏览器兼容性问题
      "declaration": true, //为每个ts、js文件生成 .d.ts 文件
      "jsx": "react" //指定生成的JSX代码。
    },
    //关于文件的属性
    "include": ["src"], //编译src下的文件,
    "exclude": [
      //不编译test和stories文件
      "src/**/*.test.tsx", //**代表任意长度
      "src/**/*.stories.tsx",
      "src/stories"
    ]
  }
  
  ```

   再在 `package.json`中添加一句命令

  ```json
  "scripts": {
  	//...
  	"build-ts": "tsc -p tsconfig.build.json",
      //...
    },
  ```

  > 关于这个 `-p` :  根据`tsconfig.build.json` 中配置  生成相关文件。
  >
  > 更多模式参数：https://www.typescriptlang.org/docs/handbook/compiler-options.html

  但此时直接运行`build-ts`报错了。

  ![image-20211123101338503](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20211123101338503.png)

  这是 因为 ts 处理模块和 nodejs 处理模块方式不一样。

  模块加载有两种路径：

  - 相对路径 `import XXX from './components/XXX'` 
  - 绝对路径 `import * from 'XXX'`

  相对路径还没有带来什么麻烦，但是绝对路径就有麻烦了。

  - ts 从当前文件夹一级一级往上找
  - node 则是直接从  `module`找

  所以还要在 `tsconfig.build.json`添加多一个编译配置

  ```json
  "moduleResolution": "node" //设置解析模块的方式与node一样
  ```

  **但是，又有新的错误**

  ![image-20211123105129512](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20211123105129512.png)

  `allowSyntheticDefaultImports`只一个配置选项，（具体信息可以查看[官方文档](https://www.tslang.cn/docs/handbook/compiler-options.html)）默认为`false`，为`false`时引入一个默认的模块需要一种麻烦一点的写法`import  * as React from 'react'`，所以我们还需要将其配置为`true`。

  > | `--allowSyntheticDefaultImports` | `boolean` | `module === "system"` 或设置了 `--esModuleInterop` 且 `module` 不为 `es2015` / `esnext` | 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。 |
  > | -------------------------------- | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  > |                                  |           |                                                              |                                                              |

  编译配置中再添一句`  "allowSyntheticDefaultImports": true`

  又来了个错误

  ![image-20211123111100965](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20211123111100965.png)

  查找发现是

  > It seems [`FileList`](https://w3c.github.io/FileAPI/#dfn-filelist) does not support iterator yet, so it won't work even on ES6 mode [as of now](https://github.com/Microsoft/TypeScript/blob/4b284abd5199b22e21d4770325759235ec523447/lib/lib.es6.d.ts#L8477).
  >
  > - Are you targeting ES5? If so it's probably the problem described in [#4031](https://github.com/microsoft/TypeScript/issues/4031)
  >
  >   EDIT: Actually [#3164](https://github.com/microsoft/TypeScript/issues/3164) describes the problem, and [#4031](https://github.com/microsoft/TypeScript/issues/4031) is a response to that
  >
  > --from https://github.com/Microsoft/TypeScript/issues/7181

  所以我把那行代码改为：

  ```tsx
  let postFiles = Array.from(files)
  ```

  这样就行了。**成功编译。**

  ---

  上一个问题设置`"downlevelIteration":true`应该也可行。具体看这篇[文章](https://github.com/microsoft/TypeScript/pull/12346)

  ---

  现在就可以`import { Button } from "zhou-cl";`如此调用了

### 样式文件打包

typescript 有 tsc 编译。sass 也有[`node-sass`](https://www.npmjs.com/package/node-sass)  (现在更推荐使用[ `dart-sass`](https://sass-lang.com/dart-sass),两者用法相似，具体原因看node-sass 那个网站)

之前该项目就已经装过 `node-sass`所以直接用了。

添加、修改一条命令

```json
"scripts": {
    "start": "react-scripts start",
    "build": "yarn build-ts && yarn build-css", //修改
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build-ts": "tsc -p tsconfig.build.json",
    "build-css": "node-sass ./src/styles/index.scss ./build/index.css",//添加
    "storybook": "start-storybook -p 6006 -s public",
    "build-storybook": "build-storybook -s public"
  },
```

`node-sass ./src/styles/index.scss ./build/index.css`将`./src/styles/index.scss`文件编译后放到`./build/index.css`。

调用时就是`import "zhou-cl/build/index.css"`

---



此时每次build之前还要手动删除原来的`build` 文件夹，但是`rm -rf`命令删除文件夹windows系统又不兼容。于是安装了一个工具[`rimraf`](https://www.npmjs.com/package/rimraf)，可以做到跨平台的删除命令操作。

`yarn add rimraf --dev  `

修改命令

```json
"clear": "rimraf ./build", //添加
"build": "yarn clear && yarn build-ts && yarn build-css",//修改
```

现在`yarn build`就能搞定一切了。

### 本地测试组件库

包在发布之前还需要在**本地测试**一下，检查打包出来的东西是否好用。

`yarn link`or`npm link`可以提供帮助。

`npx create-react-app zhou-cl-test --template typescript`建一个`zhou-cl-test`用于本地测试。

在被 link 的项目(`zhou-cl`)下`yarn link`，即可创建一个全局的 软连接 连接`node/modules`到 `zhou-cl` 。再创建一个本地的`zhou-cl-test`项目，`yarn link zhou-cl`即可间接连接二者。

>  `zhou-cl-test`->`node/modules/zhou-cl`->`zhou-cl`



`zhou-cl` 的`package.json`添加入口文件：

```json
"main": "build/index.js",
"module": "build/index.js",
"types": "build/index.d.ts",
```

`zhou-cl-test`的`package.json`的依赖项中添加

```json
"zhou-cl": "0.1.0"
```

来添加一个虚拟依赖，使其能正确弹出提示。就能在其中 `import`相关组件进行测试了。

#### 本地测试遇到的问题

- https://reactjs.org/warnings/invalid-hook-call-warning.html

  > This problem can also come up when you use `npm link` or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming `myapp` and `mylib` are sibling folders, one possible fix is to run `npm link ../myapp/node_modules/react` from `mylib`. This should make the library use the application’s React copy.
  >
  > > Note
  > >
  > > In general, React supports using multiple independent copies on one page (for example, if an app and a third-party widget both use it). It only breaks if `require('react')` resolves differently between the component and the `react-dom` copy it was rendered with.

  大致就是说 可能是两个react版本不同。

  在 `zhou-cl` 下`yarn link ../zhou-cl-test/node-modules/react`

  但是！还是有问题：`No registered package found called `，于是我又查阅资料。

  最终我又找到[这里](https://stackoverflow.com/questions/66346310/yarn-link-error-no-registered-package-found-called) 

  于是：

  ```po	
  cd .\node_modules\react\
  yarn link
  ```

  再进入 `zhou-cl-test`

  ```pow	
  yarn link react
  ```

  此时再启动，就没有问题了。

  

### 发布到npm

#### 先注册一个npm账号

- 可视化注册界面  https://www.npmjs.com/signup 没啥好说的

- 命令行

  - `npm whoami`检测是否登录

  - `npm adduser`注册/登录账户

    - 如果用了淘宝代理还要换回起初的源才能注册

      ```pow
      npm config set registry https://registry.npmjs.org
      ```

      切回默认源

      要换回淘宝源的话

      ```po
      npm config set registry https://registry.npm.taobao.org
      ```

      

#### package 信息

```json
  "description": "React components library", //描述
  "author": "okkjoo",//作者
  "private": false,//是否私人
  "main": "dist/build/index.js",//定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
  "module": "dist/build/index.js",// 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
  "types": "dist/build/index.d.ts",//一个只在 TypeScript 中生效的字段，如果您的包有一个 main.js 文件，您还需要在 package.json 文件中指明主声明文件。 将 types 属性设置为指向 bundled 的声明文件
  "license": "MIT",
  "keywords": [//关键词
    "Component",
    "UI",
    "React",
    "okkjoo"
  ],
  "homepage": "https://github.com/okkjoo/zhou-cl",//主页
  "repository": {//仓库
    "type": "git",
    "url": "https://github.com/okkjoo/zhou-cl"
  },
  "files": [//除了默认上传到npm的以外的文件夹
    "dist"
  ],
```

这里为了语义更为合适，之前的build文件夹更名为dist了（distribution）。

所以 tsconfig.build.json 中指定的文件夹名称也要重build改为dist，以及命令中对build的操作也要改为对 dist 的操作。

还添加了一个命令`  "prepare": "yarn run build"`

**相关知识：版本号**

>  格式:主版本号：次版本号：修订号
>
> 主版本号：做了不兼容的API修改
>
> 次版本号：向下兼容的功能性新增
>
> 修订号：向下兼容的问题修正

##### 上传遇到了问题

 `TypeError: Cannot create property '-registry-npmjs-org' on string '{"-registry-npmjs-org":""}'`

在[这里](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/2340)找到了一个 issue，以及[solution](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)，但没完全解决问题。

随后我又参考了[An unexpected error occurred: "Cannot create property.." after running yarn start #4492](https://github.com/yarnpkg/yarn/issues/4492)

[Cannot create property '-registry-npmjs-org' on string '{\"-registry-npmjs-org\"](https://juejin.cn/post/6844904127151996941)

![image-20211124163544763](https://gitee.com/okkjoo/image-bed/raw/master/imgs/image-20211124163544763.png)

以相似的思路尝试删除了箭头的这行

> `npm config edit`后进入记事本，搜索`registry`找到这句 `regiistryhttps://registry.npmjs.org=`

结果就成功`publish`了。——但具体原理我还真没搞明白，只是大概知道是因为

> The npmrc was not correctly configured

...先不管了，程序和有人有一个能跑就行🐶。

#### 精简 package.json 依赖

**有些依赖仅仅是开发依赖(devDependencies)，并不需要打包到生产环境中(dependencies)。**比如说：

- 单元测试 :`@test`开头的
- ts 及其类型： `ts` `@types`开头的
- 语法转换
- css预处理器 `node-sass`
- module bundler

react 版本也是一个问题，不能让使用者安装过react后再安装一份，两份版本不同就可能会导致错误的发生。因为react是核心依赖库，核心必须先被安装。

所以在前面的`dependencies`字段中将react和react-dom 字段移动到`devDependencies`字段中——因为开发时还是需要的。

这就需要 `package.json`中另一个字段来帮助

```json
"peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
```

这其中声明的依赖不会在`npm install`中安装，而是需要使用者**提前安装**，并且满足条件。

### publish/commit 前的自动化检查

#### 代码规范检查

[ESLint](http://eslint.cn/)： cra 就自带了这个。

关于 eslint 后面跟着的配置，可以去官网看。

添加命令

```json
"lint": "eslint --ext js,ts,tsx src --max-warnings 5",
```

这里第一次运行该`lint`命令后，就会看见很多`warning`。但是如果没有限制`warning`数量的话，是不会报错的。

#### 自动测试

参考文档：https://create-react-app.dev/docs/running-tests/

方法概述就是：设置一个环境变量`CI==true`。让所有测试跑一遍，并且返回测试结果。

但是不同操作环境下设置该环境变量方法还不同，非常麻烦。就可以借助一个工具——[cross-env](https://www.npmjs.com/package/cross-env)，来实现跨平台设置环境变量。

安装：`yarn add cross-env --dev`

添加命令

```json
"test:nowatch": "cross-env CI=true react-scripts test",
```

修改命令

```json
"prepare": "yarn run test:no watch && yarn lint && yarn run build"
```

#### commit 前检查

借助一个小工具`[Husky](https://www.npmjs.com/package/husky)`

>  参考文章：https://zhuanlan.zhihu.com/p/366786798

安装：`yarn add husky --dev`

修改`prepate`命令：添加`husky install`。

```json
"prepare": "husky install && yarn run test:nowatch && yarn lint && yarn run build"
```

直接命令行操作

```po
yarn
npx husky add .husky/pre-commit "yarn test:nowatch && yarn lint"
git add .husky/pre-commit
```

### 静态页面文档

借助 storybook 简单完成：

安装 storybook 后，就会自动添加一个命令`  "build-storybook": "build-storybook -s public",` 

运行`yarn build-storybook`，之后将编译生成的`storybook-static`文件夹放到服务器上即可。[具体方法](https://www.yuque.com/qzhou/learning/lticwc) 

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

#### 拖拽、放置api

[**`DataTransfer.files`**](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/files)属性在拖动操作中表示[`文件列表`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)

> **`DataTransfer.files`**属性在拖动操作中表示[`文件列表`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)。如果操作不包含文件，则此列表为空。
>
> 此功能可用于将文件从用户桌面拖动到浏览器。 

```tsx
const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
```



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
