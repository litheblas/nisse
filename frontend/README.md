# Nisse Frontend

The frontend is a single-page application (SPA) built with React.

## Install the frontend

All the setup instructions assume that you are in the `frontend` directory.

Prerequisites:

- `Node.js v20` - The best way to install Node is using
  [nvm](https://github.com/nvm-sh/nvm).
- [Remember to install pre-commit](../README.md#installing-pre-commit)

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
