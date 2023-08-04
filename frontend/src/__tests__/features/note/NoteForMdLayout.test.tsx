import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import NoteForMdLayout from '@/features/note/NoteForMdLayout'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const useRouterMock = {
  push: jest.fn(),
}
jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(useRouterMock)

describe('NoteForMdLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(
      <NoteForMdLayout
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
      />,
    )
    expect(screen.getByPlaceholderText('メモを入力してください')).toBeInTheDocument()
  })

  it('allows user to input text', () => {
    render(
      <NoteForMdLayout
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('メモを入力してください'), {
      target: { value: 'Test Note' },
    })
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument()
  })

  it('allows user to save note', async () => {
    mockedAxios.patch.mockResolvedValue({ data: {} })
    render(
      <NoteForMdLayout
        photoId={1}
        sutraId={1}
        photoNote={''}
        setEditNote={jest.fn()}
        rows={4}
        cols={45}
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