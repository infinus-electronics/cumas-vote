## Developing

**Node version 17 and above required**

I dasuan use SvelteKit for the UI since I've messed around with Svelte the most, and it has excellent tooling in VSCode.

Install the Svelte extension.

For the UI components, I'm using https://carbon-components-svelte.onrender.com

To run this project in dev mode:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Environment variables

The app in dev mode expects an environment variable file ```.env``` that contains the single line

```
PUBLIC_VERSION=0.5
```

## Building

I dunno what am I gonna use to deploy this yet, in the meantime if ur interested, this is the original gist:

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
