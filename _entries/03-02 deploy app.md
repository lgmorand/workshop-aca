---
sectionid: lab2-deploy
sectionclass: h2
title: Deploy the solution
parent-id: lab-2
---

### Deploying the app

The Red Dog application is based on containerized services and Azure PaaS services such as Storage accounts, Azure SQL Database, Redis, or CosmosDB.

![Micro-services architecture](/media/lab2/deploy/reddog_containerapps.png)

Start by [forking](https://github.com/Azure/reddog-containerapps/fork) the [dedicated repository (azure/reddog-containerapps)](https://github.com/Azure/reddog-containerapps) to have your copy on your GitHub account.

Once the repo has been forked, clone the repository on your local computer.

![Clone the repository](/media/lab2/deploy/clone-repo.png)

Browse the contents of the repository. The most interesting part is the "deploy/bicep" folder. Using Infrastructure as code and the Bicep technology, it is possible to deploy all the components in one command line, including the Azure Container Apps instance, the different PaaS services but also the containerized applications.

Be sure to [install Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/install) first.
Next, to deploy the full environment, go to the **deploy.sh** file and update the **subscription id**, then log in to Azure and execute the script in a terminal. 

{% collapsible %}

``` bash
. deploy.sh
```

![Deployment in progress](/media/lab2/deploy/deploy.png)

> Note: The installation should work smoothly. Deploying the full environment will take around 15 minutes (sometimes more). The provisionning of the Redis part is very long but you don't have to wait to move forward in the lab. If the deployment fails (display an error message), just run the script again, it's [idempotent](https://en.wikipedia.org/wiki/Idempotence). If you have warnings telling you that commands are not found, it probably means that the file's encoding (LF/CLRF) is incorrect for your system.

{% endcollapsible %}

Once the deployment is successful, open the Azure portal and notice the new resource group named *"reddog"* (or something else depending on how you change the variable in the script).

When you open it, you can see that all resources have been successfully created and deployed.

![The new resource group](/media/lab2/deploy/rg-reddog.png)
