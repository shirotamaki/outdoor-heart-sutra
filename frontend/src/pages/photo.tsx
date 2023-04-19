import Link from 'next/link'
import Camera from '@/components/Camera'

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
