# Network Policies

This chart is configured to use [bb-common](https://repo1.dso.mil/big-bang/product/packages/bb-common) to provide network policy configuration. The network policy for this repository is configured in [values.yaml](../chart/values.yaml#L270). Additionally, there is a [network-policies.yaml](../chart/templates/bigbang/network-policies.yaml) template which renders bb-common configuration.

For additional configuration please refer to the [bb-common Network Policies documentation](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/network-policies/README.md).
