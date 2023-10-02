import Image from 'next/image'

const ComicsWidth776px = () => {
  return (
    <section className='font-kinuta text-mainBlack'>
      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>1. 出家</h2>
          <p className='text-base'>スマホを持って家を出ましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/walk.png'
              alt={'chojugiga-walk'}
              width={190}
              height={190}
              className='mt-20'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>2. 無我夢中</h2>
          <p className='text-base'>街の看板や標識から般若心経に含まれている文字を探しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.png'
              alt={'chojugiga-look-for-sutra'}
              width={280}
              height={280}
              className='mt-8'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>3. 写経</h2>
          <p className='text-base'>文字を見つけたら写真を撮りアプリに保存しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.png'
              alt={'chojugiga-shoot'}
              width={240}
              height={240}
              className='mt-6 mr-4'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>4. 森羅万象</h2>
          <p className='text-base'>般若心経278文字をコンプリートし悟りの境地に到達しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.png'
              alt={'chojugiga-mindfulness'}
              width={300}
              height={300}
              className='mt-12'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComicsWidth776px
