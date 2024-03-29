import { render, screen } from '@testing-library/react'
import ComicsWidth552px from '@/features/comic/ComicsWidth552px'

describe('ComicsWidth552px', () => {
  it('renders all comics', () => {
    render(<ComicsWidth552px />)

    expect(screen.getByText('1. 出家')).toBeInTheDocument()
    expect(screen.getByText('スマホを持って家を出ましょう')).toBeInTheDocument()

    expect(screen.getByText('2. 無我夢中')).toBeInTheDocument()
    expect(
      screen.getByText('街の看板や標識から般若心経に含まれている文字を探しましょう'),
    ).toBeInTheDocument()

    expect(screen.getByText('3. 写経')).toBeInTheDocument()
    expect(screen.getByText('文字を見つけたら写真を撮りアプリに保存しましょう')).toBeInTheDocument()

    expect(screen.getByText('4. 森羅万象')).toBeInTheDocument()
    expect(
      screen.getByText('般若心経278文字をコンプリートし悟りの境地に到達しましょう'),
    ).toBeInTheDocument()

    expect(screen.getByAltText('chojugiga-walk')).toBeInTheDocument()
    expect(screen.getByAltText('chojugiga-look-for-sutra')).toBeInTheDocument()
    expect(screen.getByAltText('chojugiga-shoot')).toBeInTheDocument()
    expect(screen.getByAltText('chojugiga-mindfulness')).toBeInTheDocument()
  })
})
