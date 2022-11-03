/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
            'hero': "url('/src/assets/hero.jpeg')",
            'hero1': "url('/src/assets/hero1.jpg')"
          }
      },
    },
    plugins: [],
  }