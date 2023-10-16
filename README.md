# nisse

Nisse is LiTHe Blås new internal website.

### Installing pre-commit

This project uses [pre-commit](https://pre-commit.com/) to ensure consistent
formatting and code quality. To install it, run `pip install pre-commit` and
then `pre-commit install` to enable it in the repository. This assumes that
`python` and `pip` is installed on the system.

pre-commit will automagically run before every commit to ensure that the
committed code follows the coding standard. If the pre-commit check fails, the
commit will be rejected. To skip the pre-commit check, add the `--no-verify`
flag to the commit command. To run pre-commit against all files in the
repository, run `pre-commit run --all-files`.

## Frontend

The frontend is a single page application (SPA) built with React

### Install the frontend

Prerequisites:

- `Node.js v20` - The best way to install node is using
  [nvm](https://github.com/nvm-sh/nvm).
- [Remember to install pre-commit](#installing-pre-commit)

Navigate to the frontend repository with `cd frontend` and install all
dependencies with

```bash
npm install
```

### Running the frontend

- `npm run dev` to start hot-reloading development server.
- `npm run build` to build the project.
- `npm run preview` to build and then serve the build locally.
- `npm run lint` to lint the project.

## Backend

The backend is a Django project that acts as a data-API for the frontend.

### Install the backend

Prequisites:

- `Python 3.10` - If this is not the python version that comes with your OS,
  **DON'T TRY TO UPGRADE IT. IT CAN BREAK YOUR SYSTEM**. Instead, use
  [pyenv](https://github.com/pyenv/pyenv) to install the correct version.
  Remember to install the [python build
  dependencies](https://github.com/pyenv/pyenv#install-python-build-dependencies).
- `pipenv` - Install with `pip install pipenv`. Remember to install it for the
  python version you are using in the project.
- [Remember to install pre-commit](#installing-pre-commit)

Navigate to the backend repository with `cd backend` and install all
dependencies with

```bash
pipenv install --dev
```

### Running the backend

All commands for the backend needs to be run in the virtual environment created
by pipenv. All commands need to be run with `pipenv run <command>`, or by first
activating the virtual environment with `pipenv shell`.

- `pipenv run python manage.py runserver` to start the development server.
- `pipenv run python manage.py startapp <app name>` to create a new django app.
- `pipenv run python manage.py makemigrations` to create migrations for the
  database.
- `pipenv run python manage.py migrate` to apply migrations to the database.
