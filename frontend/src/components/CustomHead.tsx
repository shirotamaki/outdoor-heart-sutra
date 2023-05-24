import Head from 'next/head'

type CustomHeadProps = {
  title: string
}

const CustomHead = ({ title }: CustomHeadProps) => (
  <Head>
    <title>{title} | アウトドア般若心経</title>
  </Head>
)

export default CustomHead
