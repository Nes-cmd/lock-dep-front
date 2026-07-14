/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: '#0A2540',
        brandCyan: '#00B4D8',
        brandOrange: '#FF9900',
        brandGray: '#F7F9FC',
      },
    },
  },
  plugins: [],
}