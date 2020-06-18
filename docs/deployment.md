# Deployment

## Overview

Libero Reviewer is built using a micro services architecture. Each service is built to have a certain degree of resiliency when failures occurr. Additionally,
communication between services is event driven to provide loose coupling.

### Infrastructure services

The backend (reviewer-submission) relies on:

- a database (compose files use postgres)
- s3 bucket (compose files use minio)
- reverse-proxy to route to endpoints (compose files use nginx)

The [reviewer-xpub-postgres image](https://hub.docker.com/r/liberoadmin/reviewer-xpub-postgres) simply add our schema to the official postgres image.
This can be used as an init container (see helm chart).

### Application services

The following services are required to have a basic working system.
Each service allows some configuration using environment variables.

* Client ([@libero/reviewer-client](https://github.com/libero/reviewer-client))
* Authentication ([@libero/continuum-adaptor](https://github.com/libero/continuum-adaptor))
* Submission ([@libero/reviewer-submission](https://github.com/libero/reviewer-submission))

The `reviewer-client` service may need to proxy api requests to the `review-submission` service so this needs to be configured in your infrastructure
(e.g. nginx proxying), if the api url is in the same domain (e.g. https://reviewer-client.url/api). Alternatively, you could configure the client to use a different
domain for api requests (e.g. https://my-api-url), which would then route the requests to the `reviewer-submission` service.

Consult the documentation on each service for more information on how they can be configured or look at the compose files in this repo.

### How to deploy

- for development and testing use the compose files (see [readme](../README.md))
- deployment at eLife use [the helm chart](..charts/libero-reviewer) (see [eLife Deploy docs][elife-deployment.md])

