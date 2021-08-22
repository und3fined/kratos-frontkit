/**
 * File: server.js
 * Project: @und3fined/adapter-deno
 * File Created: 21 Aug 2021 09:58:36
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 21 Aug 2021 14:33:50
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { dirname, fromFileUrl, join, existsSync } from './deps.ts';
import { Server, serveStatic, isHttpError, Status } from './oak.ts'
import logger from './utils/logger.js';

const __dirname = dirname(fromFileUrl(import.meta.url));
const paths = {
	assets: join(__dirname, '/assets'),
	prerendered: join(__dirname, '/prerendered')
};

/**
 *
 * @param {any} _ctx
 * @param {() => any} next
 * @returns
 */
const noopHandler = async (_ctx, next) => await next();

/**
 *
 * @param {string} staticPath
 * @returns
 */
function serveFiles(staticPath) {
	/**
	 * @param {any} ctx
	 * @param {() => any} next
	 */
	return async (ctx, next) => {
		const pathname = ctx.request.url.pathname;
		let allowNext = false;

		if (pathname !== '/') {
			try {
				await serveStatic(ctx, pathname, {
					root: staticPath,
					immutable: true
					// extensions: ["json", "css", "html", "md", "js"],
				});
			} catch (err) {
				if (isHttpError(err) && err.status === Status.NotFound) {
					allowNext = true;
				} else {
					throw err;
				}
			}
		} else {
			allowNext = true;
		}

		if (allowNext) {
			await next();
		}
	};
}

/**
 * @param {any} render
 */
function serveMain(render) {
	/**
	 * @param {any} ctx
	 */
	return async (ctx) => {
		const parsed = new URL(ctx.request.url || '', 'http://localhost');
		let body;
		try {
			body = await getRawBody(ctx);
		} catch (err) {
			ctx.response.status = err.status || 400;
			return (ctx.response.body = err.reason || 'Invalid request body');
		}

		const rendered = await render({
			method: ctx.request.method,
			headers: ctx.request.headers,
			path: parsed.pathname,
			query: parsed.searchParams,
			rawBody: body
		});

		if (rendered) {
			for (const key in rendered.headers) {
				ctx.response.headers.set(key, rendered.headers[key]);
			}

			ctx.response.status = rendered.status;
			if (rendered.body) ctx.response.body = rendered.body;
		} else {
			ctx.response.status = 404;
			ctx.response.body = 'Not found!';
		}
	};
}

/**
 * @param {any} ctx
 * @returns {Promise<any>}
 */
function getRawBody(ctx) {
	if (ctx.request.hasBody) {
		return ctx.request.body();
	}

	return null;
}

/**
 * @param {any} param0
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createServer({ render }) {
	const prerenderedHandler = existsSync(paths.prerendered) ? serveFiles(paths.prerendered) : noopHandler;
	const assetsHandler = existsSync(paths.assets) ? serveFiles(paths.assets) : noopHandler;

	/**
	 * @param {any} ctx
	 * @param {() => any} next
	 */
	const errorHandler = async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			if (isHttpError(e)) {
				ctx.response.status = e.status;
				if (e.expose) {
					ctx.response.body = `<!DOCTYPE html>
					<html>
					  <body>
						<h1>${e.status} - ${e.message}</h1>
					  </body>
					</html>`;
				} else {
					ctx.response.body = `<!DOCTYPE html>
					<html>
					  <body>
						<h1>${e.status} - ${Status[e.status]}</h1>
					  </body>
					</html>`;
				}
			} else if (e instanceof Error) {
				ctx.response.status = 500;
				ctx.response.body = `<!DOCTYPE html>
					<html>
					  <body>
						<h1>500 - Internal Server Error</h1>
					  </body>
					</html>`;
				console.log('Unhandled Error:', e.message);
				console.log(e.stack);
			}
		}
	};

	const server = new Server();

	// Logger
	server.use(logger);
	server.use(errorHandler);
	server.use(assetsHandler);
	server.use(prerenderedHandler);
	server.use(serveMain(render));

	return server;
}
