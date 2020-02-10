# 0003. Server Side Node Standards

Date: 2020-01-21

## Status

Accepted

## Context

As part of on-going development, it has been noticed (thanks Norris) that the
tranpilation is not what was expected and we should use a later version of
ECMA script to target.

## Decision

From [here](https://kangax.github.io/compat-table/es2016plus/#node12_11)

The suggestion is to use node v12 and target "ES2019" in your `tsconfig.json`.

The minor node version will be updated to match the minor version of the Alpine docker image for node (currently 12.15)

### Discussion

Done.

## Consequences

Better transpilation and debugging experience.

Take advantage of more recent functionality, enhancements and optimisations.
