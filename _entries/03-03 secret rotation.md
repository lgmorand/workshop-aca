---
sectionid: lab2-deploy
sectionclass: h2
title: Secret Rotation
parent-id: lab-2
---

One of the main concerns of the management of the lifecycle of an application is its secret/certificate management. Indeed, once in while you'll have to make rotation on your key/secret/certificate. Let's see how Azure Container Apps is handling that. 

## Find your secret

In the deployed reddog application, one of the container is using a secret to connect itself to a blob storage in order to post the receipts of the simulated customers. Find this storage account and rotate the secrets. 

{% collapsible %}
Go to the storage account, 
{% endcollapsible %}

To be sure that the key has been taken into account by the container app, let's delete the "receipts" container after rotating the key and recreate it as is. You can see that all the previous receipts has been deleted and that no more receipts are pushed onto this blob. 

Once this is done, retrive the newly created secret and give it to the app. 