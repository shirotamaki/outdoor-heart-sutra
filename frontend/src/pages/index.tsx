import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import MyComponent from 'components/MyComponent'

export default function Home() {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | Top</title>
      </Head>
      <div>
        <h1>アウトドア般若心経</h1>
        <MyComponent />
      </div>
    </>
  )
}
