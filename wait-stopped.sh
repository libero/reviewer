#!/bin/bash
set -e

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 CONTAINER [TIMEOUT]"
    echo "Example: $0 annotations_fpm_1 30"
    exit 1
fi

container="${1}"
timeout="${2:-30}"
target="exited"

timeout --foreground "$timeout" bash << EOT
    while true
    do
    current=\$(docker inspect "${container}" | jq -r '.[0].State.Status')
    echo "${container} is in state: \${current}"
    if [ "\$current" == "$target" ]; then
        break
    fi
    sleep 1
    done
EOT
