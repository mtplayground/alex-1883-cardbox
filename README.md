# alex-1883-cardbox

Static React inbox prototype built with Vite, React, TypeScript, and Tailwind.

## Local Development

Install dependencies and start the Vite development server:

```bash
npm ci
npm run dev
```

The development server listens on `0.0.0.0:8080`.

## Quality Checks

Run the same checks used during implementation:

```bash
npm run format:check
npm run lint
npm test
npm run build
npm run test:e2e
```

The end-to-end suite uses Playwright. If browsers are not installed in a fresh
machine, install Chromium once:

```bash
npx playwright install chromium
```

## Static Build

Create the optimized static output with:

```bash
npm ci
npm run build
```

The production files are written to `dist/`. The build is a plain static site:
HTML, CSS, and JavaScript assets only. It does not require Docker, a Node server,
CI/CD glue, database access, or runtime environment variables.

## Bare Self-Hosted Serving

Serve the contents of `dist/` directly from any static file server. For a simple
self-hosted Node-based static server:

```bash
npx serve@latest -s dist -l tcp://0.0.0.0:8080
```

Equivalent nginx configuration:

```nginx
server {
  listen 8080;
  server_name _;

  root /path/to/alex-1883-cardbox/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
```

The app currently uses client-side local storage for inbox interaction state, so
serving the static files is sufficient for the self-hosted deployment target.
