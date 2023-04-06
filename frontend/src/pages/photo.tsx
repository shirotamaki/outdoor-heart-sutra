import Link from 'next/link'
import WebcamComponent from '@/components/WebcamComponent'

function App() {
  return (
    <div>
      <div>
        <Link href='/'>トップページへ</Link>
      </div>
      <WebcamComponent />
    </div>
  )
}

export default App
