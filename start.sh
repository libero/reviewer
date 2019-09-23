#!/bin/sh

DET_OS=$(uname 2>/dev/null || echo Unknown)

if [ "${DET_OS}" = "Linux" ] ;
then
	MAKE_OPTS="-j 4"
else
	MAKE_OPTS="-j 1"
fi

# Symlink in the environment if missing
if [ ! -e .env ] ; then ln -s .env .env.example ; fi 

echo Stopping on ${DET_OS}...
make ${MAKE_OPTS} stop_services
echo Starting on ${DET_OS}...
make ${MAKE_OPTS} start_services

