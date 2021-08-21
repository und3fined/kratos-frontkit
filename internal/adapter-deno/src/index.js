// TODO hardcoding the relative location makes this brittle
import { hostname, port } from './env.js';
import { init, render } from '../output/server/app.js';
import { createServer } from './server.js';

init();

const instance = createServer({ render });

instance.addEventListener("listen", (/** @type {any} */ server) => {
console.log(
	`Listening on: ${server.secure ? "https://" : "http://"}${server.hostname ??
	"localhost"}:${server.port}`,
);
});

instance.listen({ hostname, port });

export { instance };
