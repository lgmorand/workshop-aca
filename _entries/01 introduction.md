---
sectionid: intro
sectionclass: h1
title: Azure Red Hat OpenShift Workshop
type: nocount
is-parent: yes
---

[Azure Red Hat OpenShift](https://azure.microsoft.com/en-us/services/openshift/) is a fully managed Red Hat OpenShift service in Azure that is jointly engineered and supported by Microsoft and Red Hat. In this lab, you'll go through a set of tasks that will help you understand some of the concepts of deploying and securing container-based applications on top of Azure Red Hat OpenShift.

> **Note** This hands of lab is a fork from the [official ARO workshop](https://aroworkshop.io/) which helps to learn OpenShift and his main features, including the integrated CI/CD (S2I). This lab will be more focused on integrating Azure PaaS Services and also how to use OpenShift Platform when your company already has an existing software factory platform.

Some of the things you’ll be going through:

- Creating you own Azure Red Hat Openshift cluster
- Creating a [project](https://docs.openshift.com/aro/dev_guide/projects.html) on the Azure Red Hat OpenShift Web Console
- Using Azure DevOps to create a build pipeline to create and publish your container image
- Deploying a Todo-list application that uses CosmosDB as for external database service
- Exposing the web application frontend using [Routes](https://docs.openshift.com/aro/dev_guide/routes.html)
- Deploying an All-In-One application that uses Azure Files for [persistent storage](https://docs.openshift.com/aro/dev_guide/persistent_volumes.html) and which will demonstrate several features of OpenShift

You'll be doing the majority of the labs using the OpenShift CLI, but you can also accomplish them using the Azure Red Hat OpenShift web console.
