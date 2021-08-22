/**
 * File: oak.ts
 * Project: @und3fined/adapter-deno
 * File Created: 22 Aug 2021 23:35:27
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 22 Aug 2021 23:35:27
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
export {
	Application as Server,
	send as serveStatic,
	isHttpError,
	Status
} from 'https://deno.land/x/oak@v9.0.0/mod.ts';
