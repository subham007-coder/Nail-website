/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        pink: {
          600: '#E91E63' // Adjust this hex code to match the exact pink in the screenshot
        }
      },
      container: {
        center: true,
        padding: '1rem'
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], // Add this elegant font
      },
    },
  },
}