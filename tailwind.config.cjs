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
 const colors = require('tailwindcss/colors')

const config = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			gray: colors.trueGray,
			teal: colors.teal,
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	]
};

module.exports = config;
