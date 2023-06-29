import Head from 'next/head'
import { CustomHeadProps } from '@/types/types'

const CustomHead = ({ title }: CustomHeadProps) => (
  <Head>
    <title>{title} | アウトドア般若心経</title>
  </Head>
)

export default CustomHead
