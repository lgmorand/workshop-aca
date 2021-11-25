---
sectionid: intro
sectionclass: h1
title: Azure Containers Apps Workshop
type: nocount
is-parent: yes
---


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

- [**Run multiple container revisions**](application-lifecycle-management.md) and manage the container app's application lifecycle.

- [**Autoscale**](scale-app.md) your apps based on any KEDA-supported scale trigger. Most applications can scale to zero<sup>1</sup>.

- [**Enable HTTPS ingress**](ingress.md) without having to manage other Azure infrastructure.

- [**Split traffic**](revisions.md) across multiple versions of an application for Blue/Green deployments and A/B testing scenarios.

- [**Use internal ingress and service discovery**](connect-apps.md) for secure internal-only endpoints with built-in DNS-based service discovery.

- [**Build microservices with Dapr**](microservices.md) and access its rich set of APIs.

- [**Run containers from any registry**](containers.md), public or private, including Docker Hub and Azure Container Registry (ACR).

- [**Use the Azure CLI extension or ARM templates**](get-started.md) to manage your applications.

- [**Securely manage secrets**](secure-app.md) directly in your application.

- [**View application logs**](monitor.md) using Azure Log Analytics.

<sup>1</sup> Applications that [scale on CPU or memory load](scale-app.md) can't scale to zero.