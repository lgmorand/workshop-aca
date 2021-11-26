---
sectionid: lab2-deploy
sectionclass: h2
title: Scenario context
parent-id: lab-3
---

### Provision an Azure Queue

You will start by creating a new Storage Account to contain a queue. Create a storage account name *stoacaworkshop*.

``` bash
az storage account create -n stoacaworkshop -g $RESOURCE_GROUP -l $LOCATION
```

Now that the Azure Storage account is created, you can create an Azure Queue named *demoqueue*.

``` bash
az storage queue create --name demoqueue --account-name stoacaworkshop
```



### Test the application

Since the application is (kinda) an API, you can test it by sending a POST request and see if a message is then posted in the queue.

``` bash
curl -X POST https://URL-OF-YOUR-APP/Data
```