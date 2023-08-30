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
        originalBlack: '#555451', // メインのフォントカラー,
      },
      fontFamily: {
        kinuta: ['Yuji Syuku', 'serif'],
        reggae: ['Reggae One', 'cursive'],
        notoSerif: ['Noto Serif', 'serif'],
        notoSans: ['Noto Sans JP', 'sans-serif'],
      },
      width: {
        280: '280px',
        300: '300px',
        360: '360px',
        480: '480px',
        640: '640px',
      },
    },
  },
  plugins: [],
}
