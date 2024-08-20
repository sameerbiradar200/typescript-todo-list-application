/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    // Mount the `public` directory to the root URL
    public: { url: '/', static: true },
    // Mount the `src` directory to `/dist` URL
    src: { url: '/dist' },
  },
  plugins: [
    [
      '@snowpack/plugin-typescript',
      {
        // Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    // Enable an SPA Fallback in development if needed
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    // Bundle your final build if needed
    // "bundle": true,
  },
  packageOptions: {
    // Add package options if needed
  },
  devOptions: {
    // Add dev options if needed
  },
  buildOptions: {
    // Set the base URL for GitHub Pages
    baseUrl: '/typescript-todo-list-application/',
    /* Add other build options here if needed */
  },
};
