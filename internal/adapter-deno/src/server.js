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
import {
	dirname,
	fromFileUrl,
	join,
	existsSync,
	Server,
	serve,
	isHttpError,
	Status
} from './deps.ts';

const __dirname = dirname(fromFileUrl(import.meta.url));
const paths = {
	assets: join(__dirname, '/assets'),
	prerendered: join(__dirname, '/prerendered')
};

const noop_handler = async (/** @type {any} */ _ctx, /** @type {() => any} */ next) => await next();

/**
 *
 * @param {string} staticPath
 * @returns
 */
function serveStatic(staticPath) {
	/**
	 * @param {any} ctx
	 * @param {() => any} next
	 */
	return async (ctx, next) => {
		const pathname = ctx.request.url.pathname;

		if (pathname !== '/') {
			try {
				await serve(ctx, pathname, {
					root: staticPath
				});
			} catch(err) {
				if (isHttpError(err) && err.status !== Status.NotFound) {
					throw err
				} else {
					throw err;
				}
			}
		}

		await next();
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
async function getRawBody(ctx) {
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
	const prerendered_handler = existsSync(paths.prerendered)
		? serveStatic(paths.prerendered)
		: noop_handler;
	const assets_handler = existsSync(paths.assets) ? serveStatic(paths.assets) : noop_handler;

	/**
	 * @param {any} _ctx
	 * @param {() => any} next
	 */
	const error_handler = async (_ctx, next) => {
		try {
			await next();
		} catch (err) {
			if (isHttpError(err)) {
				switch (err.status) {
					case Status.NotFound:
						break;
					// handle other statuses
				}
			} else {
				// rethrow if you can't handle the error
				throw err;
			}
		}
	};

	const server = new Server();

	server.use(error_handler);
	server.use(assets_handler);
	server.use(prerendered_handler);
	server.use(serveMain(render));

	return server;
}
