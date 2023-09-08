import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import DeletePhoto from '@/features/photo/DeletePhoto'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('DeletePhoto', () => {
  it('renders display delete button for 2Xl or below', () => {
    render(<DeletePhoto photoId={1} is2XlOrBelow={true} />)

    const deletePhotoButton = screen.getByText('削除する')
    expect(deletePhotoButton).toBeInTheDocument()
  })

  it('renders display delete button for over 2Xl', () => {
    render(<DeletePhoto photoId={1} is2XlOrBelow={false} />)

    const deletePhotoButton = screen.getByText('削除する')
    expect(deletePhotoButton).toBeInTheDocument()
  })
})
