---
sectionid: appoverview
sectionclass: h2
title: Application Overview
parent-id: lab-todoapp
---

You will be deploying a todo-list application on Azure Red Hat OpenShift. This application will use Azure CosmosDB as database.

In this lab, you'll learn how to build and publish a container from a software factory (here [Azure DevOps](https://azure.microsoft.com/en-s/services/devops/)) into OpenShift internal Registry. You have also the possibility to use an [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)

Then, during the (continuous) deployment, you'll use the methodology of Infra as Code, by using [ARM template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) to provision database at the same time than deploying the application.

![TODO-app architecture](media/lab1/archi.png)
