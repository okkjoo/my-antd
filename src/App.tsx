import React from 'react'
import Button, {
  ButtonType,
  ButtonSize,
} from './components/Button/button'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
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
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        >
          Primary Large btn
        </Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
        >
          Danger small btn
        </Button>
        <Button
          btnType={ButtonType.Link}
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
      </header>
    </div>
  )
}

export default App
