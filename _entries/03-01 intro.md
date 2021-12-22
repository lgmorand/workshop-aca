---
sectionid: lab2-intro
sectionclass: h2
title: Context
parent-id: lab-2
---

Now that you successfully deployed a simple application, let's see how Azure Containers Apps could help with more complex applications. You are going to deploy a full micro-services application named Red Dog. Microservice architectures allow you to independently develop, upgrade, version, and scale core areas of functionality in an overall system. Azure Container Apps provides the foundation for deploying microservices featuring:

- Independent scaling, versioning, and upgrades
- Service discovery
- Native Dapr integration

[Red Dog](https://github.com/azure/reddog-code) application is a simplified e-shop application with customers making orders and these orders being processed by workers. In parallel, orders, receipts, and accounting are stored in different persistent systems. The e-commerce platform does not contain any UI except a dashboard to monitor the orders.

![The Red Dog application](/media/lab2/intro/reddog_code.png)

> The application may seem complex but it's not and you won't have to fully understand it to finalize the workshop.

Here are the descriptions of the different components of the application.

| Service          | Description                                                                                                 |
|------------------|-------------------------------------------------------------------------------------------------------------|
| AccountingService | Service used to process, store and aggregate order data, transforming customer orders into meaningful sales metrics that can be showcased via the UI |
| Bootstrapper | A service that leverages Entity Framework Core Migrations to initialize the tables within Azure SQL DB based on the data model found in Reddog.AccountingModel |
| LoyaltyService | Manages the loyalty program by modifying customer reward points based on spend |
| MakeLineService | Responsible for simulating and coordinating a 'queue' of current orders. Monitors the processing and completion of each order in the 'queue' |
| OrderService | Basic CRUD API that is used to place and manage orders |
| ReceiptGenerationService | Archival program that generates and stores order receipts for auditing and historical purposes  |
| UI | Dashboard showcasing order/sales data related to a single hub location and/or for visibility across Hubs via the Corporate Dashboard in Hybrid scenario |
| VirtualCustomers | 'Customer simulation' program that simulates customers placing orders |
| VirtualWorker | 'Worker simulation' program that simulates the completion of customer orders |
| CorporateTransferService* | Azure Function responsible for monitoring order activity via RabbitMQ i.e. order placement and order completion within the context of a specific hub location and propagating these order activities to an Azure Service Bus for Corporate Hub consumption and visibility |
