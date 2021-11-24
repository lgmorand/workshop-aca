---
sectionid: concepts
sectionclass: h2
title: Basic concepts
parent-id: intro
---

Here are some interesting concepts around Openshift. Some of them will not be covered in the lab. 

### Source-To-Image (S2I)

Source-to-Image (S2I) is a toolkit and workflow for building reproducible container images from source code. S2I produces ready-to-run images by injecting source code into a container image and letting the container prepare that source code for execution. By creating self-assembling builder images, you can version and control your build environments exactly like you use container images to version your runtime environments.
**You'll not use S2I in this workshop because you will rely on an external software factory: Azure DevOps.**

### Routes

An OpenShift `Route` exposes a service at a host name, like www.example.com, so that external clients can reach it by name. When a `Route` object is created on OpenShift, it gets picked up by the built-in HAProxy load balancer in order to expose the requested service and make it externally available with the given configuration. You might be familiar with the Kubernetes `Ingress` object and might already be asking "what's the difference?". Red Hat created the concept of `Route` in order to fill this need and then contributed the design principles behind this to the community; which heavily influenced the `Ingress` design.  Though a `Route` does have some additional features as can be seen in the chart below.

![routes vs ingress](/media/concept/routes-vs-ingress.png)

> **NOTE:** DNS resolution for a host name is handled separately from routing; your administrator may have configured a cloud domain that will always correctly resolve to the router, or if using an unrelated host name you may need to modify its DNS records independently to resolve to the router.

Also of note is that an individual route can override some defaults by providing specific configurations in its annotations.  See here for more details: [https://docs.openshift.com/dedicated/architecture/networking/routes.html#route-specific-annotations](https://docs.openshift.com/dedicated/architecture/networking/routes.html#route-specific-annotations)

### Secrets

Kubernetes Secrets let you store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys. Storing confidential information in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image. A Secret is an object that contains a small amount of sensitive data such as a password, a token, or a key. Such information might otherwise be put in a Pod specification or in an image. Users can create secrets and the system also creates some secrets.

### Azure Key vault

Azure Key Vault is a tool for securely storing and accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. A vault is a logical group of secrets.

### Azure DevOps

Azure DevOps provides developer services to support teams to plan work, collaborate on code development, and build and deploy applications. Developers can work in the cloud using Azure DevOps Services or on-premises using Azure DevOps Server. Azure DevOps Server was formerly named Visual Studio Team Foundation Server (TFS).

Azure DevOps provides integrated features that you can access through your web browser or IDE client. You can use one or more of the following services based on your business needs:

* Azure Repos provides Git repositories or Team Foundation Version Control (TFVC) for source control of your code
* Azure Pipelines provides build and release services to support continuous integration and delivery of your apps
* Azure Boards delivers a suite of Agile tools to support planning and tracking work, code defects, and issues using Kanban and Scrum methods
* Azure Test Plans provides several tools to test your apps, including manual/exploratory testing and continuous testing
* Azure Artifacts allows teams to share Maven, npm, and NuGet packages from public and private sources and integrate package sharing into your CI/CD pipelines

### Infrastructure as code

Infrastructure as code (IaC) is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.
