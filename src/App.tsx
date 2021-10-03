import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'

library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className='App'>
      <header className='App-header'>
        <Menu
          defaultIndex='0'
          onSelect={(index) => alert(index)}
          // mode='vertical'
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>cool link 1</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title='dropdowm'>
            <MenuItem>dropdwom1</MenuItem>
            <MenuItem>d2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
          <MenuItem disabled>cool link 4</MenuItem>
        </Menu>
        <Button size='lg' onClick={() => setShow(!show)}>
          Toggle
        </Button>
        <Transition in={show} timeout={300} animation='zoom-in-left'>
          <div>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
            <p>learn react</p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
          wrapper
        >
          <Button btnType='primary' size='lg'>
            large Button
          </Button>
        </Transition>
      </header>
    </div>
  )
}

export default App
