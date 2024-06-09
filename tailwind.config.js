/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#2F80ED',
        'primary-2': '#4F4F4F',
        'primary-3': '#828282',
        'primary-4': '#E0E0E0',
        'indicator-1': '#F8B76B',
        'indicator-2': '#8785FF',
        'indicator-3': '#EB5757',
        'indicator-4': '#F2C94C',
        'chat-1': '#FCEED3',
        'chat-2': '#EEDCFF',
        'chat-3': '#D2F2EA'
      },
      fontFamily: {
        "lato": "Lato"
      }
    },
  },
  plugins: [],
}

