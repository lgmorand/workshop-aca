---
sectionid: prereq
sectionclass: h2
title: Prerequisites
parent-id: intro
---


### Prerequisites

To realize the workshop, you will require several components. If you don't have them yet, you'll be guided to acquire them.

- a GitHub Account
- VS Code or equivalent
- an Azure subscription (and at least a dedicated resource group).

> Some [limits/quotas](https://docs.microsoft.com/en-us/azure/container-apps/quotas) are present for the moment. If you plan to play this workshop in group, you may require to create several subscriptions.

### Azure subscription

Log in to one of your Azure subscriptions.

{% collapsible %}

Please use your username and password to login to <https://portal.azure.com>.

Also, please authenticate your Azure CLI by running the command below on your machine and following the instructions.

``` bash
az login
az account show
```

{% endcollapsible %}

| Feature | Quantity |
|---|---|
| Environments | 2 |
| Container apps per environment | 20 |
| Replicas per container app | 25 |
| Cores per replica | 2 |
| Cores per environment | 50 |

### Tools

During this workshop you are going to use command line, but most of the actions may be doable using Azure Portal. 

#### Azure Cloud Shell

You can either run command lines from your own computer (we recommend using bash) or you can use the Azure Cloud Shell accessible at <https://shell.azure.com> once you log in with an Azure subscription.

{% collapsible %}

Head over to <https://shell.azure.com> and sign in with your Azure Subscription details.

Select **Bash** as your shell.

![Select Bash](/media/intro/0-bash.png)

Select **Show advanced settings**

![Select show advanced settings](/media/intro/1-mountstorage-advanced.png)

Set the **Storage account** and **File share** names to your resource group name (all lowercase, without any special characters). Leave other settings unchanged, then hit **Create storage**

![Azure Cloud Shell](/media/intro/2-storageaccount-fileshare.png)

You should now have access to the Azure Cloud Shell

![Set the storage account and fileshare names](/media/intro/3-cloudshell.png)

{% endcollapsible %}

#### Azure CLI

Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli). (version **2.34** or superior)

##### Setup

Begin by signing in to Azure from the CLI. Run the following command, and follow the prompts to complete the authentication process.

``` csharp
az login
```

Next, install the Azure Container Apps extension to the CLI.

``` csharp
az extension add --name containerapp --upgrade
```

Once the extension is installed, register the `Microsoft.App` namespace.

``` csharp
az provider register --namespace Microsoft.App
```

You can use the following command to check that the provider is properly registered

``` csharp
az provider show -n Microsoft.App
```

Register the Microsoft.OperationalInsights provider for the [Azure Monitor Log Analytics Workspace](https://docs.microsoft.com/en-us/azure/container-apps/observability?tabs=bash#azure-monitor-log-analytics) if you have not used it before.

``` csharp
az provider register --namespace Microsoft.OperationalInsights
```

#### GitHub

Some steps of this workshop require using a GitHub account. If you don't have one already, you can create one for free here: [https://github.com/join](https://github.com/join).
