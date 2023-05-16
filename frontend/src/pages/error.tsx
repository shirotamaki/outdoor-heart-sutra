import { NextPage } from 'next'
import Link from 'next/link'

const ErrorPage: NextPage = () => {
  return (
    <div>
      <h1>エラーが発生しました</h1>
      <p>以下のリンクからトップページに戻ることができます。</p>
      <Link href="/">トップページに戻る</Link>
    </div>
  )
}

export default ErrorPage
