import { render, screen } from '@testing-library/react'
import EditPhotoForOverMdLayout from '@/features/photo/EditPhotoForOverMdLayout'

describe('EditPhotoForOverMdLayout', () => {
  it('renders display edit photo button', () => {
    render(<EditPhotoForOverMdLayout setEditMode={() => {}} />)

    const editPhotoButton = screen.getByText('写真を再選択')
    expect(editPhotoButton).toBeInTheDocument()
  })
})
