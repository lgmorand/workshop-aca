---
sectionid: create-env
sectionclass: h2
title: Create an environment
parent-id: lab-1
---

### Create an environment

Before deploying your containerized application, you need a "place" to host your application. In Azure Container Apps, the underlying infrastructure is called an `environment`. An environment creates a secure boundary around a group of container apps. Container Apps deployed in the same environment are deployed in the same virtual network and write logs to the same *Log Analytics* workspace.

**Azure Log Analytics** is used to monitor your container app and is required when creating an Azure Container Apps environment.

Let's start by setting some variables:

``` bash
RESOURCE_GROUP="rg-my-container-apps"
LOCATION="northeurope"
LOG_ANALYTICS_WORKSPACE="my-container-apps-logs"
CONTAINERAPPS_ENVIRONMENT="my-environment"
```

- **RESOURCE_GROUP**: the Azure resource group which will contain your container apps environment
- **LOCATION**: the Azure region in which will be deployed your apps. Be careful, Azure Container Apps is not supported in all regions yet.
- **LOG_ANALYTICS_WORKSPACE**: the name of the logs analytics workspace
- **CONTAINERAPPS_ENVIRONMENT**: the name of the **container apps** environment.

With these variables defined, you can create a resource group to organize the services related to your new container app.

{% collapsible %}

```  bash
az group create --name $RESOURCE_GROUP --location "$LOCATION"
```

{% endcollapsible %}

Create a new *Log Analytics workspace* with the following command:

{% collapsible %}

```azurecli
az monitor log-analytics workspace create --resource-group $RESOURCE_GROUP --workspace-name $LOG_ANALYTICS_WORKSPACE
```

{% endcollapsible %}

Next, retrieve the Log Analytics Client ID and client secret and put them in variables (LOG_ANALYTICS_WORKSPACE_CLIENT_ID and LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET)

{% collapsible %}

#### Bash

Make sure to run each query separately to give enough time for the request to complete.

```bash
LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv`
```

```bash
LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=`az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv`
```

#### PowerShell

Make sure to run each query separately to give enough time for the request to complete.

```powershell
$LOG_ANALYTICS_WORKSPACE_CLIENT_ID=(az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv)
```

```powershell
$LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=(az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE --out tsv)
```

{% endcollapsible %}

#### Azure Container Apps environment

Individual container apps are deployed to an Azure Container Apps environment. To create the `environment`, run the following command:

```azurecli
az containerapp env create \
--name $CONTAINERAPPS_ENVIRONMENT \
--resource-group $RESOURCE_GROUP \
--logs-workspace-id $LOG_ANALYTICS_WORKSPACE_CLIENT_ID \
--logs-workspace-key $LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET \
--location "$LOCATION"
```

> You may receive an error message telling that features are not allowed for this subscription. It means that the service Azure Container Apps is not available for the selected region.

Once the environment is created, it is time to deploy applications.
