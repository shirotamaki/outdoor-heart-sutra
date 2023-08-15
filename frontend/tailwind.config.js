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
        tetsuguro: '#404146', //てつぐろ（フォント用）
      },
      fontFamily: {
        kinuta: ['Yuji Syuku', 'serif'],
        reggae: ['Reggae One', 'cursive'],
        notoSerif: ['Noto Serif', 'serif'],
        notoSans: ['Noto Sans JP', 'sans-serif'],
      },
      width: {
        '479': '479px',
        '366': '366px',
      }
    },
  },
  plugins: [],
}
