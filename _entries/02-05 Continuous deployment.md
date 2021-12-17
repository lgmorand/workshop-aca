---
sectionid: lab1-cicd
sectionclass: h2
title: Continuous Deployment
parent-id: lab-1
---

Azure Container Apps allows you to use GitHub Actions to publish revisions to your container app. As commits are pushed to your GitHub repository, a GitHub Action is triggered which updates the container image in the container registry. Once the container is updated in the registry, Azure Container Apps creates a new revision based on the updated container image.

The GitHub action is triggered by commits to a specific branch in your repository. When creating the integration link, you decide which branch triggers the action.

![Github Action](/media/lab1/githubactionflow.png)

## Setup your Github repository

In order to be able to setup your continuous deployment you'll need a github account and a newly created repository. We made a public repository where you'll find the sources of the [Hello World container](https://github.com/mavilleg/azurecontainerapps-helloworld). [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and then clone this repository within your own environment.

Now that you have the source code you will be able to modify the code and rebuild a contianer that will be pushed onto Azure ContainerApp.

## Attach Github Actions to your container App

Now that you have a repos to attach to your environment, you'll have to setup the correct rights on Azure to configure the continous deployment. The first time you attach GitHub Actions to your container app, you need to provide a service principal context with the contributor role. The parameter that we will need to configure within the container app are the service principal's `tenantId`, `cliendId`, and `clientSecret`.

{% collapsible %}

``` bash
az ad sp create-for-rbac \
  --name <SERVICE_PRINCIPAL_NAME> \
  --role "contributor" \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME> \
  --sdk-auth
  ```

  The return value from this command is a JSON payload, which includes the service principal's `tenantId`, `cliendId`, and `clientSecret`.
  {% endcollapsible %}

Once those values retrieve you'll have to [create](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal#:~:text=%20Quickstart%3A%20Create%20an%20Azure%20container%20registry%20using,must%20log%20in%20to%20the%20registry...%20More%20) an Azure container registry being able to host the newly created containers.

> This registry has to have the Admin User enabled for this to work.

{% collapsible %}
Open your registry and under the `Access keys` panel, click on `Enabled` to enable the user admin. Or use:

``` bash
az acr update -n <acrName> --admin-enabled true
```

{% endcollapsible %}

Once this is configured you can move forward by attaching your GitHub repo to the revision.

![Github Action](/media/lab1/githubattach.png)

The `az containerapp github-action show` command returns the GitHub Actions configuration settings for a container app. It returns a JSON payload with the GitHub Actions integration configuration settings.

{% collapsible %}

``` bash
az containerapp github-action show \
  --resource-group <RESOURCE_GROUP_NAME> \
  --name <CONTAINER_APP_NAME>
```

{% endcollapsible %}

Once everything is in place you can see that a new folder `.github/workflows` has been added to your project. It host a yaml file that will allow the triggering of an automatic GitHub Action tht will deploy any changes pushed onto the branch. It will also automatically setup some secrets on your application in order to store the Admin logon to reach out to the Container Registry. We will see later on this lab how to manage those secrets.

![Secret ACR](/media/lab1/secretacr.png)

Let's test that out!

## Putting everything together

Open your project within VS Code. You should see that the `.github/workflows` has been added. If it's not the case synchronyze the change that has been made onto the project (git pull request).

Now you can modify the source code of the Hello World container that we're using since the begining. For example, you could change the text above the ACA logo under the `index.html` file.

Once the change commited you can go to your GitHub repos to see the action occuring :

![Github Action process](/media/lab1/action.png)

As you can see, the push of the changes (commit) automaticaly triggered an GitHub Action workflow that built and deployed our new container into our registry and then our container apps. You can test it out by going under the revision management panel and see your newly provisionned revision.

![Github Action process](/media/lab1/revisionaction.png)

As you can see the revision is not loadbalanced yet meaning that none of the traffic is routed to it. Supporting multiple revisions in Azure Container Apps allows you to manage the versioning and amount of traffic sent to each revision.

Once the some (or all) of the traffic is sent to your app you can test that the newly version of your application is running correctly.

![Github Action process](/media/lab1/actionval.png)

Thuse can be configure. Indeed, you can change whether or not your container app supports multiple active revisions. The `activeRevisionsMode`property accepts two values:

- multiple: Configures the container app to allow more than one active revision.
- single: Automatically deactivates all other revisions when a revision is activated.

Enabling single mode makes it so that when you create a revision-scope change and a new revision is created, any other revisions are automatically deactivated.

You could also manage the different aspect of a revision using the [`az containerapp revision`](https://docs.microsoft.com/en-us/azure/container-apps/revisions-manage?tabs=bash#list)
