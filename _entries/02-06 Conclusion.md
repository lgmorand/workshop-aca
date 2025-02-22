---
sectionid: lab1-conclusion
sectionclass: h2
title: Conclusion
parent-id: lab-1
---

With this first lab you learned the main concepts of Azure container apps and its management.

In Azure Container Apps, individual container apps are deployed to a single Azure Container Apps environment, which acts as a secure boundary around groups of container apps. Container Apps in the same environment are deployed in the same virtual network and write logs to the same Log Analytics workspace.

Azure Container Apps manages the details of Kubernetes and container orchestrations for you. Containers in Azure Container Apps can use any runtime, programming language, or development stack of your choice.

The Azure Container Apps application lifecycle revolves around revisions. A revision being an immutable snapshot of a container app. When you deploy a container app, the first revision is automatically created. More revisions are created as containers change, or any adjustments are made to the configuration.

Let's move forward with a more complex scenario around the concepts revolving around Microservices Architecture.
