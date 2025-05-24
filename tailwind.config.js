/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4A261', // Soft Orange
        accent: '#264653',  // Deep Charcoal
        success: '#2A9D8F', // Sage Green
        background: '#FAF9F7', // Off-white
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
