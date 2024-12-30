# Sonarqube integration with Prometheus

Sonarqube does not have built-in support for a ```/metrics``` endpoint for Prometheus integration. A metrics exporter plugin is required.  

## Summary (Scenerio)

This Prometheus.md document is a quick guide on how to setup Prometheus montoring to scrape metrics from Sonarqube. These instructions have been written for running Big Bang on a dev-cluster (dev.bigbang.mil).  If you are in an airgapped environment these instructions can be used as guidance but may need to be altered.  

### Resources

- <https://docs.sonarsource.com/sonarqube/9.9/setup-and-upgrade/deploy-on-kubernetes/deploy-a-sonarqube-cluster-on-kubernetes/#monitoring>

## values.yaml

The below additional values need to be added to your existing values.yaml file in order for integrating the promethues exporter.

- Some sections will needed to be changed for your kubernetes cluster.

```yaml
monitoring:
  enabled: true
prometheusExporter:
  enabled: true
  version: "0.20.0"
  webBeanPort: 8000
  ceBeanPort: 8001
  config:
    rules:
    - pattern: ".*"
  image: registry1.dso.mil/ironbank/opensource/prometheus/jmx-exporter:0.20.0    
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
```

- Navigate to the Prometheus target page (<https://prometheus.dev.bigbang.mil/targets>) and validate that the Sonarqube target shows as up.

## Troubleshootig

- With monitoring enabled it takes Sonarqube about 15 to 20 minute to fully come up to ready.
- Kiali can be used to monitor istio policies for the monitoring and sonarqube namespaces.
