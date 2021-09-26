import React from 'react'
import Button, {
  ButtonType,
  ButtonSize,
} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Menu
          defaultIndex={0}
          onSelect={(index) => alert(index)}
          mode='vertical'
        >
          <MenuItem index={0} disabled>
            cool link 1
          </MenuItem>
          <MenuItem index={1}>cool link 2</MenuItem>
          <MenuItem index={2}>cool link 3</MenuItem>
          <MenuItem index={3}>cool link 4</MenuItem>
        </Menu>
        {/* <h1>Hello</h1>
        <h2>Hello</h2>
        <h3>Hello</h3>
        <h4>Hello</h4>
        <hr />
        <code>const a = 'Hello'</code>
        <p>
          Edit <code>src/App.tsx</code> and save
          to reload.
        </p> */}
        <Button>Default btn</Button>
        <Button disabled>Disabled btn</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Primary Large btn
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Danger small btn
        </Button>
        <Button
          btnType={ButtonType.Link}
          target='_blank'
          href='http://www.baidu.com'
        >
          baidu link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href='http://www.baidu.com'
          disabled
        >
          disabled baidu link
        </Button>
        <p>learn react</p>
      </header>
    </div>
  )
}

export default App
