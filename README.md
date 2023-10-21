# nisse

Nisse is LiTHe Blås new internal website.

## Installing pre-commit

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

The frontend is a single-page application (SPA) built with React

### Install the frontend

Prerequisites:

- `Node.js v20` - The best way to install Node is using
  [nvm](https://github.com/nvm-sh/nvm).
- [Remember to install pre-commit](#installing-pre-commit)

Navigate to the frontend repository with `cd frontend` and install all
dependencies with

```bash
npm install
```

### Running the frontend

- `npm run dev` to start a hot-reloading development server.
- `npm run build` to build the project.
- `npm run preview` to build and then serve the build locally.
- `npm run lint` to lint the project.

## Backend

The backend is a Django project that acts as a data-API for the frontend.

### Database setup

The backend uses PostgreSQL as a database. The database can either be installed
natively or as a docker container.

#### Use PostgreSQL in a container

- [Install docker locally on your computer](https://docs.docker.com/engine/install/).
- Start the docker service with `sudo systemctl start docker`
- (Optional) If the docker service is not started automatically when you start
  your computer, you can run `sudo systemctl enable docker.service` and
  `sudo systemctl enable containerd.service`
- Start the container by running
  `docker compose -f docker-compose-dev-database.yml -p nisse-dev-db up -d`
- When you want to stop the container, run
  `docker compose -f docker-compose-dev-database.yml -p nisse-dev-db down`

#### Use PostgreSQL installed locally

Install PostgreSQL v16 on your machine using
[the official instructions](https://www.postgresql.org/download/).

Start the PostgreSQL service with

```bash
sudo service postgresql start
```

and setup the user needed with

```bash
sudo su - postgres
psql \
    -c "CREATE ROLE nisse_dev_user SUPERUSER LOGIN PASSWORD 'nisse_dev_password';" \
    -c "CREATE DATABASE nisse_dev_db WITH OWNER nisse_dev_user;" \
    -c "SHOW hba_file;"
```

Restart the PostgreSQL service with

```bash
sudo service postgresql restart
```

If you want to make PostgreSQL start automatically when you start your
computer, run

```bash
sudo systemctl enable postgresql.service
```

### Install the backend

Prerequisites:

- `Python 3.10` - If this is not the Python version that comes with your OS,
  **DON'T TRY TO UPGRADE IT. IT CAN BREAK YOUR SYSTEM**. Instead, use
  [pyenv](https://github.com/pyenv/pyenv) to install the correct version.
  Remember to install the [Python build
  dependencies](https://github.com/pyenv/pyenv#install-python-build-dependencies).
- `pipenv` - Install with `pip install pipenv`. Remember to install it for the
  Python version you are using in the project.
- [Remember to install pre-commit](#installing-pre-commit)

Steps:

1. Navigate to the backend repository with `cd backend` and install all
   dependencies with `pipenv install --dev`
1. Configure the environment variables needed by running `cp .env.dev .env` and
   change the values in the `.env` file (but for development the defaults are
   probably alright).
1. Create a Django admin user by running
   `pipenv run python manage.py createsuperuser`
   and following the prompts.

### Applying database migrations

When the Django models have been changed, new migrations has to be made with
the command

```bash
pipenv run python manage.py makemigrations
```

After creating new migrations, or before starting the backend for the first
time, the migrations have to be applied to the database.

```bash
pipenv run python manage.py migrate
```

### Running the backend

All commands for the backend need to be run in the virtual environment created
by pipenv. All commands need to be run with `pipenv run <command>`, or by first
activating the virtual environment with `pipenv shell`.

- `pipenv run python manage.py runserver` to start the development server.
- `pipenv run python manage.py startapp <app name>` to create a new Django app.

## Development workflow

- The `dev` branch is the main development branch. All new features should be
  developed in a separate branch and then merged into `dev` when they are
  finished.
- The `main` branch is the production branch. It should always be in a working
  state and should only be updated with new releases.
- Use [pre-commit](#installing-pre-commit) to ensure that the code you commit
  follows the coding standard.
- Commit messages should be written in the imperative mood, and should follow
  [Conventional Commits](https://www.conventionalcommits.org/), i.e, the commit
  message should begin with one of the following:
    - `build:` - Changes that affect the build system or external dependencies
      (example scopes: gulp, broccoli, npm)
    - `ci:` - Changes to our CI configuration files and scripts (example
      scopes: Travis, Circle, BrowserStack, SauceLabs)
    - `docs:` - Documentation only changes
    - `feat:` - A new feature
    - `fix:` - A bug fix
    - `perf:` - A code change that improves performance
    - `refactor:` - A code change that neither fixes a bug nor adds a feature
    - `style:` - Changes that do not affect the meaning of the code (white
      space, formatting, missing semi-colons, etc)
    - `test:` - Adding missing tests or correcting existing tests
- Releases should be incremented according to [semantic
  versioning](https://semver.org/).

A good article for how to write good commit messages [The seven rules of a
great Git commit
message](https://chris.beams.io/posts/git-commit/#seven-rules).
