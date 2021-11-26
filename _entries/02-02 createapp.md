---
sectionid: lab1-create
sectionclass: h2
title: Create app
parent-id: lab-1
---


### Create your first app

Let's create and deploy your first hello-world application with the command `az containerapp create`. You can use a ready container image `mcr.microsoft.com/azuredocs/containerapps-helloworld:latest`.

Don't forget to set the parameter `--ingress` to `external` to make the container app available to public requests (exposed to Internet). By adding, the query parameter, you can format the result returned by the create command: `--query configuration.ingress.fqdn`

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

Here, the `create` command returns the container app's fully qualified domain name.

![Create an with the console](/media/lab1/create-app.png)

Copy this location to a web browser and you'll see the following message.

![Running app](/media/lab1/running-app.png)

Now, open the Azure Portal. In your resource group, you should see your Containers apps environment but also your container app. Click on it.
From here, you can directly see, diagnose or reconfigure your application such as changing the ingress configuration, the secrets, the load balancing or the continuous deployment:

![App in Azure](/media/lab1/created-app-in-azure.png)
