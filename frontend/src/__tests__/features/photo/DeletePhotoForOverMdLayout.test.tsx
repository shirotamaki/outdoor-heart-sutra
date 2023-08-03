import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import DeletePhotoForOverMdLayout from '@/features/photo/DeletePhotoForOverMdLayout'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('DeletePhotoForOverMdLayout', () => {
  it('renders display delete button', () => {
    render(<DeletePhotoForOverMdLayout photoId={1} />)

    const deleteButton = screen.getByText('削除する')
    expect(deleteButton).toBeInTheDocument()
  })
})
