import Link from 'next/link'
import { MenuProps } from '@/types/types'

const Menu = ({ href, children }: MenuProps) => (
  <Link href={href} className='hover:opacity-50 transition-all duration-100'>
    {children}
  </Link>
)

export default Menu
