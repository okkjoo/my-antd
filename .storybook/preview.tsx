import React from 'react'
import {
  configure,
  addDecorator,
  addParameters,
} from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
library.add(fas)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const loaderFn = () => {
  const allExports = [require('../src/About_zhou-cl.stories.tsx')]
  const req = require.context(
    '../src/components',
    true,
    /\.stories\.tsx$/,
  )
  req.keys().forEach((fname) => allExports.push(req(fname)))
  return allExports
}

addDecorator(withInfo) //报错但能用?
addDecorator(storyWrapper)
addParameters({ info: { inline: true, header: false } })
// 自动导入所有以stories.js结尾的文件
// configure(require.context('../src', true, /\.stories\.tsx$/), module)
configure(loaderFn, module)
