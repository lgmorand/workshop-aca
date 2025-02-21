---
sectionid: prereq
sectionclass: h2
title: Prerequisites
parent-id: intro
---


### Prerequisites

To realize the workshop, you will require several components. If you don't have them yet, you'll be guided to acquire them.

- a [GitHub](https://github.com/) Account
- [VS Code](https://code.visualstudio.com/) or equivalent
- an [Azure](https://portal.azure.com/) subscription (and at least a dedicated resource group).
- if you plan to run command from your computer: installing [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and [Bicep](https://learn.microsoft.com/en-gb/azure/azure-resource-manager/bicep/install)

> Some [limits/quotas](https://docs.microsoft.com/en-us/azure/container-apps/quotas) are present for the moment. If you plan to play this workshop with a large group of individuals, you may require to create several subscriptions.

### Azure subscription

Log in to one of your Azure subscriptions.

{% collapsible %}

Please use your username and password to login to <https://portal.azure.com>.

Also, please authenticate your Azure CLI by running the command below on your machine and following the instructions.

``` bash
az login
az account show
```

> If you don't have the Azure CLI installed, read below how to install it or how to use Azure Cloud Shell

{% endcollapsible %}

### Tools

During this workshop you are going to use command line, but most of the actions may be doable using Azure Portal. In fact, during the different labs, you are going to use deliberately a mix of CLI and the Web portal to see the different ways to interact with Azure Container Apps. In real life, you will use whatever fits you the best.

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

Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli). (version **2.69** or superior)

##### Setup

Begin by signing in to Azure from the CLI. Run the following command, and follow the prompts to complete the authentication process.

``` bash
az login
```

Next, install the Azure Container Apps extension to the CLI.

``` bash
az extension add --name containerapp --upgrade
```

Once the extension is installed, register the `Microsoft.App` namespace.

``` bash
az provider register --namespace Microsoft.App
```

You can use the following command to check that the provider is properly registered. It can take few minutes for it to be marked as "registrered"

``` bash
az provider show -n Microsoft.App --query registrationState
```

Register the Microsoft.OperationalInsights provider for the [Azure Monitor Log Analytics Workspace](https://docs.microsoft.com/en-us/azure/container-apps/observability?tabs=bash#azure-monitor-log-analytics) if you have not used it before.

``` bash
az provider register --namespace Microsoft.OperationalInsights
```

And to follow the provider registration just run:

``` bash
az provider show -n Microsoft.OperationalInsights --query registrationState
```

#### GitHub

Some steps of this workshop require using a GitHub account. If you don't have one already, you can create one for free here: [https://github.com/join](https://github.com/join).
