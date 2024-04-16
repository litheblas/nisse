# Nisse Frontend

The frontend is a single-page application (SPA) built with React.

## Install the frontend

All the setup instructions assume that you are in the `frontend` directory.

Prerequisites:

- `Node.js v20` - The best way to install Node is using
  [nvm](https://github.com/nvm-sh/nvm).
- [Remember to install pre-commit](../README.md#installing-pre-commit)

Configure the environment variables needed with `cp .env.template .env` and
change the values in the `.env` file (but for development the defaults are
probably alright).

Navigate to the frontend repository with `cd frontend` and install all
dependencies with

```bash
npm install
```

## Running the frontend

- `npm run dev` to start a hot-reloading development server.
- `npm run build` to build the project.
- `npm run preview` to build and then serve the build locally.
- `npm run lint` to lint the project.

## Generating the API client

The frontend uses an automatically generated API client to communicate with the
backend. To generate the API client, run

```bash
npm run generate-api-client
```

This will generate the API client in `src/api/`. It assumes that the backend is
installed and working, otherwise the command will fail.

## Deployment

The frontend is deployed to [GitHub Pages](https://pages.github.com/) and is
automated using [GitHub Actions](https://github.com/features/actions). When a
new commit is pushed to specific branches, the frontend is automatically built
and deployed to GitHub Pages. The branches that trigger a deployment are:

- `dev`: The changes in this branch are deployed to the development site, where
  they can be tested before being deployed to production. The development site
  can be found at
  <https://litheblas.github.io/nisse-frontend-deploy-development/>.
- `main`: The production branch. This is what is actually used. The production
  site can be found at <https://litheblas.github.io/nisse-frontend-production/>
  (for now, until a domain is set up).

The automatic deployment is dependant on a personal access token from Kisac (an
organization cannot have its own token). The token is stored as a GitHub
secret. The token has an 1 year lifetime (the maximum allowed) and will need to
regenerated when it expires. The current token expires on 2024-11-19.
