/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'lightBlack': '#121212',
        'medBlack': '#111315',
        'lightGray': '#2d2d2d'
      }
    },
  },
  plugins: [],
};

