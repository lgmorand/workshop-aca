---
sectionid: lab2-rotation
sectionclass: h2
title: Secret Rotation
parent-id: lab-2
---

One of the main concerns of the management of the lifecycle of an application is its secret/certificate management. Indeed, once in while you'll have to make rotation on your key/secret/certificate for security reason (leak or just good pratice). Let's see how secrets management in done with Azure Container Apps.

Azure Container Apps allows your application to securely store sensitive configuration values. Once defined at the application level, secured values are available to containers, inside scale rules, and via Dapr.

- Secrets are scoped to an application, outside of any specific revision of an application.
- Adding, removing, or changing secrets does not generate new revisions.
- Each application revision can reference one or more secrets.
- Multiple revisions can reference the same secret(s).

### Manage your secret

In the deployed Reddog application, the container `receipt-generation-service` has two secrets to connect itself to a service bus sending receipts that he is posting onto a storage account.

 ![The receipt secret](/media/lab2/rotation/secretrotation.png)

Every second, it receives a receipt which is then saved into the blob storage account `receipts`. We will simulate a rotation of the storage account access key.

To do so, go to the storage account in order to make the rotation of both primary and secondary keys.

{% collapsible %}

Go to the storage account under the `Access key` blade in and click the `Rotate keys` button.

![Rotation Key](/media/lab2/rotation/sarot.png)

{% endcollapsible %}

Once done you'll see that the blob storage is no longer receiving any receipts from our application. You can validate easily this by deleting the "Receipts" blob container and recreate it after few seconds (Azure may display an error message, just retry after few seconds). The blob container should remain empty because the application does not have the rights any more to write new receipts.

#### Fetch the new secret

In order to set back the connection between the storage account and the `receipt-generation-service` you'll have to retrieve the new key and edit the value of the key `blob-storage-key`.

{% collapsible %}

On the storage account under the `Access key` blade copy the key value.
Then go to the `Secrets` blade of the container app panel in order to edit the old value of the key by the newly copied one.

![Rotation Key](/media/lab2/rotation/sarot3.png)

{% endcollapsible %}

> Note that this change is an application-scope change that won't recreate a revision. Having said that, the revision has to be restarted (or a new one has to be deployed) in order to propagate the new value of the key. This should be automatically done by saving the changes made to the key. However, if it's not the case you'll have to restart the revision using the CLI.

{% collapsible %}

``` bash
az containerapp revision restart \
  --name <REVISION_NAME> \
  --app <APPLICATION_NAME> \
  --resource-group <RESOURCE_GROUP_NAME>
```

{% endcollapsible %}

Now, if you get back to the `receipts` blob you should see all the receipts being received again. Note that you'll also see the receipt that occured during the rotation time because of the retention period of the service bus. This demonstrate also how a well developed application is essential to its resiliency and its fault tolerance.
