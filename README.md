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

The `docker-compose` files encode two environment:

- __docker-compose.yml:__ semver releases of reviewer components
- __docker-compose.master.yaml:__ head of master of reviewer components

Renovatebot keeps these up to date as new images get pushed to hub.docker.com.

## Quick Start

```sh
make setup
make start
yarn test:integration
```

This will:

- pull git submodules
- install yarn deps for browsertests
- launch reviewer at [localhost:9000](http://localhost:9000)

The _client_, _submission_ and _continuum-adaptor_ containers are brought up behind a _nginx_ proxy that routes the various URLs to them.
_reviewer-mocks_ is only used to mock the external login service.

Other make targets:

- `stop`: tear everything down
- `start_master`: use latest master builds instead of semver images
- `test_integration` and `test_integration_master`: bring stuff up and run the tests
