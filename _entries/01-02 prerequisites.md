---
sectionid: prereq
sectionclass: h2
title: Prerequisites
parent-id: intro
---


### Prerequisites

In order to realize the workshop, you will require several components. If you don't have them yet, you'll be guided to acquire them.

- an Azure subscription (one per user*)
- a GitHub Account
- VS Code or equivalent
- a brain

### Azure subscription

Log in to one of your Azure subscriptions.

{% collapsible %}

Please use your username and password to login to <https://portal.azure.com>.

Also, please authenticate your Azure CLI by running the command below on your machine and following the instructions.

``` bash
az account show
az login
```

{% endcollapsible %}

\* Some [limits/quotas](https://docs.microsoft.com/en-us/azure/container-apps/quotas) are present during the public preview. For instance, this workshop require two Azure Container Apps environments and there is a limit of 2 env per subscription.

| Feature | Quantity |
|---|---|
| Environments | 2 |
| Container apps per environment | 20 |
| Replicas per container app | 25 |
| Cores per replica | 2 |
| Cores per environment | 50 |

### Tools

During this workshop you are going to use command line, but most of the actions may be doable using Azure Portal. Nevertheless, since the feature is in preview, the portal may not be up to date to allow all commands or parameters.

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

Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli). (version 2.30 or superior)

##### Setup

Begin by signing in to Azure from the CLI. Run the following command, and follow the prompts to complete the authentication process.

``` csharp
az login
```

Next, install the Azure Container Apps extension to the CLI.

``` csharp
az extension add  --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.0-py2.py3-none-any.whl 
```

Now that the extension is installed, register the `Microsoft.Web` namespace.

``` csharp
az provider register --namespace Microsoft.Web
```

#### GitHub

Some steps of this workshop require using a GitHub account. If you don't have one already, you can create one for free here: [https://github.com/join](https://github.com/join).
