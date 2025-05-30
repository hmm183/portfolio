/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial for React projects
  ],
  theme: {
    extend: {
      // You can add custom themes, colors, fonts here if needed
    },
  },
  plugins: [],
}