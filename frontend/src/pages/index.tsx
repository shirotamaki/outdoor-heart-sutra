import Head from 'next/head'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Home({ sutras }) {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | Top</title>
      </Head>
      <div>
        <h1>アウトドア般若心経</h1>
        <p>自分探しならぬ、自分なくしの旅へ</p>
      </div>
      <div>
        <a href='/welcome'>welcomeページへ</a>
      </div>
      <div>
          <Sutra sutras={sutras} />
      </div>
    </>
  )
}

function Sutra({ sutras }) {
  return (
    <div>
      {sutras.map((sutra) => (
        <ul>
          <li key={sutra.id}>{sutra.kanji}</li>
        </ul>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const response = await axios.get(`${apiUrl}/api/v1/sutras`)
  const sutras = response.data

  return {
    props: {
      sutras,
    },
    revalidate: 10, // オプションでキャッシュの更新間隔を指定
  }
}
