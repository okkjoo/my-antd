import React, { ChangeEvent, FC, useRef } from 'react'
import axios from 'axios'

import Button from '../Button/button'

export interface UploadProps {
  action: string
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percent: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClck = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = [...files]
    postFiles.forEach((file) => {
      if (!beforeUpload) _post(file)
      else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            _post(processedFile)
          })
        } else if (result !== false) {
          _post(file)
        }
      }
    })
  }
  const _post = (file: File) => {
    const fD = new FormData()
    fD.append(file.name, file)
    axios
      .post(action, fD, {
        headers: {
          'Content-Type': 'multiline/form-data',
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.error(err)
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  return (
    <div className='zhou-upload-component'>
      <Button btnType='primary' onClick={handleClck}>
        Upload File
      </Button>
      <input
        className='zhou-file-input'
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        type='file'
      />
    </div>
  )
}

export default Upload
