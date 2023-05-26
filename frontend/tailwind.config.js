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
        gold: '#CAB54F', // 仏像カラー
        gray: '#d0cbcb', // 背景カラー
        tetsuguro: '#1D1506', //てつぐろ（フォント用）
      },
    },
  },
  plugins: [],
}
