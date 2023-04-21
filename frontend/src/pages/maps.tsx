import Link from 'next/link'
import Map from '@/features/map/Map'

function App() {
  return (
    <div>
      <div>
        <Link href='/'>トップページへ</Link>
      </div>
      <Map />
    </div>
  )
}

export default App
