/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#8F20FF',
      },
    },
    screens: {
      md: { max: '768px' },
    },
  },
  plugins: [],
}
