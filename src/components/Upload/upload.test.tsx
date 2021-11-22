import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from '@testing-library/react'

import { Upload, UploadProps } from './upload'

//不引进真正的Icon 而是mock一个
jest.mock('../Icon/icon', () => {
  return ({ icon, onClick }: { icon: any; onClick: any }) => {
    //将图标名称作为显示的字符串，方便测试
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
let wrapper: RenderResult,
  fileInput: HTMLInputElement,
  uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector(
      '.zhou-file-input',
    ) as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    mockedAxios.post.mockResolvedValue({ data: 'zzz!' })
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'zzz!'})
    // })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('zzz!', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      }),
    )
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')

    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, 'dataTransfer', {
    //   value: {
    //     files: [testFile],
    //   },
    // })
    // fireEvent(uploadArea, mockDropEvent)
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea, mockDropEvent)

    // await waitFor(() => {
    //   expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    // })
  })
})
