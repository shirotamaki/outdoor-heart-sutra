import Head from 'next/head'
import Link from 'next/link'

export default function () {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | welcome</title>
      </Head>
      <div>
        <h1>アウトドア般若心経</h1>
        <p>自分探しならぬ、自分なくしの旅へ</p>
        <Link href={''} legacyBehavior>
          <a>アウトドア般若心経とは？</a>
        </Link>
      </div>
    </>
  )
}
