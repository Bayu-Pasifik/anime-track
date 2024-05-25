/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'jacquard': ['"Jacquard 12"', 'sans-serif'],
        'dm-mono': ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}