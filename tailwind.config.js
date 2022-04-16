module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': 'rgb(36, 41, 51)',
        'polar': {
          100: '#4C566A',
          200: '#2E3440',
        },
        'snow': '#d8dee9',
        'frost': '#81A1C1'
      },
      spacing: {
        '100': '25rem',
        '125': '31.25rem'
      },
    },
  },
  plugins: [],
}
