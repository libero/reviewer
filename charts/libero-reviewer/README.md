# libero-reviewer

elife specific deployment of Libero Reviewer

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://charts.bitnami.com/bitnami | postgresql | ~7.0 |

## Notes

- master branch is tracked by eLife's [staging deployment](https://libero-reviewer--staging.elifesciences.org/login)
- eLife's production deployment has the chart version [set manually](https://github.com/elifesciences/elife-flux-cluster/blob/master/deployments/reviewer/libero-reviewer--prod.yaml).
- use separate Ingress objects per Deployment to allow for meaningful [canaries](https://github.com/elifesciences/elife-flux-cluster/blob/master/deployments/reviewer/libero-reviewer--prod--canaries.yaml)
- submission's long lived connections (file uploads) can be accomodated with timeouts
- submission's method of reporting file upload progress requires sticky connections

## Lint helm chart locally

You have to bump the chart version if you change the chart.
Pipeline will otherwise fail.

Locally linting can sometimes produce more intelligble error messages.

```sh
docker run \
    -v $(pwd):/src \
    quay.io/helmpack/chart-testing:latest \
    sh -c 'cd /src ; helm repo add k8s  https://charts.bitnami.com/bitnami ; ct lint'
```

## Update Readme

- modify `README.md.gotmpl`
- run [helm-docs](https://github.com/norwoodj/helm-docs)

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| browsertests.baseurl | string | `""` | defaults to .Values.ingress.host |
| browsertests.image.repository | string | `"liberoadmin/reviewer-browsertests"` | for the tag we use client.image.tag but strip timestamps |
| browsertests.runPostRelease | bool | `false` |  |
| browsertests.testFixture | string | `"Minimal"` |  |
| client.image.pullPolicy | string | `"Always"` |  |
| client.image.repository | string | `"liberoadmin/reviewer-client"` |  |
| client.image.tag | string | `"latest"` |  |
| client.podDisruptionBudget.enabled | bool | `false` |  |
| client.podDisruptionBudget.maxUnavailable | string | `""` |  |
| client.podDisruptionBudget.minAvailable | int | `1` |  |
| client.replicaCount | int | `1` |  |
| continuumAdaptor.continuumApiUrl | string | `"http://continuumtest--gateway.elife.internal"` |  |
| continuumAdaptor.continuumJwtSecret | string | `"libero-reviewer--continuum-journal-jwt"` |  |
| continuumAdaptor.continuumLoginUrl | string | `"http://continuum.gateway.url/submit"` |  |
| continuumAdaptor.elifeApiSecret | string | `"libero-reviewer--elife-api"` |  |
| continuumAdaptor.image.pullPolicy | string | `"Always"` |  |
| continuumAdaptor.image.repository | string | `"liberoadmin/continuum-adaptor"` |  |
| continuumAdaptor.image.tag | string | `"latest"` |  |
| continuumAdaptor.podDisruptionBudget.enabled | bool | `false` |  |
| continuumAdaptor.podDisruptionBudget.maxUnavailable | string | `""` |  |
| continuumAdaptor.podDisruptionBudget.minAvailable | int | `1` |  |
| continuumAdaptor.port | int | `3001` |  |
| continuumAdaptor.replicaCount | int | `1` |  |
| database | object | `{"dbHost":"","dbName":"","dbPasswordKey":"password","dbPasswordSecret":"","dbUser":""}` | Used if database not managed by this chart i.e. 'postgresql.enabled: false' |
| ingress | object | `{"enabled":false,"host":"libero-reviewer--staging.domain.tld"}` | applied to _all_ reviewer ingress records |
| postgresql.enabled | bool | `true` |  |
| postgresql.existingSecret | string | `"libero-reviewer--postgresql"` |  |
| postgresql.image.tag | string | `"11.4.0"` |  |
| postgresql.persistence.enabled | bool | `false` |  |
| postgresql.postgresqlDatabase | string | `"postgres"` |  |
| postgresql.postgresqlUsername | string | `"postgres"` |  |
| postgresql.resources.limits.memory | string | `"256Mi"` |  |
| postgresql.resources.requests.cpu | string | `"250m"` |  |
| postgresql.resources.requests.memory | string | `"256Mi"` |  |
| reporter.enabled | bool | `false` |  |
| reporter.fromAddress | string | `"no-reply@elifesciences.org"` |  |
| reporter.image.repository | string | `"liberoadmin/reviewer-reporter"` |  |
| reporter.image.tag | string | `"latest"` |  |
| reporter.recipient | string | `""` |  |
| reporter.schedules | list | `[{"name":"8am","schedule":"0  8 * * *"},{"name":"1pm","schedule":"0 13 * * *"}]` | list of 'name', 'schedule'(cron syntax) pairs |
| reporter.ssmtpConfSecret | string | `""` | ssmtp.conf file stored as secret, see also libero/reviewer-reporter |
| reporter.subjectline | string | `"Reviewer Status Report"` |  |
| submission.authenticationJwtSecret | string | `"libero-reviewer--auth-jwt"` |  |
| submission.enableStickyConnections | bool | `true` |  |
| submission.graphQL.maxComplexity | int | `100` |  |
| submission.graphQL.maxDepth | int | `5` |  |
| submission.image.pullPolicy | string | `"Always"` |  |
| submission.image.repository | string | `"liberoadmin/reviewer-submission"` |  |
| submission.image.tag | string | `"latest"` |  |
| submission.mail.sendMail | bool | `false` |  |
| submission.mail.sender | string | `"noreply@elifesciences.org"` |  |
| submission.mail.sesRegion | string | `""` |  |
| submission.mail.sesSecret | string | `""` | name of a secret with 'id' and 'access-key' entries |
| submission.maxFileSizeInBytes | int | `100000000` | sets both an submission internal value as well as ingree max_request |
| submission.meca.apiSecret | string | `"libero-reviewer--meca-api"` | name of an existing secret with a 'key' entry |
| submission.meca.emailPrefix | string | `"(staging)"` | for email subject when MECA import fails, usually "(${environment})" |
| submission.meca.emailRecipient | string | `"libero-reviewer@mailinator.com"` |  |
| submission.meca.s3Path | string | `"meca-archive"` |  |
| submission.meca.sftpPath | string | `"/upload"` |  |
| submission.meca.sftpPort | int | `22` |  |
| submission.meca.sftpSecret | string | `"libero-reviewer--sftp"` |  |
| submission.newRelicHome | string | `"/etc/reviewer"` |  |
| submission.nginxWorkerTimeoutSeconds | int | `120` |  |
| submission.podDisruptionBudget.enabled | bool | `false` |  |
| submission.podDisruptionBudget.maxUnavailable | string | `""` |  |
| submission.podDisruptionBudget.minAvailable | int | `1` |  |
| submission.port | int | `3000` |  |
| submission.replicaCount | int | `1` |  |
| submission.s3.bucket | string | `""` |  |
| submission.s3.endpoint | string | `""` | overide the default aws s3 endpoint, set to "" when using aws s3 |
| submission.s3.forcePathStyle | bool | `true` |  |
| submission.s3.secret | string | `""` | name of a secret with 'id' and 'access-key' entries |
| submission.sciencebeam.convertUrl | string | `"sciencebeam--prod--test-cluster.elifesciences.org/api/convert"` |  |
| submission.sciencebeam.timeout | int | `20000` |  |
| submission.terminationGracePeriodSeconds | int | `150` |  |
| submissionDbSchema.image.repository | string | `"liberoadmin/reviewer-xpub-postgres"` |  |
| submissionDbSchema.image.tag | string | `"latest"` |  |
