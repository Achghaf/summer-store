# Deploying to GitHub Pages

## One-time setup

1. Push this repo to GitHub
2. Go to **Settings → Pages** in your repo
3. Under **Source**, select **GitHub Actions**

That's it — every push to `main` will trigger a build and deploy automatically.

## Local development

```bash
pnpm install
pnpm dev
```

## Manual build

```bash
VITE_BASE_URL=/your-repo-name/ pnpm build
```

The output lands in `dist/` and can be served from any static host.

## Custom domain

If you use a custom domain (e.g. `store.example.com`):
1. Add a `CNAME` file inside `client/public/` containing your domain
2. Change `VITE_BASE_URL` in the workflow to `/` (the root)
