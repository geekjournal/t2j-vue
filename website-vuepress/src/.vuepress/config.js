// const path = require('path');
const webpack = require('webpack');
// const purgecss = require('@fullhuman/postcss-purgecss')({
//   // Specify the paths to all of the template files in your project
//   content: [
//     './src/.vuepress/theme/**/*.*',
//     './!(node_modules)/**/*.md',
//     // './*.md',
//   ],

//   // Include any special characters you're using in this regular expression
//   defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
// });

module.exports = {
  title: '🎾 FortyLove.net',
  description: 'USTA Tournament App',
  base: '/',
  // dest: '../dist', // relative to process.cwd()
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5'],
  },
  plugins: ['vuepress-plugin-reading-time'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tournaments', link: './tournaments/' },
      { text: 'FAQ', link: '/faq/' },
      // { text: 'Contact', link: '/contact/' },
      // { text: 'Blog', link: '/blog/' },
    ],
  },
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
      // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    ],
  },
  //   head: [
  //     [
  //       'meta',
  //       {
  //         name: 'viewport',
  //         content: 'width=device-width, initial-scale=1',
  //       },
  //     ],
  //   ],
  configureWebpack: {
    resolve: {
      alias: {
        // '@': path.resolve(__dirname, 'theme'),
        // styles: path.resolve(__dirname, 'theme', 'styles'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  },
};
