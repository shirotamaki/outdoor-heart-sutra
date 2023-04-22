import Link from 'next/link'
import Camera from '@/features/photo/Camera'

function App() {
  return (
    <div>
      <div>
        <Link href='/'>トップページへ</Link>
      </div>
      <Camera />
    </div>
  )
}

export default App
