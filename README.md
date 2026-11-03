# sanketh-sg.github.io

Personal portfolio of Sanketh S G, live at https://sanketh-sg.github.io/. Built with Astro, TypeScript and Tailwind.

Uses [pnpm](https://pnpm.io/) (`pnpm install` first).

- `pnpm dev` — local server at http://localhost:4321
- `pnpm build && pnpm test` — build, then check content and the built page
- All copy lives in `src/data/site.ts`; edit it to add projects or update details.

Every push to `main` is built and deployed by `.github/workflows/deploy.yml`.
