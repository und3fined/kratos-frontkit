# kratos-frontkit

A ory/kratos frontend. Start with Svelte and Deno

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

- Install dependencies with pnpm

```bash
pnpm install
```

- Run dev server

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

Try command. `Use deno for run code. Don't use nodejs`

```bash
pnpm build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Deno run

```
deno run --allow-env --allow-read --allow-net build/app.js
```

Or with custom hostname and port

```
HOST=127.0.0.1 PORT=4567 deno run --allow-env --allow-read --allow-net build/app.js
```