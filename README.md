# nisse

Nisse is LiTHe Blås new internal website.

## Installation

The project is split into two parts, the frontend and the backend. The
installation instructions for each part can be found in the respective README
files.

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

## Development workflow

This is the recommended development workflow for this project:

- The `main` branch is the main development branch. All new features should be
  developed in a separate branch and then merged into `main` when they are
  finished.
- A new release is created by creating a new release in Gitlab. This will
  trigger a CI pipeline that will build the new docker image and and deploy the
  new frontend.
- Use [pre-commit](#installing-pre-commit) to ensure that the code you commit
  follows the coding standard.
- Commit messages should be written in the imperative mood, and should follow
  [Conventional Commits](https://www.conventionalcommits.org/), i.e, the commit
  message should begin with one of the following:
  - `build:` - Changes that affect the build system or external dependencies
  - `ci:` - Changes to our CI configuration files and scripts
  - `docs:` - Documentation only changes
  - `feat:` - A new feature
  - `fix:` - A bug fix
  - `perf:` - A code change that improves performance
  - `refactor:` - A code change that neither fixes a bug nor adds a feature
  - `style:` - Changes that do not affect the meaning of the code (white
    space, formatting, missing semi-colons, etc)
  - `test:` - Adding or correcting tests

A good article for how to write good commit messages [The seven rules of a
great Git commit
message](https://chris.beams.io/posts/git-commit/#seven-rules).
