#!/bin/sh

DET_OS=$(uname 2>/dev/null || echo Unknown)

if [ "${DET_OS}" = "Linux" ] ;
then
	MAKE_OPTS="-j 4"
else
	MAKE_OPTS="-j 1"
fi

echo $DET_OS so need options $MAKE_OPTS


