import { render, fireEvent, screen } from '@testing-library/react'
import ActionButton from '@/components/ActionButton'

describe('ActionButton', () => {
  it('should render button correctly', () => {
    render(<ActionButton onClick={() => {}} text='Test Button' />)

    const buttonElement = screen.getByRole('button', { name: /Test Button/i })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeEnabled()
  })

  it('should disable the button when the disabled prop is passed', () => {
    render(<ActionButton onClick={() => {}} text='Test Button' disabled />)

    const disabledButtonElement = screen.getByRole('button', { name: /Test Button/i })
    expect(disabledButtonElement).toBeInTheDocument()
    expect(disabledButtonElement).toBeDisabled()
  })

  it('should handle onClick event correctly', () => {
    const mockOnClick = jest.fn()
    render(<ActionButton onClick={mockOnClick} text='Test Button' />)

    const buttonElement = screen.getByRole('button', { name: /Test Button/i })
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
