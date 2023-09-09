import { render, screen } from '@testing-library/react'
import EditPhoto from '@/features/photo/EditPhoto'

describe('EditPhoto', () => {
  it('renders display edit photo button for 2Xl or below', () => {
    render(<EditPhoto setEditMode={() => {}} is2XlOrBelow={true} />)

    const editPhotoButton = screen.getByText('写真を再選択')
    expect(editPhotoButton).toBeInTheDocument()
  })

  it('renders display edit photo button for over 2Xl', () => {
    render(<EditPhoto setEditMode={() => {}} is2XlOrBelow={false} />)

    const editPhotoButton = screen.getByText('写真を再選択')
    expect(editPhotoButton).toBeInTheDocument()
  })
})
