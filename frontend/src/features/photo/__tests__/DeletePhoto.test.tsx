import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import DeletePhoto from '@/features/photo/DeletePhoto'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('DeletePhoto', () => {
  it('renders display delete button', () => {
    render(<DeletePhoto photoId={1} />)

    const deleteButton = screen.getByText('削除する')
    expect(deleteButton).toBeInTheDocument()
  })
})
