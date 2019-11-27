# Deployment

## Overview

Libero Reviewer is built using a micro services architecture. Each service is built to have a certain degree of resiliency when failures occurr. Additionally,
communication between services is event driven to provide loose coupling.

### Infrastructure services

Some of the services require a database for persistence (e.g. reviewer-submission and audit). The Knex library is used to provide a degree of abstraction above
relational database systems. Other types of database could be used, but would require writing specific repository implementations.

Additionally, a message broker is used for inter service communication. The RabbitMQ is used in the [@libero/event-bus](https://github.com/libero/event-bus) package.
As with the database, this can be  swapped out with another package that implements the same interface.

### Application services

The following services are required to have a basic working system. Each service allows some configuration using environment variables.
Note: this will probably change once we add config service

* Client ([@libero/reviewer-client](https://github.com/libero/reviewer-client))
* Authentication ([@libero/continuum-auth](https://github.com/libero/continuum-auth))
* Submission ([@libero/reviewer-submission](https://github.com/libero/reviewer-submission))

The `reviewer-client` service may need to proxy api requests to the `review-submission` service so this needs to be configured in your infrastructure
(e.g. nginx proxying), if the api url is in the same domain (e.g. https://reviewer-client.url/api). Alternatively, you could configure the client to use a different
domain for api requests (e.g. https://my-api-url), which would then route the requests to the `reviewer-submission` service.

Consult the documentation on each service for more information on how they can be configured.


### Additional services

* Audit (@libero/audit)

### Journal login

TODO: move this somewhere else

For journal authentication, a configuration setting needs to be set to ensure the redirect returns the user to the correct url after authentication. The following
describe how to change this setting in each environment. Note that builder-configuration changes requires admin approval (@diversemix)

#### Staging (journal environment: continuumtest):
URL: https://continuumtest--cdn-journal.elifesciences.org/

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-continuumtest-public.sls#L58
1. : Run https://alfred.elifesciences.org/job/test-journal/

#### XPub staging (journal environment: continuumtestpreview)
URL: https://continuumtestpreview--journal.elifesciences.org/
(this needs credentials, ask @erezmus)

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-continuumtestpreview-public.sls#L24
1. : Change https://github.com/elifesciences/elife-xpub/blob/develop/config/staging.js#L14-L19
1. : Wait for https://alfred.elifesciences.org/job/test-elife-xpub-source-repository and https://alfred.elifesciences.org/job/test-elife-xpub
1. : Run https://alfred.elifesciences.org/job/test-journal/

#### Prod (journal environment: prod)
URL: https://elifesciences.org

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-prod-public.sls#L75
1. : Run https://alfred.elifesciences.org/job/prod-journal/

## Docker Compose

The repository comes with several docker compose files and make commands to start up the services. We recommend that it be used for non production use.

## Kubernetes

See https://github.com/elifesciences/libero-reviewer-formula for a reference implementation using Helm.