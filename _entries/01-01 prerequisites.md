---
sectionid: prereq
sectionclass: h2
title: Prerequisites
parent-id: intro
---


### Prerequisites

In order to realize the workshop, you will require several components. If you don't have them yet, you'll be guided to acquire them.

- an Azure subscription
- an Azure Red Had Openshift cluster
- an Azure DevOps organization

### Azure subscription

{% collapsible %}

Please use your username and password to login to <https://portal.azure.com>.

Also please authenticate your Azure CLI by running the command below on your machine and following the instructions.

```
az account show
az login
```

{% endcollapsible %}

### Tools

#### Azure Cloud Shell

You can either run command lines from your own computer (we recommend using bash) or you can use the Azure Cloud Shell accessible at <https://shell.azure.com> once you login with an Azure subscription.

{% collapsible %}

Head over to <https://shell.azure.com> and sign in with your Azure Subscription details.

Select **Bash** as your shell.

![Select Bash](./media/intro/0-bash.png)

Select **Show advanced settings**

![Select show advanced settings](/media/intro/1-mountstorage-advanced.png)

Set the **Storage account** and **File share** names to your resource group name (all lowercase, without any special characters). Leave other settings unchanged, then hit **Create storage**

![Azure Cloud Shell](media/intro/2-storageaccount-fileshare.png)

You should now have access to the Azure Cloud Shell

![Set the storage account and fileshare names](/media/intro/3-cloudshell.png)

{% endcollapsible %}

#### Azure CLI

Install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
