import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import Note from '@/features/note/Note'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const useRouterMock = {
  push: jest.fn(),
}
jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(useRouterMock)

describe('Note', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing for 2Xl or below', () => {
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={true}
      />,
    )
    expect(screen.getByPlaceholderText('メモを入力してください')).toBeInTheDocument()
  })

  it('allows user to input text for 2Xl or below', () => {
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={true}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('メモを入力してください'), {
      target: { value: 'Test Note' },
    })
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument()
  })

  it('allows user to save note for 2Xl or below', async () => {
    mockedAxios.patch.mockResolvedValue({ data: {} })
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={true}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('メモを入力してください'), {
      target: { value: 'Test Note' },
    })
    fireEvent.click(screen.getByText('メモ保存'))
    await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledTimes(1))
    expect(useRouterMock.push).toHaveBeenCalledTimes(1)
    expect(useRouterMock.push).toHaveBeenCalledWith('/sutras/1')
  })

  it('renders without crashing for over 2Xl', () => {
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={false}
      />,
    )
    expect(screen.getByPlaceholderText('メモを入力してください')).toBeInTheDocument()
  })

  it('allows user to input text for over 2Xl', () => {
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={false}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('メモを入力してください'), {
      target: { value: 'Test Note' },
    })
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument()
  })

  it('allows user to save note for over 2Xl', async () => {
    mockedAxios.patch.mockResolvedValue({ data: {} })
    render(
      <Note
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
        is2XlOrBelow={false}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('メモを入力してください'), {
      target: { value: 'Test Note' },
    })
    fireEvent.click(screen.getByText('メモ保存'))
    await waitFor(() => expect(mockedAxios.patch).toHaveBeenCalledTimes(1))
    expect(useRouterMock.push).toHaveBeenCalledTimes(1)
    expect(useRouterMock.push).toHaveBeenCalledWith('/sutras/1')
  })
})
