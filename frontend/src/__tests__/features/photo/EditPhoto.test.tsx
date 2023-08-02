import { render, screen } from '@testing-library/react'
import EditPhoto from '@/features/photo/EditPhotoForOverMdLayout'

describe('EditPhoto', () => {
  it('renders display edit photo button', () => {
    render(<EditPhoto setEditMode={() => {}} />)

    const editPhotoButton = screen.getByText('写真を再選択')
    expect(editPhotoButton).toBeInTheDocument()
  })
})
