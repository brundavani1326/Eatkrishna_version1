/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'grid-cols-[1fr_300px]',
    'grid-cols-[1fr_320px]',
    'md:grid-cols-[1fr_300px]',
    'lg:grid-cols-[1fr_320px]',
    'hidden',
    'md:flex',
    'md:hidden',
    'flex'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C8960C',
        'gold-light': '#D4AF37',
        'gold-dark': '#A07808',
        cream: '#FFF5E1',
        'cream-dark': '#F5E6C8',
        maroon: '#8B0000',
        'hero-red': '#8B1A1A',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
