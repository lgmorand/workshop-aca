---
sectionid: lab1-cicd
sectionclass: h2
title: Continuous Deployment
parent-id: lab-1
---

Azure Container Apps allows you to use GitHub Actions to publish revisions to your container app. As commits are pushed to your GitHub repository, a GitHub Action workflow is triggered which updates the container image in the container registry. Once the container is updated in the registry, the workflow creates a new revision within Azure Container Apps based on the updated container image.

The GitHub action is triggered by commits to a specific branch in your repository. When creating the integration link, you can decide which branch triggers the action.

![Github Action](/media/lab1/githubactionflow.png)

## Setup your Github repository

In order to be able to setup your continuous deployment you'll need a GitHub account and a newly created repository. We made a public repository where you'll find the sources of the [Hello World container](https://github.com/mavilleg/azurecontainerapps-helloworld). [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and then clone this repository within your own environment.

Now that you have the source code you will be able to modify it and rebuild a container that will be pushed onto Azure Container Apps.

## Attach Github Actions to your container App

Now that you have a Repo to attach to your environment, you'll have to setup the correct rights on Azure to configure the continous deployment. When attaching a GitHub repository to your container apps, you need to provide a service principal context with the contributor role. The parameter that we will need to configure within the container app are the service principal's `tenantId`, `cliendId`, and `clientSecret`.

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

Once those values retrieved, you will have to [create an Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal) with `Basic` SKU, this will be use to host the newly created containers.

> This registry must have the *Admin User* enabled, or the integration with ACA won't work.

{% collapsible %}

Open your registry and under the `Access keys` panel, click on `Enabled` to enable the user admin. Or use:

``` bash
az acr update -n <acrName> --admin-enabled true
```

{% endcollapsible %}

Once configured, you can move forward by attaching your GitHub repo to the container app previously deployed.

![Continious Deployment Setup](/media/lab1/githubattach.png)

And use the credentials you previously generate for your service principal settings:

![SPN Setup](/media/lab1/githubattach2.png)

Once everything is in place you can see that a new folder `.github/workflows` has been added to your project. It hosts a YAML file that will allow the triggering of an automatic GitHub Action that will deploy any changes pushed onto the branch. It will also automatically setup some secrets on your application to store the admin's login to reach out to the Container Registry. We will see later in this lab how to manage those secrets.

![Secret ACR](/media/lab1/secretacr.png)

The `az containerapp github-action show` command returns the GitHub Actions configuration settings for a container app. It returns a JSON payload with the GitHub Actions integration configuration settings.

{% collapsible %}

``` bash
az containerapp github-action show \
  --resource-group <RESOURCE_GROUP_NAME> \
  --name <CONTAINER_APP_NAME>
```

{% endcollapsible %}

Let's test that out!

## Putting everything together

Open your project within VS Code (or your favorite IDE). You should see that the `.github/workflows` has been added. If it's not the case, synchronize the change that has been made onto the project (git pull request).

Now you can modify the source code of the Hello World container that we are using since the beginning. For example, you could change the text above the logo under the `index.html` file.

Once the change are commited you can go to your GitHub repos to see the GitHub Action occurring:

![Github Action process](/media/lab1/action.png)

As you can see, pushing the changes (commit) automatically triggered a GitHub Action workflow that built and deployed our new container into our registry and then on our container apps under a new revision. You can validate it by going under the revision management panel and see your newly provisioned revision.

![Github Action process](/media/lab1/revisionaction.png)

As you can see the revision is not loadbalanced yet, meaning that none of the traffic is routed to it. Supporting multiple revisions in Azure Container Apps allows you to manage the versioning and amount of traffic sent to each revision.

Once a part (or all) of the traffic is sent to your app, you can test that the newly version of your application is running correctly.

![Github Action process](/media/lab1/actionval.png)

All of this can be configured as needed. Indeed, you can change whether or not your container app supports multiple active revisions. The `activeRevisionsMode` property accepting two values:

- multiple: Configures the container app to allow more than one active revision.
- single: Automatically deactivates all other revisions when a revision is activated.

Enabling single mode makes it so that when you create a revision-scope change and a new revision is created, any other revisions are automatically deactivated.

You could also manage the different aspects of a revision using the [`az containerapp revision`](https://docs.microsoft.com/en-us/azure/container-apps/revisions-manage?tabs=bash#list) command.
