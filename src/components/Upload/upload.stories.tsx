import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload from './upload'

const SimpleUpload = () => {
  return (
    <Upload
      action='http://jsonplaceholder.typicode.com/posts'
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
    />
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
