import { railsApiUrl } from '@/config/index'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

type Sutra = {
  id: number
  kanji: string
}

type SutraProps = {
  sutra: Sutra
}

const SutraDetail = ({ sutra }: SutraProps) => {
  return (
    <div>
      <h1>
        {sutra.id} : {sutra.kanji}
      </h1>
      <h2>メモ</h2>
      <p>あいうえおかきくけこ</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query
  const response = await axios.get(`${railsApiUrl}/api/v1/sutras/${id}`)
  const sutra = response.data

  return {
    props: {
      sutra,
    },
  }
}

export default SutraDetail
