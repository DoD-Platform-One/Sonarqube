# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [10.7.0-bb.6] - 2025-07-03

### Fixed

- Configuration changes needed to allow for prometheus to scrap metrics properly

## [10.7.0-bb.5] - 2025-06-24

### Updated

- Changed cypress test password

## [10.7.0-bb.4] - 2025-05-20

### Updated

- Add assertion to add delay to cypress test to workaround plugin risk page

## [10.7.0-bb.3] - 2025-05-19

### Updated

- Updated cypress test to run with larger viewport and no waits

## [10.7.0-bb.2] - 2025-04-07

### Updated

- Updated imagePullSecrets

## [10.7.0-bb.1] - 2025-03-25

### Updated

- Updated istio related network policies to be more dynamic

## [10.6.1-bb.6] - 2024-01-13

### Fixed

- Set metadata.labels in _pod.tpl to use `sonarqube.workloadLabels` variable as it already has the standard Kubernetes labels

## [10.6.1-bb.5] - 2024-12-20

### Fixed

- Changed to IB ubi 8.10 image for curlContainerImage as it is more widely accessible
- Updated gluon 0.5.4 -> 0.5.12 to fix pipeline cert issue

## [10.6.1-bb.4] - 2024-12-20

### Fixed

- Password leak in job args when setting password via values.yaml

## [10.6.1-bb.3] - 2024-12-18

### Changed

- Update configure-sso job to run on helm upgrades alongside installs
- Update admin password hook job container image

## [10.6.1-bb.2] - 2024-10-9

### Changed

- Update cypress test upgrade logic
- Added the maintenance track annotation and badge

## [10.6.1-bb.1] - 2024-10-4

### Changed

- Update "community" edition logic for appVersion

## [10.6.1-bb.0] - 2024-10-3

### Changed

- Update gluon 0.5.0 -> 5.4.0
- Update sonarqube 9.9.6-community -> 10.6.0-community
- Update postgresql-exporter 0.20.0 -> 0.17.2

## [8.0.6-bb.4] - 2024-08-27

### Changed

- Modified templating for `podLabels` for `deployment.yaml`, `sonarqube-sts.yaml`, `statefulset.yaml`, and `statefulset-slaves.yamll` to use `tpl` to support passing kiali-required labels.

## [8.0.6-bb.3] - 2024-08-13

### Changed

- Addressed value logic for the admin password change hook job
- Switched the admin password change hook job image value `curlContainerImage` to hardened registry1 curl capable container

## [8.0.6-bb.2] - 2024-07-16

### Changed

- Removed the allow nothing policy
- Moved the authorization policies
- Updated the istio hardened doc

## [8.0.6-bb.1] - 2024-07-09

### Changed

- Added in waits between cypress test calls to avoid having cypress tests lock out and fail with failed response hanging

## [8.0.6-bb.0] - 2024-07-03

### Changed

- Update registry1.dso.mil/ironbank/big-bang/sonarqube-9 9.9.5-community -> 9.9.6-community

## [8.0.5-bb.3] - 2024-07-01

### Fixed

- Resolved issue with sso helm template matching up with values.yaml file.

## [8.0.5-bb.2] - 2024-06-27

### Added

- Added SSO ability to pull SAML config and write setting to the SonarQube API.

## [8.0.5-bb.1] - 2024-06-27

### Fixed

- Removed duplicated chart.yaml artifact

## [8.0.5-bb.0] - 2024-06-18

### Changed

- Update gluon 0.4.9 -> 0.5.0
- Update registry1.dso.mil/ironbank/big-bang/sonarqube-9 9.9.4-community -> 9.9.5-community
- Update registry1.dso.mil/ironbank/opensource/postgres/postgresql12 12.18 -> 12.19

## [8.0.4-bb.6] - 2024-05-21

### Changed

- Update securityContext for sonarqube StatefulSets

## [8.0.4-bb.5] - 2024-05-16

### Changed

