import React from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core' // 导入图标仓库
import { fas } from '@fortawesome/free-solid-svg-icons' // 全部图标
library.add(fas) // 把图标添加进仓库

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('zhou-icon', className, {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
