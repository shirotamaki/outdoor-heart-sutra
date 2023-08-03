import { render, screen } from '@testing-library/react'
import EditPhotoForMdLayout from '@/features/photo/EditPhotoForMdLayout'

describe('EditPhotoForMdLayout', () => {
  it('renders display edit photo button', () => {
    render(<EditPhotoForMdLayout setEditMode={() => {}} />)

    const editPhotoButton = screen.getByText('写真を再選択')
    expect(editPhotoButton).toBeInTheDocument()
  })
})
