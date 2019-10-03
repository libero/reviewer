#!/bin/bash
# MOVE THIS FILE TO  https://github.com/libero/scripts/ once tested
set -e

unique_id=$(uuidgen)
temp_file="github-commit-status-${unique_id}.log"

repository="libero/reviewer"
# Travis CI builds a merge commit on pull requests, so
# we want to refer to the second parent of this merge commit
commit=$(git rev-parse HEAD^2)
status="success"
context="travis"

echo "Github API url: https://api.github.com/repos/$repository/statuses/$commit"
echo "payload: {\"state\": \"$status\", \"description\": \"$description\", \"context\": \"$context\", \"target_url\": \"$target_url\"}"

status_code=$(curl \
    -s \
    -o "${temp_file}" \
    -w '%{http_code}' \
    "https://api.github.com/repos/$repository/statuses/$commit" \
    -H "Content-Type: application/json" \
    -H "Authorization: token $GITHUB_TOKEN" \
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
