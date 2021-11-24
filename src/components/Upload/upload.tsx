import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'

import UploadList from './uploadList'
import Dragger from './dragger'

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
  /** post目标url */
  action: string
  /** 默认文件列表 */
  defaultFileList?: UploadFile[]
  /** upload前的钩子，若返回False或Promise则停止upload */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /** 上传时的钩子 */
  onProgress?: (percent: number, file: File) => void
  /** 上传成功的钩子 */
  onSuccess?: (data: any, file: File) => void
  /** 上传失败的钩子 */
  onError?: (err: any, file: File) => void
  /** 文件状态改变的钩子 */
  onChange?: (file: File) => void
  /** 文件移除的钩子 */
  onRemove?: (file: UploadFile) => void
  /** 上传时的请求头部 */
  headers?: { [key: string]: any }
  /** 上传的文件字段名称 */
  name?: string
  /** 上传时的额外参数 */
  data?: { [key: string]: any }
  /** 是否支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /** 接收的文件类型 */
  accept?: string
  /** 是否支持多选 */
  multiple?: boolean
  /** 是否支持拖拽上传 */
  drag?: boolean
}
/**
 * Upload 文件上传组件
 *
 *
 * ~~~js
 * //这样引用
 * import {Upload} from 'zhou-cl'
 * ~~~
 */
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
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
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
    let postFiles = Array.from(files)
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
    // setFileList([_file, ...fileList])
    setFileList((preFileList) => {
      return [_file, ...preFileList]
    })
    const fD = new FormData()
    fD.append(name || 'loadedFile', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        fD.append(key, data[key])
      })
    }
    axios
      .post(action, fD, {
        headers: {
          'Content-Type': 'multiline/form-data',
          ...headers,
        },
        withCredentials,
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

  return (
    <div
      className='zhou-upload-component'
      style={{ display: 'inline-block' }}
      onClick={handleClck}
    >
      <div className='zhou-upload-input'>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}

        <input
          className='zhou-file-input'
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type='file'
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}
Upload.defaultProps = {
  name: 'loadedFile',
}
export default Upload
