# Files that require bigbang integration testing

### See [bb MR testing](./docs/test-package-against-bb.md) for details regarding testing changes against bigbang umbrella chart.

There are certain integrations within the bigbang ecosystem and this package that require additional testing outside of the specific package tests ran during CI.  This is a requirement when files within those integrations are changed, as to avoid causing breaks up through the bigbang umbrella.  Currently, these include changes to the istio implementation within sonarqube (see: [istio templates](./chart/templates/bigbang/istio/), [network policy templates](./chart/templates/bigbang/networkpolicies/), [service entry templates](./chart/templates/bigbang/serviceentries/)).

Be aware that any changes to files listed in the [Modifications made to upstream chart](#modifications-made-to-upstream-chart) section will also require a codeowner to validate the changes using above method, to ensure that they do not affect the package or its integrations adversely. 

Be sure to also test against monitoring locally as it is integrated by default with these high-impact service control packages, and needs to be validated using the necessary chart values beneath `istio.hardened` block with `monitoring.enabled` set to true as part of your dev-overrides.yaml 

# Upgrading to a new version

The below details the steps required to update to a new version of the Sonarqube package.

1. Do diff of [upstream chart](https://github.com/SonarSource/helm-chart-sonarqube/tree/master/charts/sonarqube-lts) between old and new release tags to become aware of any significant chart changes. A graphical diff tool such as [Meld](https://meldmerge.org/) is useful. You can see where the current helm chart came from by inspecting ```/chart/kptfile```
1. Create a development branch and merge request tied to the Repo1 issue created for the Sonarqube package upgrade.  The association between the branch and the issue can be made by prefixing the branch name with the issue number, e.g. 56-update-sonarqube-package. DO NOT create a branch if working renovate/ironbank. Continue edits on renovate/ironbank.
1. From the root of this repository, sync the BigBang Sonarqube package chart with the upstream Sonarqube chart using `kpt pkg update chart@sonarqube-<target version> --strategy alpha-git-patch`.  Please note that kpt > v1.0.0 does NOT support this update strategy, and the latest kpt version that does is 0.39.2Merge/Sync the new helm chart with the existing package code. A graphical diff tool like [Meld](https://meldmerge.org/) is useful. Reference the "Modifications made to upstream chart" section below. Be careful not to overwrite Big Bang Package changes that need to be kept. Note that some files will have combinations of changes that you will overwrite and changes that you keep. Stay alert. The hardest file to update is the ```/chart/values.yaml```.
1. In `chart/Chart.yaml` update gluon to the latest version and run `helm dependency update chart` from the top level of the repo to package it up.
1. Modify the `image.tag` value in `chart/values.yaml` to point to the newest version.
1. Update `chart/Chart.yaml` to the appropriate versions. The annotation version should match the ```appVersion```.
    ```yaml
    version: X.X.X-bb.X
    appVersion: X.X.X
    annotations:
      bigbang.dev/applicationVersions: |
        - Sonarqube: X.X.X
    ```
1. Update `chart/Chart.yaml` `bigbang.dev/upstreamReleaseNotesMarkdown` to the correct tag links.
    ```yaml
    annotations:
      bigbang.dev/upstreamReleaseNotesMarkdown: |
        - [Find our upstream chart's CHANGELOG here](https://link-goes-here/CHANGELOG.md)
        - [and our upstream application release notes here](https://another-link-here/RELEASE_NOTES.md)
    ```
1. Update `CHANGELOG.md` adding an entry for the new version and noting all changes.
1. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).
1. Open an MR in "Draft" status and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't.
1. Once all manual testing is complete take your MR out of "Draft" status and add the review label.

# How to test Sonarqube

Deploy and login with both admin user and sso.

## Test Basic Functionality and Monitoring

Deploy with the following Big Bang override values to test the repo job and monitoring interaction:

```yaml
clusterAuditor:
  enabled: false

gatekeeper:
  enabled: false

istioOperator:
  enabled: true

istio:
  enabled: true
  # Istio hardened will be enabled by default in the future (https://repo1.dso.mil/big-bang/bigbang/-/issues/2037)
  values:
    hardened:
      enabled: true

jaeger:
  enabled: false

kiali:
  enabled: false

elasticsearchKibana:
  enabled: false

eckOperator:
  enabled: false

fluentbit:
  enabled: false

monitoring:
  enabled: true

twistlock:
  enabled: false

addons:
  sonarqube:
    enabled: true
    git:
      tag: null
      branch: "name-of-your-development-branch"
    values:
      curlContainerImage: "registry1.dso.mil/ironbank/big-bang/base:2.1.0"
      monitoring:
        enabled: true
      prometheusExporter:
        enabled: true
        version: "0.17.2"
        webBeanPort: 8000
        ceBeanPort: 8001
        config:
          rules:
          - pattern: ".*"
        image: registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter:0.17.2
      monitoringPasscode: "define_it" # set this password to your instance admin password used for the UI
      networkPolicy:
        enabled: false # additional network policies may be needed if set to "true"
        prometheusNamespace: "monitoring"
      service:
        annotations:
          prometheus.io/scrape: "true"
          prometheus.io/port: ""
          prometheus.io/path: "/metrics"
      istio:
        enabled: true
        hardened:
          enabled: true
          monitoring:
            enabled: true
          customServiceEntries:
            - name: "allow-maven-for-monitoring"
              enabled: true
              spec:
                hosts:
                  - "repo1.maven.org"
                location: MESH_EXTERNAL
                ports:
                  - number: 443
                    protocol: TLS
                    name: https
                resolution: DNS
```

1. Navigate to the Prometheus target page (https://prometheus.dev.bigbang.mil/targets) and validate that the Sonarqube target shows as up.
   - If the prometheus targets are not showing then follow this document on setting up the prometheus exporter and podmonitor [Prometheus.md](Prometheus.md)

# Modifications made to upstream chart
This is a high-level list of modifications that Big Bang has made to the upstream helm chart. You can use this as as cross-check to make sure that no modifications were lost during an upgrade process.

## chart/templates/change-admin-password-hook.yml
- add if logic to use a correct curl command if using precreated secret for admin `password` and `currentPassword`
 
## chart/charts/*.tgz
- add the gluon library archive from ```helm dependency update ./chart```

- commit the tar archives that were downloaded from the helm dependency update command. And also commit the requirements.lock that was generated.

## chart/deps/postgresql/*
- Bitnami postgres chart for development

## chart/templates/bigbang/*
- add istio VirtualService
- add ServiceMonitor
- add PeerAuthentication
- add NetworkPolicies

## chart/templates/tests/*
- add templates for helm tests sonarqube-cypress-test.yaml

## chart/templates/deployment.yaml & sonarqube-sts.yaml
- remove default images
- change waitForDb from using `nc` to a `pg_isready`
- modify caCert init container to conditionally use command/args from values

## chart/templates/install-plugins.yaml
- switched upstream cat/wget plugin install to curl

## chart/templates/change-admin-password-hook.yaml
- re-write job with istio termination
- change `hook-delete-policy` to add `before-hook-creation`

## chart/templates/NOTES.txt
- Added istio.enabled wraper

## chart/templates/_helpers.tpl
- Added define "deployment.waitForDb.compatible"
- Added define "sonarqube.chart"

## chart/tests/cypress/*
- add cypress tests

## chart/Chart.yaml
- changes for Big Bang version, gluon dependency, and annotations

# chart/Chart.lock
- add this file during helm dependency update

## chart/Kptfile
- add Kptfile

## chart/values.yaml
- curlContainerImage updated to use registry1 hardened curl-capable image
- Big Bang additions at the bottom of the values file
- Replace image with Iron Bank image
- add PullSecret.name = private-registry
- add fips options
- added bbtests values to support cypress/script tests
- drop all's
- enable serviceaccount creation
- set automountToken to false to maintain security posture
