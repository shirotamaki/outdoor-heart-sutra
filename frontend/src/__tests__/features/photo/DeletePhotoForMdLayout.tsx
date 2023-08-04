import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import DeletePhotoForMdLayout from '@/features/photo/DeletePhotoForMdLayout'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('DeletePhotoForMdLayout', () => {
  it('renders display delete button', () => {
    render(<DeletePhotoForMdLayout photoId={1} />)

    const deleteButton = screen.getByText('削除する')
    expect(deleteButton).toBeInTheDocument()
  })
})
