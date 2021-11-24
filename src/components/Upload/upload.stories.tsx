import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload'
import Button from '../Button/button'

const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'percent88%.md',
    status: 'uploading',
    percent: 88,
  },
  {
    uid: '122',
    size: 1234,
    name: 'successExample.jpg',
    status: 'success',
    percent: 100,
  },
  {
    uid: '121',
    size: 1234,
    name: 'errotExample.exe',
    status: 'error',
    percent: 0,
  },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'newNameFile.jpg', {
    type: file.type,
  })
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      // action='http://jsonplaceholder.typicode.com/posts'
      action='https://run.mocky.io/v3/50ff378f-178d-45d3-95d1-739269fca9bf'
      onChange={action('changed')}
      defaultFileList={defaultFileList}
      // beforeUpload={filePromise}
      onRemove={action('removed')}
      name='fileName-test'
      data={{ kkkey: 'jjjoo' }}
      headers={{ 'X-showed': 'zhou' }}
      // accept='.jpg'
      // multiple
    >
      <Button btnType='primary'>Upload File</Button>
    </Upload>
  )
}
const drageUpload = () => {
  return (
    <Upload
      // action='http://jsonplaceholder.typicode.com/posts'
      action='https://run.mocky.io/v3/50ff378f-178d-45d3-95d1-739269fca9bf'
      onChange={action('changed')}
      // defaultFileList={defaultFileList}
      // beforeUpload={filePromise}
      onRemove={action('removed')}
      name='fileName-test'
      data={{ kkkey: 'jjjoo' }}
      headers={{ 'X-showed': 'zhou' }}
      // accept='.jpg'
      // multiple
      drag
    >
      {/* <Button btnType='primary'>Upload File</Button> */}
    </Upload>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
  .add('drageUpload', drageUpload)
