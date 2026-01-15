<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# sonarqube

![Version: 2025.6.1-bb.2](https://img.shields.io/badge/Version-2025.6.1--bb.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2025.6.1](https://img.shields.io/badge/AppVersion-2025.6.1-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code. As a core element of our Sonar solution, SonarQube integrates into your existing workflow and detects issues in your code to help you perform continuous code inspections of your projects. The tool analyses 30+ different programming languages and integrates into your CI pipeline and DevOps platform to ensure that your code meets high-quality standards.

## Upstream References

- <https://www.sonarqube.org/>
- <https://github.com/SonarSource/helm-chart-sonarqube>
- <https://github.com/SonarSource/docker-sonarqube>
- <https://github.com/SonarSource/sonarqube>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-2025.6.0-sonarqube-dce-2025.6.0/charts/sonarqube/CHANGELOG.md)
- [and our upstream application release notes here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-2025.6.0-sonarqube-dce-2025.6.0/charts/sonarqube/README.md)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Kubernetes: `>= 1.24.0-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install sonarqube chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| replicaCount | int | `1` |  |
| sso.enabled | bool | `false` |  |
| sso.name | string | `""` |  |
| sso.applicationid | string | `""` |  |
| sso.providerid | string | `""` |  |
| sso.loginUrl | string | `""` |  |
| sso.secured | string | `""` |  |
| sso.serverBaseURL | string | `""` |  |
| sso.idpmetadataurl | string | `""` |  |
| sso.image | string | `""` |  |
| sso.resources.limits.cpu | string | `"100m"` |  |
| sso.resources.limits.memory | string | `"256Mi"` |  |
| sso.resources.requests.cpu | string | `"100m"` |  |
| sso.resources.requests.memory | string | `"256Mi"` |  |
| sso.containerSecurityContext.enabled | bool | `true` |  |
| sso.containerSecurityContext.fsGroup | int | `26` |  |
| sso.containerSecurityContext.runAsUser | int | `26` |  |
| sso.containerSecurityContext.runAsGroup | int | `26` |  |
| sso.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream | object | `{"community":{"buildNumber":"25.12.0.117093","enabled":true},"containerSecurityContext":{"capabilities":{"drop":["ALL"]},"runAsGroup":1000},"env":[{"name":"JDK_JAVA_OPTIONS","value":"-Dcom.redhat.fips=false"}],"fullnameOverride":"sonarqube-sonarqube","image":{"pullSecrets":[],"repository":"registry1.dso.mil/ironbank/sonarsource/sonarqube/sonarqube-community-build","tag":"25.12.0.117093-community"},"initContainers":{"image":"registry1.dso.mil/ironbank/big-bang/base:2.1.0","readOnlyRootFilesystem":true,"resources":{"limits":{"cpu":"50m","memory":"300Mi"},"requests":{"cpu":"50m","memory":"300Mi"}},"securityContext":{"runAsGroup":1000}},"initFs":{"enabled":false},"initSysctl":{"enabled":false,"securityContext":{"capabilities":{"drop":["ALL"]}}},"livenessProbe":{"exec":{"command":["sh","-c","curl --silent --fail --output /dev/null --max-time {{ .Values.livenessProbe.timeoutSeconds \| default 1 }} --header \"X-Sonar-Passcode: $SONAR_WEB_SYSTEMPASSCODE\" \"http://localhost:{{ .Values.service.internalPort }}{{ .Values.livenessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/liveness\"\n"]}},"monitoringPasscode":"define_it","nameOverride":"sonarqube","nginx":{"enabled":false},"persistence":{"size":"20Gi"},"plugins":{"image":"registry1.dso.mil/ironbank/sonarsource/sonarqube/sonarqube-community-build:25.12.0.117093-community"},"postgresql":{"auth":{"database":"sonarDB","enablePostgresUser":true,"password":"sonarPass","username":"sonarUser"},"enabled":true,"image":{"pullSecrets":["private-registry"],"registry":"registry1.dso.mil","repository":"ironbank/opensource/postgres/postgresql","tag":"18.1"},"postgresqlDatabase":"sonarDB","postgresqlPassword":"sonarPass","postgresqlUsername":"sonarUser","primary":{"extraEnvVars":[{"name":"POSTGRES_DB","value":"sonarDB"}],"extraVolumeMounts":[{"mountPath":"/var/run/postgresql","name":"runtime"}],"extraVolumes":[{"emptyDir":{},"name":"runtime"}],"persistence":{"mountPath":"/var/lib/postgresql","size":"20Gi"}}},"prometheusExporter":{"downloadURL":"file:///opt/jmx_exporter/jmx_prometheus_javaagent-1.0.1.jar","image":"registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter:1.0.1"},"readinessProbe":{"exec":{"command":["sh","-c","#!/bin/bash\n# A Sonarqube container is considered ready if the status is UP, DB_MIGRATION_NEEDED or DB_MIGRATION_RUNNING\n# status about migration are added to prevent the node to be kill while sonarqube is upgrading the database.\nif curl -s http://localhost:{{ .Values.service.internalPort }}{{ .Values.readinessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/status \| grep -q -e '\"status\":\"UP\"' -e '\"status\":\"DB_MIGRATION_NEEDED\"' -e '\"status\":\"DB_MIGRATION_RUNNING\"'; then\n  exit 0\nfi\nexit 1\n"]},"timeoutSeconds":90},"resources":{"limits":{"cpu":"1000m"},"requests":{"cpu":"500m"}},"securityContext":{"fsGroup":1000,"runAsGroup":1000,"runAsUser":1000},"serviceAccount":{"create":true},"sonarProperties":{"sonar.ce.javaAdditionalOpts":"-Dcom.redhat.fips=false","sonar.forceAuthentication":true,"sonar.search.javaAdditionalOpts":"-Dcom.redhat.fips=false","sonar.telemetry.enable":false,"sonar.web.javaAdditionalOpts":"-Dcom.redhat.fips=false"},"tests":{"enabled":false,"image":"bitnami/minideb-extras","resources":{}},"waitForDb":{"image":"registry1.dso.mil/ironbank/opensource/postgres/postgresql:18.1"}}` | We are exposing only the keys that BigBang overrides from the upstream chart. Please refer to the [upstream chart](https://github.com/SonarSource/helm-chart-sonarqube/blob/master/charts/sonarqube/values.yaml) for other value configs. |
| curlContainerImage | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi9:9.7"` |  |
| domain | string | `"dev.bigbang.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.sidecar.enabled | bool | `false` |  |
| istio.sidecar.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.serviceEntries.custom | list | `[]` |  |
| istio.authorizationPolicies.enabled | bool | `false` |  |
| istio.authorizationPolicies.custom | list | `[]` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| routes.inbound.sonarqube.enabled | bool | `true` |  |
| routes.inbound.sonarqube.gateways[0] | string | `"istio-gateway/public-ingressgateway"` |  |
| routes.inbound.sonarqube.hosts[0] | string | `"sonarqube.dev.bigbang.mil"` |  |
| routes.inbound.sonarqube.service | string | `"sonarqube-sonarqube.sonarqube.svc.cluster.local"` |  |
| routes.inbound.sonarqube.port | int | `9000` |  |
| routes.inbound.sonarqube.selector.app | string | `"sonarqube"` |  |
| OpenShift.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingress.to.sonarqube:[8000,8001,9000].podSelector.matchLabels.app | string | `"sonarqube"` |  |
| networkPolicies.ingress.to.sonarqube:[8000,8001,9000].from.k8s.monitoring-monitoring-kube-prometheus@monitoring/prometheus | bool | `false` |  |
| networkPolicies.egress.definitions.sonarsource-marketplace.to[0].ipBlock.cidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.egress.definitions.sonarsource-marketplace.to[0].ipBlock.except[0] | string | `"169.254.169.254/32"` |  |
| networkPolicies.egress.definitions.sonarsource-marketplace.ports[0].port | int | `443` |  |
| networkPolicies.egress.definitions.sonarsource-marketplace.ports[0].protocol | string | `"TCP"` |  |
| networkPolicies.egress.definitions.code-repository.to[0].ipBlock.cidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.egress.definitions.code-repository.to[0].ipBlock.except[0] | string | `"169.254.169.254/32"` |  |
| networkPolicies.egress.definitions.code-repository.ports[0].port | int | `443` |  |
| networkPolicies.egress.definitions.code-repository.ports[0].protocol | string | `"TCP"` |  |
| networkPolicies.egress.from.sonarqube.podSelector.matchLabels.app | string | `"sonarqube"` |  |
| networkPolicies.egress.from.sonarqube.to.k8s.tempo/tempo:9411 | bool | `false` |  |
| networkPolicies.egress.from.sonarqube.to.definition.sonarsource-marketplace | bool | `false` |  |
| networkPolicies.egress.from.sonarqube.to.definition.code-repository | bool | `true` |  |
| networkPolicies.egressHttps | object | `{"enabled":true}` | This section will be deprecated in the next major release in favor of the bb-common definitions |
| networkPolicies.additionalPolicies | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://sonarqube-sonarqube:9000"` |  |
| bbtests.cypress.envs.cypress_url_setup | string | `"http://sonarqube-sonarqube:9000/setup"` |  |
| bbtests.cypress.envs.cypress_user | string | `"admin"` |  |
| bbtests.cypress.envs.cypress_password | string | `"admin"` |  |
| bbtests.cypress.envs.cypress_new_password | string | `"New_admin_password!2"` |  |
| bbtests.cypress.envs.cypress_timeout | string | `"10000"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

