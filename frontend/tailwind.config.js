/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    '/src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gold: '#CAB54F', // 仏像カラー
      gray: '#eaeaea', // 背景カラー
      tetsuguro: '#1D1506', //てつぐろ（フォント用）
    },
    extend: {},
    plugins: [],
  },
}
