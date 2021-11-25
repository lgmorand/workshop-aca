---
sectionid: lab1-create
sectionclass: h2
title: Create app
parent-id: lab-1
---


### Create your first app


```
az containerapp create \
  --name my-container-app \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINERAPPS_ENVIRONMENT \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress 'external' \
  --query configuration.ingress.fqdn
```

By setting `--ingress` to `external`, you make the container app available to public requests.

Here, the `create` command returns the container app's fully qualified domain name.

![Create an with the console](/media/lab1/create-app.png)

Copy this location to a web browser and you'll see the following message.

![Running app](/media/lab1/running-app.png)