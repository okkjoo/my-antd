import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'

interface DraggerProps {
  onFile: (file: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props

  const [dragOver, setDragOver] = useState(false)

  const cnames = classNames('zhou-upload-dragger', {
    'is-dragover': dragOver,
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={cnames}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      <Icon icon='upload' size='5x' theme='secondary' />
      {children}
      <p>将文件拖到这里上传</p>
    </div>
  )
}

export default Dragger
