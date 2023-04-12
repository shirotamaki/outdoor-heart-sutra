import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface Sutra {
  id: number
  kanji: string
}

interface HomeProps {
  sutras: Sutra[]
}

export default function Home({ sutras }: HomeProps) {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | Top</title>
      </Head>
      <div>
        <Link href='/welcome'>welcomeページへ</Link>
      </div>
      <div>
        <Link href='/photo'>撮影ページへ</Link>
      </div>
      <div>
        <div>
          <h1>アウトドア般若心経</h1>
          <p>自分探しならぬ、自分なくしの旅へ</p>
        </div>
        <Sutra sutras={sutras} />
      </div>
    </>
  )
}

function Sutra({ sutras }: HomeProps) {
  return (
    <div>
      {sutras.map((sutra, index) => (
        <ul key={index}>
          <li>{sutra.kanji}</li>
        </ul>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const response = await axios.get(`${apiUrl}/api/v1/sutras`)
  const sutras = response.data

  return {
    props: {
      sutras,
    },
    // revalidate: 10, // オプションでキャッシュの更新間隔を指定
  }
}
