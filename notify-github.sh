#!/bin/bash
# MOVE THIS FILE TO  https://github.com/libero/scripts/ once tested
set -e

unique_id=$(uuidgen)
temp_file="github-commit-status-${unique_id}.log"

function usage () {
  echo "Usage: target_url=\"https://example.org\" repository=\"owner/repo\" description='Action finished' commit=<commit sha> ./notify-github.sh";
}

if [ -z "$commit" ]; then
  echo "Missing commit variable";
  usage
  exit 22;
fi

if [ -z "$repository" ]; then
  echo "Missing repository variable";
  usage
  exit 22;
fi

if [ -z "$description" ]; then
  echo "Missing description variable";
  usage
  exit 22;
fi

if [ -z "$target_url" ]; then
  echo "Missing target_url variable";
  usage
  exit 22;
fi

status="success"
context="travis"

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
