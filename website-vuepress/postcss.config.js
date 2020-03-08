const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),
    // ...

    //Only add purgecss in production
    process.env.NODE_ENV === 'production'
      ? purgecss({
          content: ['./src/**/*.html', './src/**/*.vue'],
          // Include any special characters you're using in this regular expression
          defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        })
      : '',
  ],
};
