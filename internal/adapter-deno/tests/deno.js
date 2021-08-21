/**
 * File: deno.js
 * Project: @und3fined/adapter-deno
 * File Created: 21 Aug 2021 16:26:59
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 21 Aug 2021 16:27:00
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { assertEquals } from "https://deno.land/std@0.105.0/testing/asserts.ts";
import { createServer } from '../src/server.js';

const PORT = Deno.env['PORT'] ?? 3000;
const DEFAULT_SERVER_OPTS = { render: () => {} };

function startServer(opts = DEFAULT_SERVER_OPTS) {
	return createServer(opts);
}