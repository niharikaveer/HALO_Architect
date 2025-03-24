/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'wavy-bounce': {
          '0%': { transform: 'translateY(-100%) scale(0.95)', opacity: '0' },
          '50%': { transform: 'translateY(20%) scale(1.05)', opacity: '0.9' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'wavy-bounce': 'wavy-bounce 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
