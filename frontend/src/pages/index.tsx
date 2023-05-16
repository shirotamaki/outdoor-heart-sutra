import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'

type Sutra = {
  id: number
  kanji: string
}

type HomeProps = {
  sutras: Sutra[]
}

export default function Home({ sutras }: HomeProps) {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | Top</title>
      </Head>
      <div>
        <Link href='/welcome'>welcome</Link>
      </div>
      <div>
        <Link href='/maps'>全体地図</Link>
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
          <li>
            <Link href={`/sutras/${sutra.id}`}>{sutra.kanji}</Link>
          </li>
        </ul>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    }
  }
  const response = await axios.get(`${railsApiUrl}/api/v1/sutras`)
  const sutras = response.data

  return {
    props: {
      sutras,
    },
  }
}
