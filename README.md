<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# sonarqube

![Version: 2025.3.1-bb.0](https://img.shields.io/badge/Version-2025.3.1--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 2025.3.1](https://img.shields.io/badge/AppVersion-2025.3.1-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code. As a core element of our Sonar solution, SonarQube integrates into your existing workflow and detects issues in your code to help you perform continuous code inspections of your projects. The tool analyses 30+ different programming languages and integrates into your CI pipeline and DevOps platform to ensure that your code meets high-quality standards.

## Upstream References

- <https://www.sonarqube.org/>
- <https://github.com/SonarSource/helm-chart-sonarqube>
- <https://github.com/SonarSource/docker-sonarqube>
- <https://github.com/SonarSource/sonarqube>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-2025.3.1-sonarqube-dce-2025.3.1/charts/sonarqube/CHANGELOG.md)
- [and our upstream application release notes here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-2025.3.1-sonarqube-dce-2025.3.1/charts/sonarqube/README.md)

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
| deploymentType | string | `"StatefulSet"` |  |
| replicaCount | int | `1` |  |
| revisionHistoryLimit | int | `10` |  |
| deploymentStrategy.type | string | `"Recreate"` |  |
| OpenShift.enabled | bool | `false` |  |
| OpenShift.createSCC | bool | `true` |  |
| OpenShift.route.enabled | bool | `false` |  |
| OpenShift.route.host | string | `"sonarqube.your-org.com"` |  |
| OpenShift.route.path | string | `"/"` |  |
| OpenShift.route.tls.termination | string | `"edge"` |  |
| OpenShift.route.wildcardPolicy | string | `"None"` |  |
| OpenShift.route.annotations | object | `{}` |  |
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
| upstream.fullnameOverride | string | `"sonarqube-sonarqube"` |  |
| upstream.community.enabled | bool | `true` |  |
| upstream.community.buildNumber | string | `"25.7.0.110598"` |  |
| upstream.postgresql.enabled | bool | `true` |  |
| upstream.postgresql.postgresqlUsername | string | `"sonarUser"` |  |
| upstream.postgresql.postgresqlPassword | string | `"sonarPass"` |  |
| upstream.postgresql.postgresqlDatabase | string | `"sonarDB"` |  |
| upstream.postgresql.auth.enablePostgresUser | bool | `true` |  |
| upstream.postgresql.auth.username | string | `"sonarUser"` |  |
| upstream.postgresql.auth.password | string | `"sonarPass"` |  |
| upstream.postgresql.auth.database | string | `"sonarDB"` |  |
| upstream.postgresql.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.postgresql.image.repository | string | `"ironbank/opensource/postgres/postgresql"` |  |
| upstream.postgresql.image.tag | string | `"16.2"` |  |
| upstream.postgresql.image.pullSecrets[0] | string | `"private-registry"` |  |
| upstream.postgresql.primary.extraEnvVars[0].name | string | `"POSTGRES_DB"` |  |
| upstream.postgresql.primary.extraEnvVars[0].value | string | `"sonarDB"` |  |
| upstream.postgresql.primary.extraVolumeMounts[0].name | string | `"runtime"` |  |
| upstream.postgresql.primary.extraVolumeMounts[0].mountPath | string | `"/var/run/postgresql"` |  |
| upstream.postgresql.primary.extraVolumes[0].name | string | `"runtime"` |  |
| upstream.postgresql.primary.extraVolumes[0].emptyDir | object | `{}` |  |
| upstream.postgresql.primary.persistence.size | string | `"20Gi"` |  |
| upstream.postgresql.primary.persistence.mountPath | string | `"/var/lib/postgresql"` |  |
| upstream.image.repository | string | `"registry1.dso.mil/ironbank/sonarsource/sonarqube/sonarqube-community-build"` |  |
| upstream.image.tag | string | `"25.7.0.110598-community"` |  |
| upstream.image.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.image.pullSecrets | list | `[]` |  |
| upstream.securityContext.fsGroup | int | `1000` |  |
| upstream.securityContext.runAsUser | int | `1000` |  |
| upstream.securityContext.runAsGroup | int | `1000` |  |
| upstream.containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.containerSecurityContext.runAsUser | int | `1000` |  |
| upstream.containerSecurityContext.runAsGroup | int | `1000` |  |
| upstream.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.elasticsearch.configureNode | bool | `false` |  |
| upstream.elasticsearch.bootstrapChecks | bool | `true` |  |
| upstream.nginx.enabled | bool | `false` |  |
| upstream.service.type | string | `"ClusterIP"` |  |
| upstream.service.externalPort | int | `9000` |  |
| upstream.service.internalPort | int | `9000` |  |
| upstream.service.labels | string | `nil` |  |
| upstream.service.annotations | object | `{}` |  |
| upstream.httpProxySecret | string | `""` |  |
| upstream.httpProxy | string | `""` |  |
| upstream.httpsProxy | string | `""` |  |
| upstream.noProxy | string | `""` |  |
| upstream.networkPolicy.enabled | bool | `false` |  |
| upstream.networkPolicy.prometheusNamespace | string | `"monitoring"` |  |
| upstream.sonarWebContext | string | `""` |  |
| upstream.ingress-nginx.enabled | bool | `false` |  |
| upstream.httproute.enabled | bool | `false` |  |
| upstream.ingress.enabled | bool | `false` |  |
| upstream.ingress.hosts[0].name | string | `"sonarqube.your-org.com"` |  |
| upstream.ingress.annotations | object | `{}` |  |
| upstream.ingress.tls | list | `[]` |  |
| upstream.affinity | object | `{}` |  |
| upstream.tolerations | list | `[]` |  |
| upstream.nodeSelector | object | `{}` |  |
| upstream.hostAliases | list | `[]` |  |
| upstream.readinessProbe.exec.command[0] | string | `"sh"` |  |
| upstream.readinessProbe.exec.command[1] | string | `"-c"` |  |
| upstream.readinessProbe.exec.command[2] | string | `"#!/bin/bash\n# A Sonarqube container is considered ready if the status is UP, DB_MIGRATION_NEEDED or DB_MIGRATION_RUNNING\n# status about migration are added to prevent the node to be kill while sonarqube is upgrading the database.\nif curl -s http://localhost:{{ .Values.service.internalPort }}{{ .Values.readinessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/status \| grep -q -e '\"status\":\"UP\"' -e '\"status\":\"DB_MIGRATION_NEEDED\"' -e '\"status\":\"DB_MIGRATION_RUNNING\"'; then\n  exit 0\nfi\nexit 1\n"` |  |
| upstream.readinessProbe.initialDelaySeconds | int | `60` |  |
| upstream.readinessProbe.periodSeconds | int | `30` |  |
| upstream.readinessProbe.failureThreshold | int | `6` |  |
| upstream.readinessProbe.timeoutSeconds | int | `90` |  |
| upstream.livenessProbe.exec.command[0] | string | `"sh"` |  |
| upstream.livenessProbe.exec.command[1] | string | `"-c"` |  |
| upstream.livenessProbe.exec.command[2] | string | `"curl --silent --fail --output /dev/null --max-time {{ .Values.livenessProbe.timeoutSeconds \| default 1 }} --header \"X-Sonar-Passcode: $SONAR_WEB_SYSTEMPASSCODE\" \"http://localhost:{{ .Values.service.internalPort }}{{ .Values.livenessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/liveness\"\n"` |  |
| upstream.livenessProbe.initialDelaySeconds | int | `60` |  |
| upstream.livenessProbe.periodSeconds | int | `30` |  |
| upstream.livenessProbe.failureThreshold | int | `6` |  |
| upstream.livenessProbe.timeoutSeconds | int | `1` |  |
| upstream.startupProbe.initialDelaySeconds | int | `30` |  |
| upstream.startupProbe.periodSeconds | int | `10` |  |
| upstream.startupProbe.failureThreshold | int | `24` |  |
| upstream.startupProbe.timeoutSeconds | int | `1` |  |
| upstream.initContainers.image | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |
| upstream.initContainers.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.initContainers.securityContext.runAsNonRoot | bool | `true` |  |
| upstream.initContainers.securityContext.runAsUser | int | `1000` |  |
| upstream.initContainers.securityContext.runAsGroup | int | `1000` |  |
| upstream.initContainers.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.initContainers.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.initContainers.resources.limits.memory | string | `"300Mi"` |  |
| upstream.initContainers.resources.limits.cpu | string | `"50m"` |  |
| upstream.initContainers.resources.requests.memory | string | `"300Mi"` |  |
| upstream.initContainers.resources.requests.cpu | string | `"50m"` |  |
| upstream.extraInitContainers | object | `{}` |  |
| upstream.extraContainers | list | `[]` |  |
| upstream.extraVolumes | list | `[]` |  |
| upstream.extraVolumeMounts | list | `[]` |  |
| upstream.waitForDb.image | string | `"registry1.dso.mil/ironbank/opensource/postgres/postgresql:16.2"` |  |
| upstream.caCerts.enabled | bool | `false` |  |
| upstream.initSysctl.enabled | bool | `false` |  |
| upstream.initSysctl.vmMaxMapCount | int | `524288` |  |
| upstream.initSysctl.fsFileMax | int | `131072` |  |
| upstream.initSysctl.nofile | int | `131072` |  |
| upstream.initSysctl.nproc | int | `8192` |  |
| upstream.initSysctl.securityContext.privileged | bool | `true` |  |
| upstream.initSysctl.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.initSysctl.securityContext.runAsUser | int | `0` |  |
| upstream.initSysctl.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| upstream.initFs.enabled | bool | `true` |  |
| upstream.initFs.securityContext.privileged | bool | `false` |  |
| upstream.initFs.securityContext.runAsNonRoot | bool | `false` |  |
| upstream.initFs.securityContext.runAsUser | int | `0` |  |
| upstream.initFs.securityContext.runAsGroup | int | `0` |  |
| upstream.initFs.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| upstream.initFs.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.initFs.securityContext.capabilities.add[0] | string | `"CHOWN"` |  |
| upstream.initFs.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| upstream.prometheusExporter.enabled | bool | `false` |  |
| upstream.prometheusExporter.version | string | `"0.17.2"` |  |
| upstream.prometheusExporter.webBeanPort | int | `8000` |  |
| upstream.prometheusExporter.ceBeanPort | int | `8001` |  |
| upstream.prometheusExporter.config.rules[0].pattern | string | `".*"` |  |
| upstream.prometheusExporter.image | string | `"registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter:1.0.1"` |  |
| upstream.prometheusMonitoring.podMonitor.enabled | bool | `false` |  |
| upstream.prometheusMonitoring.podMonitor.interval | string | `"30s"` |  |
| upstream.plugins.install | list | `[]` |  |
| upstream.plugins.image | string | `"registry1.dso.mil/ironbank/sonarsource/sonarqube/sonarqube-community-build:25.1.0.102122-community"` |  |
| upstream.plugins.noCheckCertificate | bool | `false` |  |
| upstream.jvmOpts | string | `""` |  |
| upstream.jvmCeOpts | string | `""` |  |
| upstream.monitoringPasscode | string | `"define_it"` |  |
| upstream.env[0].name | string | `"JDK_JAVA_OPTIONS"` |  |
| upstream.env[0].value | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.annotations | object | `{}` |  |
| upstream.resources.limits.cpu | string | `"1000m"` |  |
| upstream.resources.limits.memory | string | `"6144M"` |  |
| upstream.resources.limits.ephemeral-storage | string | `"512000M"` |  |
| upstream.resources.requests.cpu | string | `"500m"` |  |
| upstream.resources.requests.memory | string | `"2048M"` |  |
| upstream.resources.requests.ephemeral-storage | string | `"1536M"` |  |
| upstream.persistence.enabled | bool | `false` |  |
| upstream.persistence.annotations | object | `{}` |  |
| upstream.persistence.storageClass | string | `nil` |  |
| upstream.persistence.accessMode | string | `"ReadWriteOnce"` |  |
| upstream.persistence.size | string | `"20Gi"` |  |
| upstream.persistence.uid | int | `1000` |  |
| upstream.persistence.guid | int | `0` |  |
| upstream.persistence.volumes | list | `[]` |  |
| upstream.persistence.mounts | list | `[]` |  |
| upstream.emptyDir | object | `{}` |  |
| upstream.sonarProperties."sonar.forceAuthentication" | bool | `true` |  |
| upstream.sonarProperties."sonar.ce.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.sonarProperties."sonar.search.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.sonarProperties."sonar.web.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.jdbcOverwrite.enabled | bool | `false` |  |
| upstream.jdbcOverwrite.jdbcUrl | string | `"jdbc:postgresql://myPostgress/myDatabase"` |  |
| upstream.jdbcOverwrite.jdbcUsername | string | `"sonarUser"` |  |
| upstream.jdbcOverwrite.jdbcPassword | string | `"sonarPass"` |  |
| upstream.podLabels | object | `{}` |  |
| upstream.sonarqubeFolder | string | `"/opt/sonarqube"` |  |
| upstream.tests.image | string | `"bitnami/minideb-extras"` |  |
| upstream.tests.enabled | bool | `false` |  |
| upstream.tests.resources | object | `{}` |  |
| upstream.serviceAccount.create | bool | `true` |  |
| upstream.serviceAccount.automountToken | bool | `false` |  |
| upstream.serviceAccount.annotations | object | `{}` |  |
| upstream.extraConfig.secrets | list | `[]` |  |
| upstream.extraConfig.configmaps | list | `[]` |  |
| upstream.terminationGracePeriodSeconds | int | `60` |  |
| curlContainerImage | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi9:9.6"` |  |
| domain | string | `"dev.bigbang.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.tempo.enabled | bool | `true` |  |
| istio.hardened.tempo.namespaces[0] | string | `"tempo"` |  |
| istio.hardened.tempo.principals[0] | string | `"cluster.local/ns/tempo/sa/tempo-tempo"` |  |
| istio.hardened.monitoring.enabled | bool | `true` |  |
| istio.hardened.monitoring.namespaces[0] | string | `"monitoring"` |  |
| istio.hardened.monitoring.principals[0] | string | `"cluster.local/ns/monitoring/sa/monitoring-grafana"` |  |
| istio.hardened.monitoring.principals[1] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-alertmanager"` |  |
| istio.hardened.monitoring.principals[2] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-operator"` |  |
| istio.hardened.monitoring.principals[3] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus"` |  |
| istio.hardened.monitoring.principals[4] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-state-metrics"` |  |
| istio.hardened.monitoring.principals[5] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-prometheus-node-exporter"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default argocd peer authentication |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| istio.sonarqube.enabled | bool | `true` |  |
| istio.sonarqube.annotations | object | `{}` |  |
| istio.sonarqube.labels | object | `{}` |  |
| istio.sonarqube.gateways[0] | string | `"istio-system/main"` |  |
| istio.sonarqube.hosts[0] | string | `"sonarqube.{{ .Values.domain }}"` |  |
| istio.injection | string | `"disabled"` |  |
| monitoring.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.egressHttps.enabled | bool | `true` |  |
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

