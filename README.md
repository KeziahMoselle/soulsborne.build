# https://soulsborne.build/

This is the repository for the https://soulsborne.build/ project.

You can join our Discord server to chat and contribute: https://discord.com/invite/hw9x6ujjPk

## Features

-

## Tech stack

### Front-end

- [Astro](https://astro.build/)
- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Back-end

- [PayloadCMS v2](https://payloadcms.com/)
- [Postgres](https://www.postgresql.org/)

## How to install the project ?

### Requirements

Install globally:

- [Node.js](https://nodejs.org/en/download) (>20.x)
- [pnpm](https://pnpm.io/)
- [yarn](https://yarnpkg.com/) (todo: remove from PayloadCMS)

### Steps

1. Copy the `.env.example` file to `.env` in both `backend` and `frontend` directories

2. Install the dependencies via NPM

```bash
pnpm run setup
```

3. Run the development server

```bash
npm dev
```

4. Open the project
   1. PayloadCMS is accessible here: http://localhost:3000/admin
   2. Astro is accessible here: http://localhost:4321/