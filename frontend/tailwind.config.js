/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'green-primary': 'var(--color-green-primary)',
        'green-hover': 'var(--color-green-hover)',
        'yellow-accent': 'var(--color-yellow-accent)',
      }
    },
  },
  plugins: [],
}
