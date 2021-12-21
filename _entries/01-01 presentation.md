---
sectionid: discover
sectionclass: h2
title: Discover
parent-id: intro
---

[Azure Containers Apps](https://docs.microsoft.com/en-us/azure/container-apps)is a new serverless container platform for applications that need to scale on demand in response to HTTPS requests, events, or simply run as always-on services or background job processing without managing VMs, orchestrators, or other cloud infrastructure. Azure Container Apps makes it easy to manage your containerized applications with built-in autoscaling, traffic routing, application lifecycle management, and service-to-service communication in a fully managed environment.

While App Service, Functions, and Logic Apps provide application developers with fully-managed, high-productivity solutions for domain-specific problems, customers have to drop out of the fully-managed world and fall back to Kubernetes for full microservice applications or to run general purpose container applications. Azure container Apps fills this gap and rounds out the Azure application platform by providing high-level APIs for the most common container application scenarios, including auto-scaling, version management, application upgrades, and service-to-service communication in a fully managed environment.

Common uses for Azure Container Apps include:

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
