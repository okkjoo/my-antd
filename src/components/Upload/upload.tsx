import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'

import Button from '../Button/button'
import { UploadtList } from './uploadList'

export type UploadFileStatus =
  | 'ready'
  | 'uploading'
  | 'success'
  | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File //源文件
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percent: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)

  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultFileList || [],
  )

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
  ) => {
    setFileList((preFileList) => {
      return preFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj,
          }
        } else {
          return file
        }
      })
    })
  }

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

  const handleRemove = (file: UploadFile) => {
    setFileList((preFileList) => {
      return preFileList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
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
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList])
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
            updateFileList(_file, {
              percent: percentage,
              status: 'uploading',
            })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        console.log('resp', resp)
        updateFileList(_file, {
          status: 'success',
          response: resp.data,
        })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        console.error('error', err)
        updateFileList(_file, {
          status: 'error',
          response: err,
        })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  console.log('fileList', fileList)
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
      <UploadtList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
