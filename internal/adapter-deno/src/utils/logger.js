/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
/**
 * File: logger.js
 * Project: @und3fined/adapter-deno
 * File Created: 22 Aug 2021 22:35:39
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 22 Aug 2021 22:35:40
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { bold, cyan, green, white } from 'https://deno.land/std@0.105.0/fmt/colors.ts';

/**
 * @param {any} ctx 
 * @param {() => any} next 
 */
async function logger(ctx, next) {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(
		`${bold(white(String(ctx.response.status)))} ${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${bold(String(`${ms}ms`))}`
	);
}

export default logger;