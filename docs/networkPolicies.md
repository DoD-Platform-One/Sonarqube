Harbor (like many other BigBang components) allows you to specify additional network controls through values provided to the chart.

In order to deliver additional NetworkPolicy controls with your BigBang sonarqube deployment, first enable networkPolicies for BigBang generally:

```
networkPolicies:
  enabled: true
```

Now you can add additional NetworkPolicies to your sonarqube addon configuration through the `addons.sonarqube.values.networkPolicies.additionalPolicies` key:

```
addons:
  sonarqube:
    values:
      networkPolicies:
        additionalPolicies:
        - name: this-is-an-egress-control
          spec:
            podSelector: {}
            policyTypes:
            - Egress
            egress:
            - to:
              - ipBlock:
                  cidr: 172.20.0.0/12
        - name: this-is-an-ingress-control
          spec:
            podSelector: {}
            policyTypes:
            - Ingress
            ingress:
            - from:
              - ipBlock:
                  cidr: 172.20.0.0/12
```

For more information on Kubernetes NetworkPolicy objects, see [the upstream docs](https://kubernetes.io/docs/concepts/services-networking/network-policies/). For more information on BigBang Network controls generally, see the BigBang documentation.
