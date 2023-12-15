/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundPosition: {
      'custom-top': 'center top'
    },
    extend: {
      colors: {
        'default-background': '#e0e0e0',
        'landing-background': '#ffffff',
        'primary-300': '#66b2ff', 
        'primary-500': "#007fff",
        'primary-600': '#0072e5'
      }
    },
  },
  plugins: [],
}

