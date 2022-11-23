module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screen:{
        'md':'768px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}