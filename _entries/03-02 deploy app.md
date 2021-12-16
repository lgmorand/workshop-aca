---
sectionid: lab2-deploy
sectionclass: h2
title: Deploy the application
parent-id: lab-2
---

### Deploying the app

The Red Dog application is based on containerized services and Azure PaaS services such as Storage accounts, Azure SQL Database, Redis or CosmosDB.

![Micro-services architecture](/media/lab2/reddog_containerapps.png)

Start by [forking](https://github.com/Azure/reddog-containerapps/fork) the [repo](https://github.com/Azure/reddog-containerapps) to have your own copy on your GitHub account.

Once the repo has been forked. Clone the repository on your local computer.

![Clone the repository](/media/lab2/clone-repo.png)

Browse the contents of the repository. The most interesting part is the "deploy/bicep" folder. Using Infrastructure as code and the Bicep technology, it is possible to deploy all the components in one command line, including the Azure Container Apps instance, the different PaaS services but also the containerized applications.

To deploy the full environment you just need to execute the script **run.sh**. To do so, open a terminal, log in to Azure and execute the script. Be sure to have [installed Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/install) first.

> Deploying the full environment will take up to 15 minutes. Feel free to play with the environment created in the first lab during this time.

{% collapsible %}

First, log to Azure and select the relevant subscription if required

``` bash
az login
```

{% endcollapsible %}

Then execute the script

{% collapsible %}

``` bash
. run.sh
```

![Deployment in progress](/media/lab2/warnings.png)

> Note: you may have some warning because the Azure Container Apps is still in preview and some ARM resources may not be fully declared. The installation should still work smoothly.

{% endcollapsible %}

Once the deployment is successful, open the Azure portal and notice the new resource group named *"reddog-**RANDOM_ID**"* such as *reddog-vl7cflbopmqhu*.

When you open it, you can see that all resources have been successfully provisioned:

![The new resource group](/media/lab2/rg-reddog.png)
