import Image from 'next/image'

const Comics = () => {
  return (
    <section className='font-kinuta text-mainBlack'>
      <div className='grid grid-cols-2 gap-2'>
        <div className='col-span-1 w-316 h-316 border border-gray-400 rounded p-2'>
          <p className=''>1. 出家</p>
          <p className=''>スマホを持って家を出ましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/walk.svg'
              alt={'chojugiga-walk'}
              width={170}
              height={170}
              className='mt-12'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-2'>
          <p>2. 無我夢中</p>
          <p className=''>街の看板などから般若心経に含まれている文字を捜しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.svg'
              alt={'chojugiga-look-for-sutra'}
              width={170}
              height={170}
              className='mt-8'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-2'>
          <p>3. 写経</p>
          <p className=''>文字を見つけたら写真を撮りアプリに登録しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.svg'
              alt={'chojugiga-shoot'}
              width={170}
              height={170}
              className='mt-8 ml-4'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-2'>
          <p>4. 悟り</p>
          <p className=''>これらを繰り返し般若心経278文字のコンプリートを目指す旅...</p>
          <p className=''>これが「アウトドア般若心経」です</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.svg'
              alt={'chojugiga-mindfulness'}
              width={150}
              height={150}
              className='mt-6'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comics
