import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  wait,
} from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'zhou-test',
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>third</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .zhou-submenu {
      display: none;
    }
    .zhou-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  // style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabeldElement: HTMLElement

describe('Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())

    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabeldElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('zhou-menu zhou-test')
    expect(
      menuElement.querySelectorAll(':scope > li').length,
    ).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabeldElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('third')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabeldElement)
    expect(disabeldElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on SubMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })

    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})
