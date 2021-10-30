import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { withInfo } from '@storybook/addon-info'

import Button from '../components/Button/button'

const styles: React.CSSProperties = {
  textAlign: 'center',
}
const CenterDecorator = (storyFn: any) => (
  <div style={styles}>{storyFn()}</div>
)

const defaultButton = () => (
  <Button onClick={action('click')}>default button</Button>
)
const buttonWithSize = () => (
  <>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
  </>
)
const buttonWithType = () => (
  <>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href=''>
      link button
    </Button>
  </>
)

storiesOf('Button Component', module)
  .addDecorator(CenterDecorator)
  .addParameters({
    info: {
      text: `
      this is a very nice component      
      `,
      inline: true,
    },
  })
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
