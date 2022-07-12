
A container app has access to different types of storage. A single app can take advantage of more than one type of storage if necessary.

| Storage type | Description | Usage examples |
|--|--|--|
| [Container file system](#container-file-system) | Temporary storage scoped to the local container | Writing a local app cache.  |
| [Temporary storage](#temporary-storage) | Temporary storage scoped to an individual replica | Sharing files between containers in a replica. For instance, the main app container can write log files that are processed by a sidecar container. |
| [Azure Files](#azure-files) | Permanent storage | Writing files to a file share to make data accessible by other systems. |

![Type of storage](/media/lab4/storage.png)

## Container file system

A container can write to its own file system.

Container file system storage has the following characteristics:

* The storage is temporary and disappears when the container is shut down or restarted.
* Files written to this storage are only visible to processes running in the current container.
* There are no capacity guarantees. The available storage depends on the amount of disk space available in the container.

## Temporary storage

You can mount an ephemeral volume that is equivalent to [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) in Kubernetes. Temporary storage is scoped to a single replica.

Temporary storage has the following characteristics:

* Files are persisted for the lifetime of the replica.
* If a container in a replica restarts, the files in the volume remain.
* Any containers in the replica can mount the same volume.
* A container can mount multiple temporary volumes.
* There are no capacity guarantees. The available storage depends on the amount of disk space available in the replica.

To configure temporary storage, first define an `EmptyDir` volume in the revision. Then define a volume mount in one or more containers in the revision.

### Configuration

When using temporary storage, you must use the Azure CLI with a YAML definition to create or update your container app. For example, you can use the sample hello-world which is deployed by default when creating an container environment (`mcr.microsoft.com/azuredocs/containerapps-helloworld:latest`).

To update an existing container app to use temporary storage, export your app's specification to a YAML file. You can use the command "az containerapp show" and the output parameter to extract a YAML definition.

{% collapsible %}

```azure-cli
az containerapp show -n <APP_NAME> -g <RESOURCE_GROUP_NAME> -o yaml > my-app.yaml
```

{% endcollapsible %}

Make the following changes to your container app specification. It uses the same format than [volumes for kubernetes](https://kubernetes.io/fr/docs/concepts/storage/volumes/)

{% collapsible %}

* Add a `volumes` array to the `template` section of your container app definition and define a volume.
* The `name` is an identifier for the volume. For instance, name it "myempty"
* Use `EmptyDir` as the `storageType`.
* For each container in the template that you want to mount temporary storage, add a `volumeMounts` array to the container definition and define a volume mount.
* The `volumeName` is the name defined in the `volumes` array.
* The `mountPath` is the path in the container to mount the volume.

```yaml
properties:
    managedEnvironmentId: /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.App/managedEnvironments/<ENVIRONMENT_NAME>
    configuration:
    activeRevisionsMode: Single
    template:
    containers:
    - image: mcr.microsoft.com/azuredocs/containerapps-helloworld:latest
        name: my-container
        volumeMounts:
        - mountPath: /myempty
        volumeName: myempty
    volumes:
    - name: myempty
        storageType: EmptyDir
```

{% endcollapsible %}

Once your new Yaml file is ready, update your container app using the YAML file.

```azure-cli
az containerapp update --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --yaml my-app.yaml
```

Connect to your container and check that a volume has been created. You can use the `az container exec` command to do so.

{% collapsible %}

```azure-cli
az containerapp exec --name <APP_NAME>  --resource-group <RESOURCE_GROUP_NAME>
```

![Browsing system files](/media/lab4/navigate.png)

{% endcollapsible %}

This example was fine for temporary usage but what if we want to persist our files ? Let's see how you can leverage Azure Files.

## Azure Files

A good way to persist files is to use a storage PaaS service. With Azure Container Apps, you can mount a file share from [Azure Files]((https://azure.microsoft.com/en-us/services/storage/files/)) as a volume inside a container.

Azure Files storage has the following characteristics:

* Files written under the mount location are persisted to the file share.
* Files in the share are available via the mount location.
* Multiple containers can mount the same file share, including ones that are in another replica, revision, or container app.
* All containers that mount the share can access files written by any other container or method.
* More than one Azure Files volume can be mounted in a single container.

To enable Azure Files storage in your container, you need to set up your container in the following ways:

* Create a storage definition of type `AzureFile` in the Container Apps environment. It is like a `storageclass` if you know kubernetes already.
* Define a storage volume in a revision.
* Define a volume mount in one or more containers in the revision.

### Configuration

When using Azure Files, you must use the Azure CLI with a YAML definition to create or update your container app.

Add a storage definition of type `AzureFile` to your Container Apps environment. You must use the command `az containerapp env storage`
  
{% collapsible %}

```azure-cli
az containerapp env storage set --name my-env --resource-group my-group \
    --storage-name mystorage \
    --azure-file-account-name <STORAGE_ACCOUNT_NAME> \
    --azure-file-account-key <STORAGE_ACCOUNT_KEY> \
    --azure-file-share-name <STORAGE_SHARE_NAME> \
    --access-mode ReadWrite
```

Replace `<STORAGE_ACCOUNT_NAME>` and `<STORAGE_ACCOUNT_KEY>` with the name and key of your storage account. Replace `<STORAGE_SHARE_NAME>` with the name of the file share in the storage account.

Valid values for `--access-mode` are `ReadWrite` and `ReadOnly`.

![Storage added to environment](/media/lab4/storage_added.png)

{% endcollapsible %}

Like in previous part, export the YAML configuration of your app using the `az containerapp show` command.

{% collapsible %}

```azure-cli
az containerapp show -n <APP_NAME> -g <RESOURCE_GROUP_NAME> -o yaml > my-app.yaml
```

{% endcollapsible %}

Make the following changes to your container app specification.

* Add a `volumes` array to the `template` section of your container app definition and define a volume.
* The `name` is an identifier for the volume.
* For `storageType`, use `AzureFile`.
* For `storageName`, use the name of the storage you defined in the environment.
* For each container in the template that you want to mount Azure Files storage, add a `volumeMounts` array to the container definition and define a volume mount.
* The `volumeName` is the name defined in the `volumes` array.
* The `mountPath` is the path in the container to mount the volume.

{% collapsible %}

```yaml
properties:
    managedEnvironmentId: /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.App/managedEnvironments/<ENVIRONMENT_NAME>
    configuration:
    template:
    containers:
    - image: <IMAGE_NAME>
        name: my-container
        volumeMounts:
        - volumeName: azure-files-volume
        mountPath: /my-files
    volumes:
    - name: azure-files-volume
        storageType: AzureFile
        storageName: mystorage
```

{% endcollapsible %}

Update your container app using the YAML file.

```azure-cli
az containerapp update --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> --yaml my-app.yaml
```

Once the command is applied, your container is restarted and a volume is mapped to it. Connect to your container (with the exec command), browse the file system and create a file on the volume.

{% collapsible %}

```azure-cli
az containerapp exec --name <APP_NAME> --resource-group <RESOURCE_GROUP_NAME> 
```

Once connected:

```bash
cd /
cd /my-files
touch myfile.txt
```

{% endcollapsible %}

Check directly in the Azure Portal that your file is indeed persisted in the Azure Files instance.

![File created](/media/lab4/filecreated.png)

That's it. How simple is it to provide persistent storage to your containerized application !

> Note that different type of storage give different performance results. Generally, Azure File Share is faster exept for large bunch of small files. If you are interested, read the great article of [Andre Dewes](https://techcommunity.microsoft.com/t5/fasttrack-for-azure/azure-container-apps-working-with-storage/ba-p/3561853).
