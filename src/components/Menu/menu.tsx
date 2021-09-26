import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } =
    props
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('zhou-menu', className, {
    'menu-vertical': mode === 'vertical',
  })

  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index })
      } else {
        console.error(
          'Warning:Menu has a child which is not a MenuItem coomponent',
        )
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
