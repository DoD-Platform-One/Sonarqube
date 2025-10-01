# SAML Keycloak integration for Sonarqube

[Upstream Sonarqube Docs](https://docs.sonarqube.org/latest/instance-administration/delegated-auth/#header-4)

## Resources to setup keycloak-dev on a dev-cluster

1. You will need a K8s development environment with two Gateway resources configured. One for passthrough and the other for public. Use the `k3d-dev.sh` script with the `-a` flag to deploy a dev cluster with MetalLB. See the keycloak [Cluster Setup](https://repo1.dso.mil/big-bang/product/packages/keycloak/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md?ref_type=heads#cluster-setup) documentation for detailed instructions.
2. Deploy Bigbang to the cluster using the [Deploy Bigbang](https://repo1.dso.mil/big-bang/product/packages/keycloak/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md?ref_type=heads#deploy-bigbang) documentation as a reference. You will need to make an override file for Sonarqube that points to your branch.

    ```yaml
    # ./overrides/sonarqube-sso-override.yaml
    sso:
      saml:
        # Required for Sonarqube (or other SAML apps) SSO to work, must update after keycloak is deployed and run a helm upgrade
        # Fill this in with the result from `curl https://your.keycloak.url/auth/realms/baby-yoda/protocol/saml/descriptor ; echo`
        metadata: ''
    addons:
      sonarqube:
        enabled: true
        sso:
          enabled: true
        git:
          tag: null
          branch: "your-branch-name"
        values:
          upstream:
            sonarProperties:
                sonar.core.serverBaseURL: "https://your.sonarqube.url/" 
                #sonar.auth.saml.enabled: ""
                #sonar.auth.saml.applicationId: ""
                #sonar.auth.saml.providerName: ""
                #sonar.auth.saml.providerId: ""
                #sonar.auth.saml.loginUrl: ""
                #sonar.auth.saml.certificate.secured: ""
                #sonar.auth.saml.user.login: ""
                #sonar.auth.saml.user.name: ""
                #sonar.auth.saml.user.email: ""
                #sonar.auth.saml.group.name: ""

      keycloak:
        enabled: true
        git:
          branch: main
    ```

3. Deploy Bigbang with the appropriate override files. Be sure to include overrides the `keycloak` repo as well as your `sonarqube` override. If you followed the instructions from step 2, your registry credentials will be set using the following command.

    ```bash
    REGISTRY_USERNAME=your_registry_username
    REGISTRY_PASSWORD=your_registry_password
    helm upgrade -i bigbang ./bigbang/chart -n bigbang --create-namespace \
    --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
    -f ./bigbang/tests/test-values.yaml \
    -f ./bigbang/chart/ingress-certs.yaml \
    -f ./keycloak/docs/dev-overrides/minimal.yaml \
    -f ./keycloak/docs/dev-overrides/keycloak-testing.yaml \
    -f ./overrides/sonarqube-sso-override.yaml 
    ```

4. Check to see that keycloak has deployed successfully

    ```bash
    kubectl get helmrelease keycloak -n bigbang
    ```

    The output should show `READY` as `True`

    ```console
    NAME       AGE   READY   STATUS
    keycloak   12m   True    Helm install succeeded for release keycloak/keycloak.v1 with chart keycloak@2.5.1-bb.5
    ```

5. Once keycloak is deployed, you will need to obtain parameters to use in the SSO metadata parameter of `./overrides/sonarqube-sso-override.yaml`

    ```bash
    # Obtain metadata
    curl https://your.keycloak.url/auth/realms/baby-yoda/protocol/saml/descriptor ; echo
    ```

    Copy the output of this command and update `sso.saml.metadata` in `./overrides/sonarqube-sso-override.yaml`. Make sure the output is wrapped in single quotes to ensure it is YAML friendly.

    ```yaml
      # ./overrides/sonarqube-sso-override.yaml
      sso:
        saml:
          # Required for Sonarqube (or other SAML apps) SSO to work, must update after keycloak is deployed and run a helm upgrade
          # Fill this in with the result from `curl https://your.keycloak.url/auth/realms/baby-yoda/protocol/saml/descriptor ; echo`
          metadata: '<md:EntityDescriptor xmlns=....'
    ```

6. Repeat step 3 to and deploy Bigbang with the new SSO parameter

    ```bash
    REGISTRY_USERNAME=your_registry_username
    REGISTRY_PASSWORD=your_registry_password
    helm upgrade -i bigbang ./bigbang/chart -n bigbang --create-namespace \
    --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
    -f ./bigbang/tests/test-values.yaml \
    -f ./bigbang/chart/ingress-certs.yaml \
    -f ./keycloak/docs/dev-overrides/minimal.yaml \
    -f ./keycloak/docs/dev-overrides/keycloak-testing.yaml \
    -f ./overrides/sonarqube-sso-override.yaml 
    ```

## Create the SAML Client in Keycloak

Sonarqube supports SAML authentication natively. It is possible to use OIDC by installing a third party plugin, which is outside the scope of this guide.

There are two configuration methods detailed in this guide.

**[Automated Method](#automated-method-configure-saml-in-sonarqube)**: Settings are obtained from keycloak, and added to an override file and deployed via Helm

**[Manual Method](#manual-method-configure-saml-in-sonarqube)**: Settings are obtained from keycloak, and entered into Sonarqube manually

Official [Sonarqube Keycloak How-to](https://docs.sonarsource.com/sonarqube-server/latest/instance-administration/authentication/saml/how-to-set-up-keycloak/)

## Obtain P1 Settings from Keycloak

When deploying keycloak, the `baby-yoda` realm and a client for Sonarqube will automatically be created.

1. Log in to Keycloak. The username is `admin` and the password can be found using this command

    ```bash
    kubectl get secret -n keycloak keycloak-env -o jsonpath='{.data.KEYCLOAK_ADMIN_PASSWORD}' | base64 -d
    ```

    There may be a trailing `%` character after decoding, which should be ignored.

2. After logging in, you should be in the "DoD Platform One (baby-yoda)" realm. To confirm this, click the drop down menu on the top left of the page, and select "DoD Platform One"

3. Next you want to navigate to "Realm Settings" and click on the "Keys" tab. There will be a key generated with the "RS256" algorithm. In this row, you will see a blue button that is labeled "Certificate". Click the button and copy the Certificate value into a local text editor since you will need this later for configuring Sonarqube.

4. In the side menu, click "clients" and then search for "sonarqube". Click on the result and take note of the following settings (save these for use in a future step):
    - **clientId**
    - **validRedirectURI** (the first result should be OK, however it should closely match your sonarqube FQDN)

5. Additional settings can be found on the "clientScopes" tab. Default values will be included in this document, but you can understand these values by checking the [Sonarqube Keycloak How-to](https://docs.sonarsource.com/sonarqube-server/latest/instance-administration/authentication/saml/how-to-set-up-keycloak/) documentation.

## (Automated Method) Configure SAML in Sonarqube

You will use the settings captured above and update `./overrides/sonarqube-sso-override.yaml` with these settings:

```yaml
addons:
  sonarqube:
      enabled: true
      sso:
        enabled: true
      values:
        upstream:
          sonarProperties:
            # The base URL of the sonarqube server
            sonar.core.serverBaseURL: "https://your.sonarqube.url"  
            # enabling saml authentication 
            sonar.auth.saml.enabled: true
            # The client ID of the Sonarqube client in Keycloak
            sonar.auth.saml.applicationId: "your_sonarqube_clientId_from_keycloak"
            # SSO login button label 
            sonar.auth.saml.providerName: "Keycloak SSO"
            #  You will find this in Keycloak in Realm Settings > General > Endpoints. Click on SAML 2.0 Identify Provider Metadata to obtain the XML configuration file. Search for the value 'EntityDescriptor > entityID'
            sonar.auth.saml.providerId: "https://your.keycloak.url/auth/realms/baby-yoda"
            # This can be found in the Endpoint SAML metadata as `SingleSignOnService`
            sonar.auth.saml.loginUrl: "https://your.keycloak.url/auth/realms/baby-yoda/protocol/saml"
            # This is the RS256 key copied from Keycloak The value you get from ***Realm Settings > Keys > RS256.*** Click on Certificate.
            sonar.auth.saml.certificate.secured: ""
            # These are set to the SAML attributes defined in "clientScopes
            sonar.auth.saml.user.login: "login"
            sonar.auth.saml.user.name: "name"
            sonar.auth.saml.user.email: "email"
            sonar.auth.saml.group.name: "groups"
          account:
            currentAdminPassword: admin

```

Once the values are updated, run `helm` again with the previous deployment steps to apply the settings. Once sonarqube is redeployed, you can navigate to the [Logging in to Sonarqube using Keycloak SSO](#logging-in-to-sonarqube-using-keycloak-sso) section of this document.

## (Manual Method) Configure SAML in Sonarqube

Getting the Sonarqube admin password. The username is `admin`

```bash
kubectl get secret -n sonarqube sonarqube-sonarqube-admin-password --template={{.data.password}} | base64 -d
```

There may be a trailing `%` character after decoding, which should be ignored.

1. Log in to Sonarqube. Go to Administration > Configuration > Authentication. Click "SAML" then click the "Create configuration" button.
2. On the next screen, input the following parameters:

    - **Application ID**: Set this to the `clientId` value that was captured from Keycloak
    - **Provider Name**: Set this to the identity provider name of your choice. `Keycloak` is fine
    - **Provider ID**: Typically `https://your.keycloak.url/auth/realms/baby-yoda` You will find this in Keycloak in Realm Settings > General > Endpoints. Click on SAML 2.0 Identify Provider Metadata to obtain the XML configuration file. Search for the value of `EntityDescriptor > entityID` Copy and paste the contents into this box
    - **SAML login url**: Typically `https://your.keycloak.url/auth/realms/baby-yoda/protocol/saml`. This can also be found in the XML of the Provider ID value as `SingleSignOnService`
    - **Identity provider certificate**: The certificate that was captured in step 3 of `Obtain P1 Settings from Keycloak`
    - **SAML user login attribute**: This can be set to `login`
    - **SAML user name attribute**: This can be set to `name`
    - **SAML user email attribute**: This can be set to `email`
    - **SAML user group attribute**: This can be set to `groups`
    - **Sign requests**: This can be left off
    - **Service provider private key**: This can be left blank
    - **Service provider certificate**: This can be left blank

    Click "Save Configuration".

3. In the next screen click "Test Configuration" and a new tab will pop up and prompt you to create an account. After creating the account you may not receive a confirmation email, but this can be bypassed in Keycloak.

4. Navigate to Keycloak in the browser. Ensure you are in the "DoD Platform One" realm, and click "users" in the left navigation bar. Click on the account you just created, and ensure the "emailVerified" slider is switched on. If you used your CAC to sign up, this may already be verified.

5. Click on the "groups" tab. Ensure your account is added to "Impact Level 2 Authorized"

6. Navigate back to Sonarqube. Go to Administration > Configuration > Authentication. Click the "Enable configuration" button, and SAML authentication via Keycloak will now be enabled.

## Logging in to Sonarqube using Keycloak SSO

1. If you are currently log in as `admin` in Sonarqube, Click the account icon in the upper right corner of the page, and then click "Log out"

2. Navigate to Sonarqube and click "Log in with SSO". Use the credentials on the account you just created, and you should be logged in to Sonarqube as a user.

# Alternative configurations

This section details how to manually configure components in Keycloak

## Create a new client in Keycloak

1. In the menu bar, click "Clients", then click the "Create client" button.

    - **Client type**: SAML
    - **Client ID**: A unique value such as `sonarqube`  *(required)*
    - **Name**: A display name such as `Sonarqube`
    - **Description**: A description of the client. `Sonarqube SAML client` is an appropriate default value
    - **Always display in UI**: This can be left `off` or `on` depending on your preference

    Click "Next" to proceed.

2. On the Login Settings page, set the following values:
    - **Root URL**: This can be left blank
    - **Home URL**: This can be left blank
    - **Valid redirect URIs**: This should be set to `https://<your.sonarqube.url>/oauth2/callback/saml*`
    - **Valid post logout redirect URIs**: Set this to `+`
    - **IDP-Initiated SSO URL name**: This can be left blank
    - **IDP Initiated SSO Relay State**: This can be left blank
    - **Master SAML Processing URL**: This can be left blank

## Configure the new client in Keycloak

1. In the menu bar, click "Clients" then click the `sonarqube` client that you created
2. Click on the "Client scopes" tab and then click the `sonarqube-dedicated` client scope
3. Click "Configure a new mapper". In the next window, select "User property" and configure the following settings:

    - **Mapper Type**: User Property
    - **Name**: Set this to `Login`
    - **Property**: Set this to  `username`
    - **Friendly Name**: This can be left blank
    - **SAML Attribute Name**: Set this to `login`
    - **SAML Attribute NameFormat**: Leave this set to `Basic`
  
    Click "Save"

4. In the breadcrumb navigation bar, click "Dedicated scopes", then click "Add mapper" and select "By configuration". In the next window select "User Property" and configure the following settings:

    - **Mapper Type**: User Property
    - **Name**: Set this to `Name`
    - **Property**: Set this to  `username`
    - **Friendly Name**: This can be left blank
    - **SAML Attribute Name**: Set this to `name`
    - **SAML Attribute NameFormat**: Leave this set to `Basic`

    Click "Save"

5. In the breadcrumb navigation bar, click "Dedicated scopes", then click "Add mapper" and select "By configuration". In the next window select "User Property" and configure the following settings:

    - **Mapper Type**: User Property
    - **Name**: Set this to `Email`
    - **Property**: Set this to  `email`
    - **Friendly Name**: This can be left blank
    - **SAML Attribute Name**: Set this to `email`
    - **SAML Attribute NameFormat**: Leave this set to `Basic`

6. In Realm Settings > General > Endpoints, click on SAML 2.0 Identify Provider Metadata to obtain the XML configuration file from Keycloak.

If required, additional group parameters can be configured by following the [Sonarqube keycloak how-to](https://docs.sonarsource.com/sonarqube-server/latest/instance-administration/authentication/saml/how-to-set-up-keycloak/) documentation.
