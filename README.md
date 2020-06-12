![eLife Logo](https://raw.githubusercontent.com/elifesciences/pattern-library/develop/assets/img/patterns/organisms/elife-logo-xs.svg)

![CI Badge](https://github.com/libero/reviewer/workflows/CI/badge.svg)

# Welcome to Libero Reviewer

[The Product Roadmap](https://trello.com/b/NShRx4VE/libero-reviewer-product-roadmap)
for Libero Reviewer has been revisted after the launch of libero.pub site. This roadmap
combined with the site sets out the objectives and our commitments for the product vision.

We are a part of the [Coko Community](https://coko.foundation/partners/) and
as such committed to sharing our components with the rest of the publishing via
this community.

The aim of the PoC is to demonstrate an implementation a widely used and mature framework for
all the heavylifting for solving the technical issues (don't reinvent the wheel).
With the aim of sharing domain-specific components (Publishing) via PubSweet for
the rest of the community to benefit from.

## Documentation

All documents relevant to this project can be found in the [`Libero Reviewer Gitbook`](https://libero.gitbook.io/libero-reviewer/) site.

## Environments

Combine the various compose files to spin up different environments:

- __docker-compose.yml:__ semver releases of reviewer components
- __docker-compose.infra.yml:__ minio (to emulate s3) and postgresql with reviewer schema
- __docker-compose.master.yaml:__ overlay tracking head of master of reviewer components
- __docker-compose.localhost.yaml:__ overlay that lets you interacts with the env via [localhost:9000](http://localhost:9000)

Renovatebot keeps these up to date as new images get pushed to hub.docker.com.

NOTE: Without the localhost overlay the app won't work if you visit `localhost:9000`. Instead it is supposed to be accessible at `nginx:9000` from inside a container. This is needed so that we can test using the containerized browsertests.

## Quick Start

```sh
make setup
make start_master_localhost
```

This will:

- pull git submodules
- launch reviewer at [localhost:9000](http://localhost:9000)

The _client_, _submission_ and _continuum-adaptor_ containers are brought up behind a _nginx_ proxy that routes the various URLs to them.
_reviewer-mocks_ is only used to mock the external login service.

You can now e.g. run checkout the reviewer-client repo and run `make test_browser`.

Other make targets:

- `stop`: tear everything down
- `test_integration` and `test_integration_master`: bring stuff up and run the matching browsertest container
