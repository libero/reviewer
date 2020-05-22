#!/bin/bash
# Return a browsertest image that matches the tag of reviewer-client
#
# Input: docker-compose.yml or docker-compose.master.yml
# Example output: liberoadmin/reviewer-browsertests:master-7fa91d8e

set -euo pipefail

grep reviewer-client $1 | cut -d ':' -f 2,3 | cut -d '-' -f 1-3 | sed 's/^ *//g' | sed 's/client/browsertests/g'
