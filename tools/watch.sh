#!/bin/bash
set -e

. ./$1

NODE_ENV=$NODE_ENV                     \
API_KEY=$API_KEY                       \
AUTH_DOMAIN=$AUTH_DOMAIN               \
DATABASE_URL=$DATABASE_URL             \
STORAGE_BUCKET=$STORAGE_BUCKET         \
ELASTIC_SEARCH_URI=$ELASTIC_SEARCH_URI \
./node_modules/.bin/webpack-dashboard -m -- webpack -w
