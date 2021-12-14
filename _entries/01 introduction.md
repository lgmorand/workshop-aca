---
sectionid: intro
sectionclass: h1
title: Azure Containers Apps Workshop
type: nocount
is-parent: yes
---

Welcome to the Azure Containers Apps Workshop. In this lab, you'll go through tasks that will help you master the basic and more advanced topics required to deploy applications to Azure Containers Apps.

> The Azure Containers Apps is currently in public preview and several features/limitations may change between now and the general availabity.

[Azure Containers Apps](https://docs.microsoft.com/en-us/azure/container-apps) enables you to run microservices and containerized applications on a serverless platform. Common uses of Azure Container Apps include:

- Deploying API endpoints
- Hosting background processing applications
- Handling event-driven processing
- Running microservices

Applications built on Azure Container Apps can dynamically scale based on the following characteristics:

- HTTP traffic
- Event-driven processing
- CPU or memory load
- Any [KEDA-supported scaler](https://keda.sh/docs/2.4/scalers/)

![Example scenarios for Azure Container Apps](/media/intro/azure-container-apps-example-scenarios.png)

Azure Container Apps enables executing application code packaged in any container and is unopinionated about runtime or programming model. With Container Apps, you enjoy the benefits of running containers while leaving behind the concerns of managing cloud infrastructure and complex container orchestrators.

With Azure Container Apps, you can:

- [**Run multiple container revisions**](https://docs.microsoft.com/en-us/azure/container-apps/application-lifecycle-management) and manage the container app's application lifecycle.

- [**Autoscale**](https://docs.microsoft.com/en-us/azure/container-apps/scale-app) your apps based on any KEDA-supported scale trigger. Most applications can scale to zero<sup>1</sup>.

- [**Enable HTTPS ingress**](https://docs.microsoft.com/en-us/azure/container-apps/ingress) without having to manage other Azure infrastructure.

- [**Split traffic**](https://docs.microsoft.com/en-us/azure/container-apps/revisions) across multiple versions of an application for Blue/Green deployments and A/B testing scenarios.

- [**Use internal ingress and service discovery**](https://docs.microsoft.com/en-us/azure/container-apps/connect-apps) for secure internal-only endpoints with built-in DNS-based service discovery.

- [**Build microservices with Dapr**](https://docs.microsoft.com/en-us/azure/container-apps/microservices) and access its rich set of APIs.

- [**Run containers from any registry**](https://docs.microsoft.com/en-us/azure/container-apps/containers), public or private, including Docker Hub and Azure Container Registry (ACR).

- [**Use the Azure CLI extension or ARM templates**](https://docs.microsoft.com/en-us/azure/container-apps/get-started) to manage your applications.

- [**Securely manage secrets**](https://docs.microsoft.com/en-us/azure/container-apps/secure-app) directly in your application.

- [**View application logs**](https://docs.microsoft.com/en-us/azure/container-apps/monitor) using Azure Log Analytics.

<sup>1</sup> Applications that [scale on CPU or memory load](https://docs.microsoft.com/en-us/azure/container-apps/scale-app) can't scale to zero.
