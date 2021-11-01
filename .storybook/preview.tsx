import React from 'react'
import {
  configure,
  addDecorator,
  addParameters,
} from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import '../src/styles/index.scss'

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

addDecorator(withInfo) //报错但能用?
addDecorator(storyWrapper)
addParameters({ info: { inline: true, header: false } })
// 自动导入所有以stories.js结尾的文件
configure(require.context('../src', true, /\.stories\.tsx$/), module)
