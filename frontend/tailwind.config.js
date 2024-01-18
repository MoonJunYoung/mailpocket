/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#8F20FF',
        darkgray: '#a9a9a9',
        lightgrey : '#d3d3d3',
        subscribecolor: '#8f20ffb5',
      },
    },
    screens: {
      md: { max: '768px' },
    },
  },
  plugins: [],
}
