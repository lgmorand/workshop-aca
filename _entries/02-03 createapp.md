---
sectionid: lab1-createapp
sectionclass: h2
title: Deploy an app
parent-id: lab-1
---


### Create your first app

Let's create and deploy your first hello-world application with the command `az containerapp create` which is documented [here](https://docs.microsoft.com/fr-fr/cli/azure/container). We will use a ready-to-use container image, the `mcr.microsoft.com/azuredocs/containerapps-helloworld:latest`.

> Use `az containerapp --help` to discover the different available parameters

Don't forget to set the parameter `--ingress` to `external` to make the container app available to public requests (exposed to the Internet). By adding the query parameter, you can format the result returned by the create command: `--query configuration.ingress.fqdn`

{% collapsible %}

``` bash
az containerapp create \
  --name my-container-app \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINERAPPS_ENVIRONMENT \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress 'external' \
  --query configuration.ingress.fqdn
```

In our case, the `create` command returns (only) the container app's fully qualified domain name because we specified the `query` parameter.

![Create an with the console](/media/lab1/create-app.png)

{% endcollapsible %}

Copy this location to a web browser to see the following message.

![Running app](/media/lab1/running-app.png)

Open the [Azure Portal](https://portal.azure.com). In your resource group, you should see your Containers apps environment but also your container app. Click on it.
From here, you can directly see, diagnose or reconfigure your application, such as changing the ingress configuration, the secrets, the load balancing, or the continuous deployment:

![App in Azure](/media/lab1/created-app-in-azure.png)

That's it! How simple is it to deploy and host an application!
