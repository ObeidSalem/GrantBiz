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

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#41BDA7',
        'secondary': '#e1f5f5',
        'black': '#333333',
        'background': '#ffffff'
      }
    },
  },
  plugins: [],
});
