/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
    sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        background: "url('/background.png')",
        'with-gradient': ' linear-gradient(90deg, #996DFF 34.90%, #35E8B3 61.46%, #E2D45C 72.92%)',
        'artist-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 67.08%)'
      },
    },
  },
  plugins: [],
}