- Update documentation development_maintenance.md for prometheus exporter
- Updated documentation Prometheus.md with prometheus exporter and podmonitor
- Added the ability to monitor sonarqube pods using prometheus targets
- Added /templete/bigbang/prometheus-podmonitor.yaml
- Added istio peerauthentication policy `peer-authentication-podmonitor`
- Updated istio `allow-http-envoy` policy to allow podmonitor ports (8000, 8001)

## [8.0.4-bb.4] - 2024-04-29

### Added

- Added istio egress whitelist functionality

## [8.0.4-bb.3] - 2024-04-22

### Added

- Added the ability to deploy additional custom NetworkPolicy objects via override values (see chart/templates/bigbang/networkpolicies/additional-networkpolicies.yaml)

## [8.0.4-bb.2] - 2024-04-10

### Changed

- Updated gluon dependency to 0.4.9

## [8.0.4-bb.1] - 2024-03-14

### Changed

- Updated the authorization policies for full BB integration

## [8.0.4-bb.0] - 2024-02-16

### Changed

- Update release to sonarqube-8.0.4-sonarqube-dce-7.0.4
- Updated postgresql12 image to 12.18

## [8.0.3-bb.3] - 2024-02-06

### Changed

- Updated SonarQube to gluon 0.4.7

## [8.0.3-bb.2] - 2024-02-05

### Changed

- Updated postgresql12 image to 12.17

## [8.0.3-bb.1] - 2024-01-16

### Added

- Added istio `allow-nothing` policy
- Added istio `allow-monitoring` policy
- Added istio `allow-http` policy
- Added istio `allow-http-envoy` policy
- Added istio custom policy template

## [8.0.3-bb.0] - 2023-11-29

### Changed

- Update release to sonarqube-8.0.3-sonarqube-dce-7.0.3

## [8.0.2-bb.3] - 2023-11-06

### Changed

- postgres-exporter from 0.14.0 to 0.15.0

## [8.0.2-bb.2] - 2023-11-01

### Changed

- fixed typo in changelog

## [8.0.2-bb.1] - 2023-10-18

### Changed

- enabled creation of ServiceAccounts for Sonarqube and Postgres
- hardened automountServiceAccountToken for Pods and ServiceAccounts

## [8.0.2-bb.0] - 2023-10-16

### Changed

- Update release to sonarqube-8.0.2-sonarqube-dce-7.0.2
- sonarqube from 9.9.1-community to 9.9.2-community
- postgres-exporter from 0.13.2 to 0.14.0

## [8.0.1-bb.6] - 2023-09-20

### Changed

- Updated to gluon 0.4.1 and cypress 13.x
- Updated tests to work with cypress 13.x

## [8.0.1-bb.5] - 2023-09-13

### Changed

- sonarqube to run as non root group

## [8.0.1-bb.4] - 2023-08-18

### Changed

- postgres-exporter from 0.12.0 to 0.13.2
- postgresql12 from 12.15 to 12.16

## [8.0.1-bb.3] - 2023-08-14

### Changed

- Setting new variable for cypress test timeout
- If no value is given it will use default timeout value.

## [8.0.1-bb.2] - 2023-06-26

### Changed

- Set volumepermissions.enabled to false
- Update change-admin-password-hook and postgresql to run as non root user

## [8.0.1-bb.1] - 2023-05-26

### Added

- Added OpenShift support

## [8.0.1-bb.0] - 2023-05-17

### Changed

- Update release to sonarqube-8.0.1-sonarqube-dce-7.0.1
- sonarqube from 9.9.0-community to 9.9.1-community
- postgres-exporter from 0.11.1 to 0.12.0
- postgresql12 from 12.14 to 12.15

## [8.0.0-bb.1] - 2023-02-27

### Changed

- upgraded postgresql dependency to `12.14`

## [8.0.0-bb.0] - 2023-02-07

### Changed

- Chart version `8.0.0` sonarqube version `9.9.0` updates.

## [1.0.31-bb.5] - 2023-01-25

### Changed

- Cleaned up servicemonitor and networkpolicies

## [1.0.31-bb.4] - 2023-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [1.0.31-bb.3] - 2022-12-08

### Changes

