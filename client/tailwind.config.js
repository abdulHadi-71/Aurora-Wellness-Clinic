/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: '#008C8A',
        slate: '#1F2A30',
        mist: '#ECF3F3',
        coral: '#FF6F61',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(31, 42, 48, 0.12)',
      },
    },
  },
  plugins: [],
};
