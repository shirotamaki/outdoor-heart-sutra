/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#d4c991', // 仏像カラー
        beige: '#e9e5dc', // 背景カラー
        tetsuguro: '#404146', // 鉄黒：フッターのカラー
        mainBlack: '#555451', // メインのフォントカラー,
        sutraBlack: '#AFACA5', // 経文のフォントカラー,
        buttonBlack: '#3F4D84', // ファイル選択ボタンのカラー
        comicBackground: '#EDEAE3', // コミックの背景カラー
        comicBorder: '#D1CEC6', // コミックのボーダーカラー
      },
      fontFamily: {
        kinuta: ['Yuji Syuku', 'serif'],
        reggae: ['Reggae One', 'cursive'],
        notoSerif: ['Noto Serif', 'serif'],
        notoSans: ['Noto Sans JP', 'sans-serif'],
      },
      width: {
        264: '264px',
        272: '272px',
        280: '280px',
        300: '300px',
        308: '308px',
        316: '316px',
        360: '360px',
        376: '376px',
        384: '384px',
        480: '480px',
        552: '552px',
        640: '640px',
        776: '776px',
        944: '944px',
      },
      height: {
        264: '264px',
        272: '272px',
        300: '300px',
        308: '308px',
        316: '316px',
        376: '376px',
        384: '384px',
      },
      maxWidth: {
        328: '328px',
        552: '552px',
        776: '776px',
        1352: '1352px',
      },
    },
  },
  plugins: [],
}
