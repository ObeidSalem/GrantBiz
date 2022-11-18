/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        'primary': '#41BDA7',
        'secondary': '#',
        'black': '#333333',
        'background': '#F3FFFC'
        
      }
    },
  },
  plugins: [],
}
