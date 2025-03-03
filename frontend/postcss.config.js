console.log('Loading PostCSS config...');
console.log('Tailwind Path:', require.resolve('tailwindcss'));

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
