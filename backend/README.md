# Nisse Backend

The backend is a Django project that acts as a data-API for the frontend.

## Database setup

The backend uses PostgreSQL as a database. The database can either be installed
natively or as a docker container.

All the setup instructions assume that you are in the `backend` directory.

### Use PostgreSQL in a container

- [Install docker locally on your computer](https://docs.docker.com/engine/install/).
- Start the docker service with `sudo systemctl start docker`
- (Optional) If the docker service is not started automatically when you start
  your computer, you can run `sudo systemctl enable docker.service` and
  `sudo systemctl enable containerd.service`
- Start the container by running
  `docker compose -f docker-compose-dev-database.yml -p nisse-dev-db up -d`
- When you want to stop the container, run
  `docker compose -f docker-compose-dev-database.yml -p nisse-dev-db down`

### Use PostgreSQL installed locally

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

(Optional) If you want to make PostgreSQL start automatically when you start
your computer, run

```bash
sudo systemctl enable postgresql.service
```

## Install the backend

Prerequisites:

- `Python 3.11` - If this is not the Python version that comes with your OS,
  **DON'T TRY TO UPGRADE IT. IT CAN BREAK YOUR SYSTEM**. Instead, use
  [pyenv](https://github.com/pyenv/pyenv) to install the correct version.
  Remember to install the [Python build
  dependencies](https://github.com/pyenv/pyenv#install-python-build-dependencies).
- `pipenv` - Install with `pip install pipenv`. Remember to install it for the
  Python version you are using in the project.
- [Remember to install pre-commit](../README.md#installing-pre-commit)

Steps:

1. Navigate to the backend repository with `cd backend` and install all
   dependencies with `pipenv install --dev`
1. Configure the environment variables needed with `cp .env.template .env` and
   change the values in the `.env` file (but for development the defaults are
   probably alright).
1. Create a Django admin user by running
   `pipenv run ./manage.py createsuperuser`
   and following the prompts.

## Applying database migrations

When the Django models have been changed, new migrations has to be made with
the command

```bash
pipenv run ./manage.py makemigrations
```

After creating new migrations, or before starting the backend for the first
time, the migrations have to be applied to the database.

```bash
pipenv run ./manage.py migrate
```

The migration files should be committed to the repository. In fact, the CI
pipeline will fail if the migration files are not committed.

## Running the backend

To start the development server, run

```bash
pipenv run ./manage.py runserver
```

and the backend will be hosted at <http://localhost:8000>. The admin interface
is available at <http://localhost:8000/admin> and the API documentation is
available at <http://localhost:8000/api/schema/redoc/>, or at
<http://localhost:8000/api/schema/swagger-ui/> depending on which you prefer.

### Useful commands

- `pipenv run ./manage.py shell`: Start a Django shell, to avoid having to write `pipenv run` all the time.
- `pipenv run ./manage.py test`: Run the tests for the backend.
- `pipenv run ./manage.py startapp <app name>`: Create a new app in the
  backend.
- `pipenv run ./manage.py graph_models -a -o database_schema.png`: Generate a
  visual representation of the database schema (needs
  [Graphviz](https://graphviz.org/)

## Deployment

The backend is automatically built into a Docker image when a new commit is
pushed to the `main` (with the name `main`) or `dev` (with the name
`nisse-dev`) branches, with a new version tag for each commit. The Docker image
is pushed to the GitHub Container Registry. To deploy the backend, update the
tag of the image used in the docker compose files in [the infra
repository](https://github.com/litheblas/infra/tree/master/salt/pillar/docker/stacks).

When the docker container starts, it will automatically run the migrations on
the database.
