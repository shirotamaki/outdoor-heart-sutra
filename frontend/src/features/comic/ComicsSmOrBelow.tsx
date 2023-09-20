import Image from 'next/image'

const ComicsSmOrBelow = () => {
  return (
    <section className='flex flex-col items-center font-kinuta text-mainBlack'>
      <div className='w-full h-300 border border-gray-400 rounded p-3 mb-2'>
        <p className=''>1. 出家</p>
        <p className=''>スマホを持って家を出ましょう</p>
        <div className='flex justify-center'>
          <Image
            src='/images/chojugiga/walk.svg'
            alt={'chojugiga-walk'}
            width={170}
            height={170}
            className='mt-10'
          />
        </div>
      </div>
      <div className='w-full h-300 border border-gray-400 rounded p-3 mb-2'>
        <p>2. 無我夢中</p>
        <p className=''>街の看板などから般若心経に含まれている文字を捜しましょう</p>
        <div className='flex justify-center'>
          <Image
            src='/images/chojugiga/look-for-sutra.svg'
            alt={'chojugiga-look-for-sutra'}
            width={170}
            height={170}
            className='mt-6'
          />
        </div>
      </div>
      <div className='w-full h-300 border border-gray-400 rounded p-3 mb-2'>
        <p>3. 写経</p>
        <p className=''>文字を見つけたら写真を撮りアプリに登録しましょう</p>
        <div className='flex justify-center'>
          <Image
            src='/images/chojugiga/shoot.svg'
            alt={'chojugiga-shoot'}
            width={170}
            height={170}
            className='mt-7 ml-4'
          />
        </div>
      </div>
      <div className='w-full h-300 border border-gray-400 rounded p-3 mb-2'>
        <p>4. 森羅万象</p>
        <p className=''>般若心経278文字をコンプリートし悟りの境地へと至りましょう</p>
        <div className='flex justify-center'>
          <Image
            src='/images/chojugiga/mindfulness.svg'
            alt={'chojugiga-mindfulness'}
            width={160}
            height={160}
            className='mt-9'
          />
        </div>
      </div>
    </section>
  )
}

export default ComicsSmOrBelow
