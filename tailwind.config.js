module.exports = {
  purge: [
    './public/**/*.html',
     './public/**/*.js',
     './frontend/**/*.js',
     './src/**/*.css',
     './src/**/*.ejs',
     './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'Lobster': ['"Lobster Two"', 'cursive']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
