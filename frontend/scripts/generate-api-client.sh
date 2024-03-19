#!/bin/bash

function fail_and_exit {
    printf '%s\n' "$1" >&2 ## Send message to stderr.
    exit "${2-1}"          ## Return a code specified by $2, or 1 by default.
}

SCHEMA_FILE="nisse-backend-api-schema.yml"
CLIENT_DIR="src/api"

cd "$(dirname "$0")" || fail_and_exit "ERROR: Could not script directory."

cd ../../backend || fail_and_exit "ERROR: Could not navigate to the backend directory."

echo "Generating OpenAPI schema..."

pipenv run ./manage.py spectacular --file ../frontend/$SCHEMA_FILE --validate || fail_and_exit "ERROR: Could not generate OpenAPI file."

cd ../frontend || fail_and_exit "ERROR: Could not navigate to the frontend directory."

echo "Generating API client..."

rm $CLIENT_DIR -rf

npx openapi-typescript-codegen --input ./$SCHEMA_FILE --output $CLIENT_DIR || fail_and_exit "ERROR: Could not generate API client."

rm $SCHEMA_FILE
