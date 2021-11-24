import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from '../src/components/Icon'
import { library } from '@fortawesome/fontawesome-svg-core' // 导入图标仓库
import { fas } from '@fortawesome/free-solid-svg-icons' // 全部图标
library.add(fas) // 把图标添加进仓库

storiesOf('Introduction', module).add(
  '介绍',
  () => {
    return (
      <>
        <h1>zhou-cl介绍</h1>
        <p>cl 是 component library</p>
        <strong>该组件库只是我在学习时练习的一个小项目</strong>
        <p>使用 React Hooks 和 typescript</p>
        <p>如果你真的想用、看看什么效果：</p>
        {/* <h2>简单试试</h2>
        <h3>安装</h3> */}
        <code>npm i zhou-cl</code>
        {/* <h3>引用</h3>
        <b>组件</b>
        <p>以Button组件为例：</p>
        <code>import {Button} from 'zhou-cl'`</code>
        <b>样式</b>
        <code>import "zhou-cl/dist/index.css"</code> */}
        <hr></hr>
        <div style={{ fontSize: '3px' }}>
          <a href='https://github.com/okkjoo/zhou-cl'>
            <Icon icon='github' size='1x' />
            github仓库
          </a>
        </div>
      </>
    )
  },
  { info: { disable: true } },
)
