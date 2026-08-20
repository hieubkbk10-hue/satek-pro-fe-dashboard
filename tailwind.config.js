/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          hover: '#E55F00',
          light: '#FFF5EB',
          subtle: '#FFEAD4',
        },
        status: {
          active: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      zIndex: {
        popover: '1000',
        dialog: '10000',
        viewerBackdrop: '1050',
        viewerContent: '1060',
      },
    },
  },
  plugins: [],
};
