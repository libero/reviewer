#!/bin/sh

DET_OS=$(uname 2>/dev/null || echo Unknown)

if [ "${DET_OS}" = "Linux" ] ;
then
	MAKE_OPTS="-j 4"
else
	MAKE_OPTS="-j 1"
fi

# Symlink in the environment if missing
if [ ! -e .env ] ; then ln -s .env.example .env ; fi

# Create an override file if not present
if [ ! -e docker-compose.override.yml ] ; then echo "version: '3'" > docker-compose.override.yml ; fi

# Ensure the .scripts folder is updated
git submodule init
git submodule update

echo Stopping on ${DET_OS}...
make ${MAKE_OPTS} stop_services
echo Starting on ${DET_OS}...
make ${MAKE_OPTS} start_services

