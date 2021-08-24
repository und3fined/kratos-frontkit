/**
 * File: tailwind.config.cjs
 * Project: kratos-frontkit
 * File Created: 19 Aug 2021 22:29:55
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Aug 2021 11:18:00
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Varela Round', ...fontFamily.sans],
		},
		screens: {
			xs: '512px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',

			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			red: colors.red,
			yellow: colors.amber,
			green: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.violet,
			pink: colors.pink,
			teal: colors.teal
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio')
	]
};

module.exports = config;
