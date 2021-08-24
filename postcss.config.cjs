const tailwindcss = require('tailwindcss');
const nesting = require('tailwindcss/nesting');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	plugins: [
    postcssImport(),
		nesting(),
		tailwindcss(),
		autoprefixer(),
		!dev &&
			cssnano({
				preset: ['default']
			})
	]
};

module.exports = config;
