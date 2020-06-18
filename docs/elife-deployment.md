# Reviewer Deployment for eLife

- Reviewer deployment for eLife uses the [helm chart](../charts/libero-reviewer)
- deployment to cluster managed by flux (see [test cluster](https://github.com/elifesciences/elife-flux-test))

## Changing the chart

1. make changes on separate branch (e.g. dev-chart)
1. bump chart version
1. point reviewer staging deployment i.e. (HelmRelease yaml) to `dev-chart` version
1. test if deployment handles upgrade of chart gracefully
1. merge `dev-chart` into main branch

- prefer using [test cluster](https://github.com/elifesciences/elife-flux-test) to develop chart
- __Cluster will automatically apply changed chart (checks every five minues)__


## Deployment Policy

### When and how to deploy

- we automatically deploy to staging and production
- we ensure that existing connections don't get terminated (#998)
- gate for production deploy (#944):
  - image versions to deploy match staging
  - staging has passed acceptance tests (#923)
- reviewer deploy doesn't run journal end2end tests, but journal deploy does (#1080)
- production deploy must pass smoketest before receiving traffic (#1042)

### Alerting/Monitoring

- team to be alerted on failed staging and/or production releases (#791)
- these alerts are not #incident-channel, those pertain to issues with completed deploys
- monitoring of service after deploy is separate discussion (#1081)


## Journal login

For journal authentication, a configuration setting needs to be set to ensure the redirect returns the user to the correct url after authentication. The following
describe how to change this setting in each environment. Note that builder-configuration changes requires admin approval.

There is ongoing work to have continuumtest support dynamic return urls (see [ticket](https://github.com/libero/reviewer/issues/983)).
This work also aims to simplify the [authentication flow](authentication.md).

### Staging (journal environment: continuumtest):
URL: [https://continuumtest--cdn-journal.elifesciences.org/]

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-continuumtest-public.sls#L58
1. : Run https://alfred.elifesciences.org/job/test-journal/

### XPub staging (journal environment: continuumtestpreview)
URL: [https://continuumtestpreview--journal.elifesciences.org/]
(this needs credentials, ask @erezmus)

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-continuumtestpreview-public.sls#L24
1. : Change https://github.com/elifesciences/elife-xpub/blob/develop/config/staging.js#L14-L19
1. : Wait for https://alfred.elifesciences.org/job/test-elife-xpub-source-repository and https://alfred.elifesciences.org/job/test-elife-xpub
1. : Run https://alfred.elifesciences.org/job/test-journal/

### Prod (journal environment: prod)
URL: [https://elifesciences.org]

1. : Change https://github.com/elifesciences/builder-configuration/blob/master/pillar/environment-prod-public.sls#L75
1. : Run https://alfred.elifesciences.org/job/prod-journal/
