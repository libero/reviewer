#!/bin/bash
# MOVE THIS FILE TO  https://github.com/libero/scripts/ once tested
set -e

unique_id=$(uuidgen)
temp_file="github-commit-status-${unique_id}.log"

repository = git remote -v 2>&1 \
    | grep '(fetch)' \
    | grep -P "^origin\t" \
    | sed -e 's/.*github.com[:/]\([A-Za-z0-9/-]*\)\(.git\)\{0,1\} .*/\1/g'

commit=$(git rev-parse HEAD)
status="success"
context="travis"

status_code=$(curl \
    -s \
    -o "${temp_file}" \
    -w '%{http_code}' \
    "https://api.github.com/repos/$repository/statuses/$commit?access_token=$GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{\"state\": \"$status\", \"description\": \"$description\", \"context\": \"$context\", \"target_url\": \"$target_url\"}")

if [[ $status_code -eq 201 ]]; then
    rm "${temp_file}"
    exit 0
fi
