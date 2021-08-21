import esbuild from 'esbuild';
import {
	createReadStream,
	createWriteStream,
	existsSync,
	statSync,
	writeFileSync
} from 'fs';
import { join } from 'path';
import { pipeline } from 'stream';
import glob from 'tiny-glob';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import zlib from 'zlib';

const pipe = promisify(pipeline);
const deps = fileURLToPath(new URL('./src/deps.ts', import.meta.url));

/**
 * @typedef {import('esbuild').BuildOptions} BuildOptions
 */

/**
 * @param {{
 *   out?: string;
 *   precompress?: boolean;
 *   env?: {
 *     path?: string;
 *     host?: string;
 *     port?: string;
 *   };
 *   esbuild?: (defaultOptions: BuildOptions) => Promise<BuildOptions> | BuildOptions;
 * }} options
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ({
	out = 'build',
	precompress,
	env: { path: path_env = 'SOCKET_PATH', host: host_env = 'HOST', port: port_env = 'PORT' } = {},
	esbuild: esbuildConfig
} = {}) {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		name: '@und3fined/adapter-deno',

		async adapt({ utils, config }) {
			utils.log.minor('Copying assets');
			const static_directory = join(out, 'assets');
			utils.copy_client_files(static_directory);
			utils.copy_static_files(static_directory);

			if (precompress) {
				utils.log.minor('Compressing assets');
				await compress(static_directory);
			}

			utils.log.minor('Building server');
			const files = fileURLToPath(new URL('./files', import.meta.url));
			utils.copy(files, '.svelte-kit/deno');
			writeFileSync(
				'.svelte-kit/deno/env.js',
				`export const path = Deno.env[${
					JSON.stringify(path_env)
				}] ?? false;\nexport const hostname = Deno.env[${
					JSON.stringify(host_env)
				}] ?? '0.0.0.0';\nexport const port = Deno.env[${
					JSON.stringify(port_env)
				}] ?? (!path && 3000);`
			);

			/** @type {BuildOptions} */
			const defaultOptions = {
				entryPoints: ['.svelte-kit/deno/index.js'],
				// entryPoints: [
				// 	join('.svelte-kit', 'output', 'server', 'app.js')
				// ],
				outfile: join(out, 'app.js'),
				bundle: true,
				format: 'esm',
				platform: 'neutral',
				sourcemap: 'external',
				define: {
					APP_DIR: `"/${config.kit.appDir}/"`
				}
			};
			const buildOptions = esbuildConfig ? await esbuildConfig(defaultOptions) : defaultOptions;
			await esbuild.build(buildOptions);

			utils.log.minor('Prerendering static pages');
			await utils.prerender({
				dest: `${out}/prerendered`
			});
			if (precompress && existsSync(`${out}/prerendered`)) {
				utils.log.minor('Compressing prerendered pages');
				await compress(`${out}/prerendered`);
			}
		}
	};

	return adapter;
}

/**
 * @param {string} directory
 */
async function compress(directory) {
	const files = await glob('**/*.{html,js,json,css,svg,xml}', {
		cwd: directory,
		dot: true,
		absolute: true,
		filesOnly: true
	});

	await Promise.all(
		files.map((/** @type {string} */ file) => Promise.all([compress_file(file, 'gz'), compress_file(file, 'br')]))
	);
}

/**
 * @param {string} file
 * @param {'gz' | 'br'} format
 */
async function compress_file(file, format = 'gz') {
	const compress =
		format == 'br'
			? zlib.createBrotliCompress({
					params: {
						[zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
						[zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
						[zlib.constants.BROTLI_PARAM_SIZE_HINT]: statSync(file).size
					}
			  })
			: zlib.createGzip({
					level: zlib.constants.Z_BEST_COMPRESSION
			  });

	const source = createReadStream(file);
	const destination = createWriteStream(`${file}.${format}`);

	await pipe(source, compress, destination);
}
