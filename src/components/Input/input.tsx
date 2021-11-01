import React, { ReactElement, InputHTMLAttributes, FC } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm'
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean
  /**设置大小 lg|sm */
  size?: InputSize
  /**添加图片，在右侧悬浮添加一个图标 */
  icon?: IconProp
  /**添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement
  /**添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement
}

/**
 * Input 输入框，通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ~~~js
 * //这样引用
 * import {Input} from 'zhou-cl'
 * ~~~
 * 支持HTMLInput的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  //取出属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  //计算 className
  const cnames = classNames('zhou-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  return (
    //根据属性判断是否添加特定节点
    <div className={cnames} style={style}>
      {prepend && (
        <div className='zhou-input-group-prepend'>{prepend}</div>
      )}
      {icon && (
        <div className='icon-wrapper'>
          {' '}
          <Icon icon={icon} title={`title-${icon}`} />{' '}
        </div>
      )}
      <input
        className='zhou-input-inner'
        disabled={disabled}
        {...restProps}
      />
      {append && (
        <div className='zhou-input-group-append'>{append}</div>
      )}
    </div>
  )
}

export default Input
