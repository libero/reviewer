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

echo "Github API url: https://api.github.com/repos/$repository/statuses/$commit?access_token=$GITHUB_TOKEN"
echo "payload: {\"state\": \"$status\", \"description\": \"$description\", \"context\": \"$context\", \"target_url\": \"$target_url\"}"

status_code=$(curl \
    -s \
    -o "${temp_file}" \
    -w '%{http_code}' \
    "https://api.github.com/repos/$repository/statuses/$commit?access_token=$GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{\"state\": \"$status\", \"description\": \"$description\", \"context\": \"$context\", \"target_url\": \"$target_url\"}")

echo "status code: $status_code"

if [[ $status_code -eq 201 ]]; then
    rm "${temp_file}"
    exit 0
fi

echo "HTTP ${status_code}"
cat "${temp_file}"
rm "${temp_file}"
exit 22 # standard curl -f exit code
