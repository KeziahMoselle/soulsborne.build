# https://soulsborne.build/

> soulsborne.build is a website focused on the soulsborne series (Dark Souls, Bloodborne, Elden Ring) which aims to centralize community created content like builds and character appearances as well as some interesting lore data visualization.

You can join our Discord server to chat and contribute: https://discord.com/invite/hw9x6ujjPk

## Features

- Create, vote and share your Elden Ring builds
- Create, vote and share your Elden Ring fashion (WIP)
- Lore graph tree, an easy to understand relational graph of items/NPCs (WIP)

## Stack

### Front-end
#### https://soulsborne.build/

- [Astro](https://astro.build/)
- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Back-end
#### https://payload.soulsborne.build/admin/

- [PayloadCMS v3](https://payloadcms.com/)
- [Postgres](https://www.postgresql.org/)

### Hosting

- **Astro** app is hosted on [Cloudflare Pages](https://pages.cloudflare.com/)
  - The frontend is running in server mode so it make use of [Cloudflare workers](https://workers.cloudflare.com/)
- **Next.js** PayloadCMS app is hosted on an OVH VPS managed by [Coolify](https://coolify.io/)
- **Assets** uploaded to PayloadCMS are uploaded to [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)

## Contributing

### Requirements

Install globally:

- [Node.js](https://nodejs.org/en/download) (>20.x)
- [pnpm](https://pnpm.io/)

### Steps

1. Copy the `.env.example` file to `.env` in both `backend` and `frontend` directories and fill in the values

2. Install the dependencies via pnpm in both directories

```bash
pnpm install
```

3. Start the local PostgreSQL database by running (in `/backend` directory)
```bash
start-database.sh
```

4. Run the development server for both the backend and frontend directories (run in each directories)

```bash
pnpm dev
```

5. (optional) You can seed some initial data by visiting http://localhost:3000/api/seed (this is currently being migrated into a separate script in `/backend/src/scripts/seed.ts`)

6. Open the project
   1. PayloadCMS is accessible here: http://localhost:3000/admin
   2. Astro is accessible here: http://localhost:4321/
