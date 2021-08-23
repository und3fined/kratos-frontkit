/**
 * File: svelte.config.js
 * Project: kratos-frontkit
 * File Created: 19 Aug 2021 22:29:17
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 20 Aug 2021 14:46:15
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';

// Adapters
import adapter from './internal/adapter-deno/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url)); // jshint ignore:line

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="fontkit"> element in src/app.html
		// target: '#fontkit',

		adapter: adapter({
			// default options are shown
			out: 'build'
		}),

		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		vite: () => ({
			server: {
				hmr: {
					port: 30000,
				}
			},
			resolve: {
				alias: {
					$components: resolve(__dirname, './src/lib/components'),
					$ui: resolve(__dirname, './src/lib/ui'),
					$utils: resolve(__dirname, './src/lib/utils')
				}
			},
		})
	}
};

export default config;
