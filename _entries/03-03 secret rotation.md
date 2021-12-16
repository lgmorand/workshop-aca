---
sectionid: lab2-deploy
sectionclass: h2
title: Secret Rotation
parent-id: lab-2
---

One of the main concerns of the management of the lifecycle of an application is its secret/certificate management. Indeed, once in while you'll have to make rotation on your key/secret/certificate. Let's see how Azure Container Apps is handling those action. 

## Manage your secret

In the deployed reddog application, the container `receipt-generation-service` is handling two secrets to connect itself to a service bus sending receipts that he is posting onto a storage account. 

 ![The receipt secret](/media/lab2/secretrotation1.png)

Every second, he is receiving a receipt that he is posting onto the blob `receits`. We will simulate the "automatic" rotation of the storage account access key.

To do so, go to the storage account in order to make the rotation both of the primary and the secondary keys. 

{% collapsible %}
Go to the storage account under the `Access key` blade in order to click rotate. 

![Rotation Key](/media/lab2/sarot.png)
{% endcollapsible %}

Once done you'll see that the blob is no longer receiving any receipts from our application. You can validate easily this by deleting the "Receipts" blob container and recreate it after a short period of time.

## Fetch the new secret

In order to set back the connection between the storage account and the `receipt-generation-service` you'll have to retrieve the new key and edit the value of the key `blob-storage-key`. 

{% collapsible %}
On the storage account under the `Access key` blade copy the key value. 
Then go to the `Secrets` blade of the container app panel in order to edit the old value of the key by the newly copied one. 

![Rotation Key](/media/lab2/sarot2.png)
![Rotation Key](/media/lab2/sarot3.png)

{% endcollapsible %} 

Note that this change is an application-scope change that won't recreate a revision. Having said that, the revision has to be restarted in order to propagate the new value of the key. This should be automatically done by saving the changes made to the key. However, if it's not the case you'll have to restart the revision using the CLI. 

{% collapsible %}
``` bash
az containerapp revision restart \
  --name <REVISION_NAME> \
  --app <APPLICATION_NAME> \
  --resource-group <RESOURCE_GROUP_NAME>
```
{% endcollapsible %} 

Now, if you get back to the `receipts` blob you should see all the receipts being received again. Note that you'll also see the receipt that occured during the rotation time because of the retention period of the service bus. This demonstrate also how a well developed application is essential to its resiliency and its fault tolerance. 