- Removed duplicate `nodeSelector`, `affinity`, and `tolerances` in the `deployment.yaml`

## [1.0.31-bb.2] - 2022-12-01

### Changes

- upgraded postgresql dependency to `12.13`

## [1.0.31-bb.1] - 2022-11-14

### Added

- Added (back) ability to override cacert command/args

## [1.0.31-bb.0] - 2022-11-14

### Updated

- Updated to version `sonarqube-lts-1.0.31` of upstream helm chart and version 8.9.10 of sonarqube

## [1.0.29-bb.5] - 2022-10-17

### Updated

- Updated postgres and postgres exporter images

## [1.0.29-bb.4] - 2022-09-26

### Changed

- Added capabilities drop ALL

## [1.0.29-bb.3] - 2022-09-21

### Changed

- Added default JDK arg to disable FIPS alignment - Sonarqube does not support running on FIPS nodes (<https://docs.sonarqube.org/latest/requirements/requirements/>)

## [1.0.29-bb.2] - 2022-06-30

### Changed

- Changed install-plugin configmap to use curl instead of wget
- Changed plugins.image to declare use of sonarqube image

## [1.0.29-bb.1] - 2022-06-28

### Changed

- Updated bb base image to 2.0.0
- Updated gluon to 0.2.10

## [1.0.29-bb.0] - 2022-06-16

### Changed

- Updated Sonarqube image to 8.9.9
- Updated Postgresql12 image to 12.11
- Updated BB base image to 1.18.0

## [1.0.26-bb.2] - 2022-06-16

### Changed

- Updated BB base image to 1.17.0

## [1.0.26-bb.1] - 2022-05-19

### Changed

- Added JVM args to handle issues with FIPS clusters

## [1.0.26-bb.0] - 2022-05-05

### Changed

- Updated chart to sync with upstream sonarqube-lts chart
- Updated SonarQube image to `8.9.8-community`
- Updated PostgreSQL image to `12.10`
- Updated Big Bang Base image to `1.2.0`

## [9.6.3-bb.25] - 2022-04-18

### Changed

- Updated `waitForDb` image to match postgresql dependency

## [9.6.3-bb.24] - 2022-04-15

### Added

- Added runAsGroup 1000 to Sonarqube container

## [9.6.3-bb.23] - 2022-04-04

### Added

- Added sidecar and sidecar termination to change password hook

## [9.6.3-bb.22] - 2022-03-30

### Added

- Add default PeerAuthentication to enable STRICT mTLS

## [9.6.3-bb.21] - 2022-03-18

### Added

- Add default PeerAuthentication to enable STRICT mTLS
- Add `wait-for-db` initContainer compatibility check

## [9.6.3-bb.20] - 2022-3-17

### Changed

- Added value for the previously hardcoded `wait-for-db` initContainer image

## [9.6.3-bb.19] - 2022-3-9

### Changed

- Updated change password hook deletion policy

## [9.6.3-bb.18] - 2022-3-9

### Changed

- Updated postgres exporter image to 0.10.1

## [9.6.3-bb.17] - 2022-2-25

### Changed

- Updated `deploymentStrategy` in `values.yaml` to explicitly define the `Recreate` strategy

## [9.6.3-bb.16] - 2022-2-15

### Changed

- Updated default-deny-all network policy to deny all.

## [9.6.3-bb.15] - 2022-1-02

### Added

- Added renovate check to track postgresql and big-bang/base container images

### Changed

- Dev/CI Posgresql sub-chart version bump to `12.7.0` from `11.7.0`
- CI big-bang/base image bump to version `1.0.0`

## [9.6.3-bb.14] - 2022-1-31

### Changed

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [9.6.3-bb.13] - 2022-1-24

### Changed

- Moved bbtest default values into chart's values.yaml instead of test-values.yaml

## [9.6.3-bb.12] - 2021-12-20

### Changed

- Changed Values.hostname to Values.domain for proper naming

## [9.6.3-bb.11] - 2021-11-30

### Changed

- Changes to allow command and args on ca-certs init container to be set through value parameters

## [9.6.3-bb.10] - 2021-11-18

### Added

- Added image pull policy for admin password hook job

## [9.6.3-bb.9] - 2021-10-27

### Added

- Added networkpolicy for https egress with ability to enable/disable

## [9.6.3-bb.8] - 2021-10-18

### Changed

- Modified change-admin-password-hook job sidecar connection timeout

## [9.6.3-bb.7] - 2021-10-15

### Changed

- Modified change-admin-password-hook job sidecar termination

## [9.6.3-bb.6] - 2021-10-14

### Changed

- Modified conditional around change-admin-password-hook job sidecar termination

## [9.6.3-bb.5] - 2021-10-04

### Changed

- Reverted to use `until` in change-admin-password-hook job script.

## [9.6.3-bb.4] - 2021-09-29

### Added

- NetworkPolicy template to allow istiod communication when istio-injection is enabled.

### Changed

- Updated change-admin-password-hook job to complete when istio-injection is enabled.

## [9.6.3-bb.3] - 2021-09-28

### Added

- Added renovate support for the Sonarqube Iron Bank image

## [9.6.3-bb.2] - 2021-09-22

### Changed

- Removed duplicate regions of pod spec in deployment.

## [9.6.3-bb.1] - 2021-09-15

### Changed

- Moved to Ironbank image with plugins

## [9.6.3-bb.0] - 2021-09-07

### Changed

- KPT'd latest tagged version from upstream

## [9.2.6-bb.17] - 2021-09-06

### Changed

- Updated requests/limits based on nightly CI findings

## [9.2.6-bb.16] - 2021-08-30

### Changed

- Update init containers resource limits and requests.

## [9.2.6-bb.15] - 2021-08-19

### Changed

- Update resource limits and requests to guaranteed QoS

## [9.2.6-bb.14] - 2021-08-19

### Added

- Resource limit and request for the deployment

## [9.2.6-bb.13] - 2021-06-07

### Upgrade

- Upgraded Sonarqube to ironbank version 8.9.
- Bigbang plugins have been upgraded to the latest versions:
  - dependency-check-sonar-plugin version 2.0.8
  - sonar-c-plugin version 1.3.3.2051
  - sonar-cxx-plugin version 2.0.2.2734
  - sonar-zap-plugin version 2.2.0

## [9.2.6-bb.12] - 2021-06-02

### Modified

- Modified helm-test network policy to be more restrictive.

## [9.2.6-bb.11] - 2021-05-27

### Modified

- Modified the bigbang monitoring network policy to be more restrictive.

## [9.2.6-bb.10] - 2021-05-24

### Added

- Adding network policies.

## [9.2.6-bb.9] - 2021-05-10

### Changed

- Moved cypress testing to the new helm test structure.

## [9.2.6-bb.8] - 2021-04-06

### Update

- Updated sonarqube image version to 8.7.1-community

## [9.2.6-bb.7] - 2021-03-31

### Added

- Adding Affinity documentation

## [9.2.6-bb.6] - 2021-03-30

### Changed

- Modified initContainer logic

## [9.2.6-bb.5] - 2021-03-22

### Changed

- Fixed initContainer logic

## [9.2.6-bb.4] - 2021-03-22

### Added

- Adding ability to specify istio gateways and hosts in values file

## [9.2.6-bb.3] - 2021-03-16

### Added

- Plugins have been preinstalled into the container and made available at registry.dso.mil.
- InitContainers have also been pushed into registry.dso.mil until ironbank equivalents can be found.

## [0.0.0-bb.2] - 2021-01-22

### Added

- Added SAML sso integration
- Added istio virtual service

### Changed

- Modified images to use ironbank and repo1

## [0.0.0-bb.1] - 2020-08-01

### Added

- Added enforced login/authentication

## [0.0.0-bb.0] - 2020-06-15

### Added

- Initial release
- upstream version 8.3-community [Version 8.3.1 (build 34397)]
- Added logging instructions to docs 7/22/2020
- Added auth-oidc plugin version 2.0.0
- Added plugins for scanning C/C++ code 10/01/2020
