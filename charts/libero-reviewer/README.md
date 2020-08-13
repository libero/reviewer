# Libero Reviewer Helm chart

This chart combines:

- reviewer-client
- reviewer-submission
- continuum-adaptor

The [staging deployment](https://libero-reviewer--staging.elifesciences.org/login) at eLife tracks this chart from the `master` branch.
The production deployment has the chart version [manually set](https://github.com/elifesciences/elife-flux-cluster/blob/master/deployments/reviewer/libero-reviewer--prod.yaml).

## Notes

- use separate Ingress objects per Deployment to allow for meaningful [canaries](https://github.com/elifesciences/elife-flux-cluster/blob/master/deployments/reviewer/libero-reviewer--prod--canaries.yaml)
- submission's long lived connections (file uploads) can be accomodated with timeouts
- submission's method of reporting file upload progress requires sticky connections

## Lint helm chart locally

Locally linting can sometimes produce more intelligble error messages:

```sh
docker run \
    -v $(pwd):/src \
    quay.io/helmpack/chart-testing:latest \
    sh -c 'cd /src ; helm repo add k8s  https://charts.bitnami.com/bitnami ; ct lint'
```
