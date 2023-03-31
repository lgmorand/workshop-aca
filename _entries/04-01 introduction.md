---
sectionid: lab3-intro
sectionclass: h2
title: Context
parent-id: lab-3
---

As we seen, Azure Container Apps run in a context called an Environment. This environment is supported by a virtual network that is automatically generated when the resources are created. Generated VNETs are inaccessible to you as it is created in Microsoft's tenant. To take full control over this VNET you have to provide an existing VNET to Container Apps as you create your environment. In that case you'll have a new ingress configaration that is enabled: the accessibility level. Two different levels of accessibility are available:

- **External**: Container Apps environments deployed as external resources are available for public requests. External environments are deployed with a virtual IP on an external, public facing IP address.
- **Internal**: When set to internal, the environment has no public endpoint. Internal environments are deployed with a virtual IP (VIP) mapped to an internal IP address. The internal endpoint is an Azure internal load balancer (ILB) and IP addresses are issued from the custom VNET's list of private IP addresses.

> An environment variable CONTAINER_APP_ENV_DNS_SUFFIX is used to automatically resolve the FQDN suffix for your environment.

As you create a custom VNET, keep in mind the following situations:

- If you want your container app to restrict all outside access, create an internal Container Apps environment.
- When you provide your own VNET, the network needs a single subnet.
- Network addresses are assigned from a subnet range you define as the environment is created.
- You can define the subnet range used by the Container Apps environment.
- Once the environment is created, the subnet range is immutable.
- A single load balancer and single Kubernetes service are associated with each container apps environment.
- Each revision is assigned to an IP address in the subnet.
- You can restrict inbound requests to the environment exclusively to the VNET by deploying the environment as internal.

As you begin to design the network around your container app, refer to [Plan virtual networks](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-vnet-plan-design-arm) for important concerns surrounding running virtual networks on Azure.

![Revision soluce](/media/lab3/acavnet.png)

> When you deploy an internal or an external environment into your own network, a new resource group prefixed with MC_ is created in the Azure subscription where your environment is hosted. This resource group contains infrastructure components managed by the Azure Container Apps platform, and shouldn't be modified. The resource group contains Public IP addresses used specifically for outbound connectivity from your environment and a load balancer. As the load balancer is created in your subscription, there are extra costs associated with deploying the service to a custom virtual network.

### HTTP edge proxy behaviour

Azure Container Apps uses Envoy proxy as an edge HTTP proxy. TLS is terminated on the edge and requests are routed based on their traffic split rules and routes traffic to the correct application.

HTTP applications scale based on the number of HTTP requests and connections. Envoy routes internal traffic inside clusters. Downstream connections support HTTP1.1 and HTTP2 and Envoy automatically detects and upgrades the connection should the client connection be upgraded. Upstream connection is defined by setting the transport property on the ingress object.
