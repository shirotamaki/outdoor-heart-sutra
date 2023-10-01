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
              src='/images/chojugiga/walk.svg'
              alt={'chojugiga-walk'}
              width={220}
              height={220}
              className='mt-14'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>2. 無我夢中</h2>
          <p className='text-base'>街の看板や標識から般若心経に含まれている文字を探しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.svg'
              alt={'chojugiga-look-for-sutra'}
              width={220}
              height={220}
              className='mt-9'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>3. 写経</h2>
          <p className='text-base'>文字を見つけたら写真を撮りアプリに保存しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.svg'
              alt={'chojugiga-shoot'}
              width={220}
              height={220}
              className='mt-10 ml-4'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-376 h-376 border border-comicBorder rounded p-3'>
          <h2 className='text-xl mb-2'>4. 森羅万象</h2>
          <p className='text-base'>般若心経278文字をコンプリートし悟りの境地に到達しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.svg'
              alt={'chojugiga-mindfulness'}
              width={200}
              height={200}
              className='mt-12'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComicsWidth776px
