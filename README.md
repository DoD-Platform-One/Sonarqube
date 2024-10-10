<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# sonarqube

![Version: 10.6.1-bb.2](https://img.shields.io/badge/Version-10.6.1--bb.2-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 10.6.0](https://img.shields.io/badge/AppVersion-10.6.0-informational?style=flat-square)

SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code. As a core element of our Sonar solution, SonarQube integrates into your existing workflow and detects issues in your code to help you perform continuous code inspections of your projects. The tool analyses 30+ different programming languages and integrates into your CI pipeline and DevOps platform to ensure that your code meets high-quality standards.

## Upstream References
* <https://www.sonarqube.org/>

* <https://github.com/SonarSource/helm-chart-sonarqube>
* <https://github.com/SonarSource/docker-sonarqube>
* <https://github.com/SonarSource/sonarqube>

### Upstream Release Notes

* [Find our upstream chart's CHANGELOG here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-8.0.6-sonarqube-dce-7.0.6/charts/sonarqube-dce/CHANGELOG.md)
* [and our upstream application release notes here](https://github.com/SonarSource/helm-chart-sonarqube/blob/sonarqube-8.0.6-sonarqube-dce-7.0.6/charts/sonarqube-dce/README.md)

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Kubernetes: `>= 1.24.0-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install sonarqube chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| deploymentType | string | `"StatefulSet"` |  |
| replicaCount | int | `1` |  |
| revisionHistoryLimit | int | `10` |  |
| deploymentStrategy | object | `{}` |  |
| OpenShift.enabled | bool | `false` |  |
| OpenShift.createSCC | bool | `true` |  |
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
| edition | string | `"community"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/big-bang/sonarqube-10"` |  |
| image.tag | string | `"10.6.0-community"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.pullSecrets[0].name | string | `"private-registry"` |  |
| securityContext.fsGroup | int | `1000` |  |
| securityContext.runAsUser | int | `1000` |  |
| securityContext.runAsGroup | int | `1000` |  |
| containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| containerSecurityContext.runAsNonRoot | bool | `true` |  |
| containerSecurityContext.runAsUser | int | `1000` |  |
| containerSecurityContext.runAsGroup | int | `1000` |  |
| containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| elasticsearch.configureNode | bool | `false` |  |
| elasticsearch.bootstrapChecks | bool | `true` |  |
| nginx.enabled | bool | `false` |  |
| service.type | string | `"ClusterIP"` |  |
| service.externalPort | int | `9000` |  |
| service.internalPort | int | `9000` |  |
| service.labels | string | `nil` |  |
| service.annotations | object | `{}` |  |
| networkPolicy.enabled | bool | `false` |  |
| networkPolicy.prometheusNamespace | string | `"monitoring"` |  |
| sonarWebContext | string | `""` |  |
| ingress-nginx.enabled | bool | `false` |  |
| ingress.enabled | bool | `false` |  |
| ingress.hosts[0].name | string | `"sonarqube.your-org.com"` |  |
| ingress.annotations | object | `{}` |  |
| ingress.tls | list | `[]` |  |
| route.enabled | bool | `false` |  |
| route.host | string | `""` |  |
| route.tls.termination | string | `"edge"` |  |
| route.annotations | object | `{}` |  |
| affinity | object | `{}` |  |
| tolerations | list | `[]` |  |
| nodeSelector | object | `{}` |  |
| hostAliases | list | `[]` |  |
| readinessProbe.exec.command[0] | string | `"sh"` |  |
| readinessProbe.exec.command[1] | string | `"-c"` |  |
| readinessProbe.exec.command[2] | string | `"#!/bin/bash\n# A Sonarqube container is considered ready if the status is UP, DB_MIGRATION_NEEDED or DB_MIGRATION_RUNNING\n# status about migration are added to prevent the node to be kill while sonarqube is upgrading the database.\nif curl -s http://localhost:{{ .Values.service.internalPort }}{{ .Values.readinessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/status \| grep -q -e '\"status\":\"UP\"' -e '\"status\":\"DB_MIGRATION_NEEDED\"' -e '\"status\":\"DB_MIGRATION_RUNNING\"'; then\n  exit 0\nfi\nexit 1\n"` |  |
| readinessProbe.initialDelaySeconds | int | `60` |  |
| readinessProbe.periodSeconds | int | `30` |  |
| readinessProbe.failureThreshold | int | `6` |  |
| readinessProbe.timeoutSeconds | int | `90` |  |
| livenessProbe.exec.command[0] | string | `"sh"` |  |
| livenessProbe.exec.command[1] | string | `"-c"` |  |
| livenessProbe.exec.command[2] | string | `"curl --silent --fail --output /dev/null --max-time {{ .Values.livenessProbe.timeoutSeconds \| default 1 }} --header \"X-Sonar-Passcode: $SONAR_WEB_SYSTEMPASSCODE\" \"http://localhost:{{ .Values.service.internalPort }}{{ .Values.livenessProbe.sonarWebContext \| default (include \"sonarqube.webcontext\" .) }}api/system/liveness\"\n"` |  |
| livenessProbe.initialDelaySeconds | int | `60` |  |
| livenessProbe.periodSeconds | int | `30` |  |
| livenessProbe.failureThreshold | int | `6` |  |
| livenessProbe.timeoutSeconds | int | `1` |  |
| startupProbe.initialDelaySeconds | int | `30` |  |
| startupProbe.periodSeconds | int | `10` |  |
| startupProbe.failureThreshold | int | `24` |  |
| startupProbe.timeoutSeconds | int | `1` |  |
| initContainers.image | string | `"registry1.dso.mil/ironbank/big-bang/base:2.1.0"` |  |
| initContainers.allowPrivilegeEscalation | bool | `false` |  |
| initContainers.runAsNonRoot | bool | `true` |  |
| initContainers.runAsUser | int | `1000` |  |
| initContainers.runAsGroup | int | `0` |  |
| initContainers.seccompProfile.type | string | `"RuntimeDefault"` |  |
| initContainers.capabilities.drop[0] | string | `"ALL"` |  |
| initContainers.resources.limits.memory | string | `"300Mi"` |  |
| initContainers.resources.limits.cpu | string | `"50m"` |  |
| initContainers.resources.requests.memory | string | `"300Mi"` |  |
| initContainers.resources.requests.cpu | string | `"50m"` |  |
| initContainers.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| extraInitContainers | object | `{}` |  |
| extraContainers | list | `[]` |  |
| waitForDb.image | string | `"registry1.dso.mil/ironbank/opensource/postgres/postgresql12:12.19"` |  |
| caCerts.enabled | bool | `false` |  |
| initSysctl.enabled | bool | `false` |  |
| initSysctl.vmMaxMapCount | int | `524288` |  |
| initSysctl.fsFileMax | int | `131072` |  |
| initSysctl.nofile | int | `131072` |  |
| initSysctl.nproc | int | `8192` |  |
| initSysctl.securityContext.privileged | bool | `true` |  |
| initSysctl.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| initSysctl.securityContext.runAsUser | int | `0` |  |
| initFs.enabled | bool | `false` |  |
| initFs.securityContext.privileged | bool | `false` |  |
| initFs.securityContext.runAsNonRoot | bool | `false` |  |
| initFs.securityContext.runAsUser | int | `0` |  |
| initFs.securityContext.runAsGroup | int | `0` |  |
| initFs.securityContext.seccompProfile.type | string | `"RuntimeDefault"` |  |
| initFs.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| initFs.securityContext.capabilities.add[0] | string | `"CHOWN"` |  |
| prometheusExporter.enabled | bool | `false` |  |
| prometheusExporter.version | string | `"0.17.2"` |  |
| prometheusExporter.webBeanPort | int | `8000` |  |
| prometheusExporter.ceBeanPort | int | `8001` |  |
| prometheusExporter.config.rules[0].pattern | string | `".*"` |  |
| prometheusExporter.image | string | `"registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter:0.17.2"` |  |
| prometheusMonitoring.podMonitor.enabled | bool | `false` |  |
| prometheusMonitoring.podMonitor.interval | string | `"30s"` |  |
| plugins.install | list | `[]` |  |
| plugins.image | string | `"registry1.dso.mil/ironbank/big-bang/sonarqube-10:10.6.0-community"` |  |
| plugins.noCheckCertificate | bool | `false` |  |
| jvmOpts | string | `""` |  |
| jvmCeOpts | string | `""` |  |
| monitoringPasscode | string | `"define_it"` |  |
| env[0].name | string | `"JDK_JAVA_OPTIONS"` |  |
| env[0].value | string | `"-Dcom.redhat.fips=false"` |  |
| annotations | object | `{}` |  |
| resources.limits.cpu | string | `"1000m"` |  |
| resources.limits.memory | string | `"6144M"` |  |
| resources.limits.ephemeral-storage | string | `"512000M"` |  |
| resources.requests.cpu | string | `"500m"` |  |
| resources.requests.memory | string | `"2048M"` |  |
| resources.requests.ephemeral-storage | string | `"1536M"` |  |
| persistence.enabled | bool | `false` |  |
| persistence.annotations | object | `{}` |  |
| persistence.storageClass | string | `nil` |  |
| persistence.accessMode | string | `"ReadWriteOnce"` |  |
| persistence.size | string | `"20Gi"` |  |
| persistence.uid | int | `1000` |  |
| persistence.guid | int | `0` |  |
| persistence.volumes | list | `[]` |  |
| persistence.mounts | list | `[]` |  |
| emptyDir | object | `{}` |  |
| sonarProperties."sonar.forceAuthentication" | bool | `true` |  |
| sonarProperties."sonar.ce.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| sonarProperties."sonar.search.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| sonarProperties."sonar.web.javaAdditionalOpts" | string | `"-Dcom.redhat.fips=false"` |  |
| jdbcOverwrite.enable | bool | `false` |  |
| jdbcOverwrite.jdbcUsername | string | `"sonarUser"` |  |
| jdbcOverwrite.jdbcPassword | string | `"sonarPass"` |  |
| postgresql.enabled | bool | `true` |  |
| postgresql.postgresqlUsername | string | `"sonarUser"` |  |
| postgresql.postgresqlPassword | string | `"sonarPass"` |  |
| postgresql.postgresqlDatabase | string | `"sonarDB"` |  |
| postgresql.service.port | int | `5432` |  |
| postgresql.resources.limits.cpu | string | `"100m"` |  |
| postgresql.resources.limits.memory | string | `"200Mi"` |  |
| postgresql.resources.requests.cpu | string | `"100m"` |  |
| postgresql.resources.requests.memory | string | `"200Mi"` |  |
| postgresql.image.registry | string | `"registry1.dso.mil"` |  |
| postgresql.image.repository | string | `"ironbank/opensource/postgres/postgresql12"` |  |
| postgresql.image.tag | string | `"12.19"` |  |
| postgresql.image.pullSecrets[0] | string | `"private-registry"` |  |
| postgresql.postgresqlConfiguration.listen_addresses | string | `"*"` |  |
| postgresql.pgHbaConfiguration | string | `"local all all md5\nhost all all all md5"` |  |
| postgresql.persistence.enabled | bool | `true` |  |
| postgresql.persistence.accessMode | string | `"ReadWriteOnce"` |  |
| postgresql.persistence.size | string | `"20Gi"` |  |
| postgresql.persistence.storageClass | string | `nil` |  |
| postgresql.persistence.mountPath | string | `"/var/lib/postgresql"` |  |
| postgresql.postgresqlDataDir | string | `"/var/lib/postgresql/data"` |  |
| postgresql.volumePermissions.enabled | bool | `false` |  |
| postgresql.serviceAccount.enabled | bool | `true` |  |
| postgresql.serviceAccount.automountServiceAccountToken | bool | `false` |  |
| postgresql.securityContext.enabled | bool | `true` |  |
| postgresql.securityContext.fsGroup | int | `26` |  |
| postgresql.securityContext.runAsUser | int | `26` |  |
| postgresql.securityContext.runAsGroup | int | `26` |  |
| postgresql.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| podLabels | object | `{}` |  |
| sonarqubeFolder | string | `"/opt/sonarqube"` |  |
| tests.image | string | `"bitnami/minideb-extras"` |  |
| tests.enabled | bool | `false` |  |
| tests.resources | object | `{}` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.automountToken | bool | `false` |  |
| serviceAccount.annotations | object | `{}` |  |
| extraConfig.secrets | list | `[]` |  |
| extraConfig.configmaps | list | `[]` |  |
| terminationGracePeriodSeconds | int | `60` |  |
| curlContainerImage | string | `"registry1.dso.mil/bigbang-ci/devops-tester:1.1.1"` |  |
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
| bbtests.cypress.envs.cypress_password | string | `"new_admin_password"` |  |
| bbtests.cypress.envs.cypress_timeout | string | `"10000"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

