---
sectionid: lab3-privateapp
sectionclass: h2
title: Private Application
parent-id: lab-3
---

To demonstrate the private communication of Azure Container Apps we will use a simple demonstrator composed of two container app environments communicating in private over your network architecture.

 ![Architecture](/media/lab3/architecture.png)

**Backend service:**
The backend environment hosts the [helloer](https://github.com/zlatko-ms/helloer) application, a simple nodejs app that responds to HTTP requests. The environment is injected in a specific subnet and connected to a Log Analytics workspace in order to provide diagnostic settings and log centralization.

The application exposes an ingress through the environment ingress static IP. In order to reach your application ingress, the caller application have to use the ingress FQDN. Indeed, the Container Apps environment has a single public IP address for applications with external ingress visibility, and a single internal IP address for applications with internal ingress visibility. 

Therefore, all applications within a Container Apps environment with external ingress visibility share a single public IP address. Similarly, all applications within a Container Apps environment with internal ingress visibility share a single internal IP address. HTTP traffic is routed to individual applications based on the FQDN in the host header. You can get access to the environment's unique identifier by querying the environment settings.

> Reaching the ILB behind the ingress with the IP address will not work as the hostname is used to route the traffic to the correct application within the environment. We need to set up a private DNS zone with a wildcard ('*') A record pointing to the environment ingress static IP. The wildcard is justified by the fact that a given environment can have several applications, each with its own ingress, served from the same Internal Load Balancer.

**Client service:**
The client environment hosts the [greeter](https://github.com/zlatko-ms/pgreeter) application, a python script that performs periodical HTTP GET requests to the backend. The environment is injected in a specific subnet and connected to the same Log Analytics workspace to provide diagnostic settings and log centralization.

This Greeter application does not provide any ingress, so there is no need to set up a DNS zone for this environment.

Start by [forking](https://github.com/Azure/reddog-containerapps/fork) the [dedicated repository (zlatko-ms/az-capps-private)](https://github.com/zlatko-ms/az-capps-private) to have your copy on your GitHub account.

Once the repo has been forked, clone the repository on your local computer.

Browse the contents of the repository. The `main.bicep` is providing the definitions of the demonstrator and using specific modules to deploy the underlying infrastructure services (container app environements, container apps, DNS private zone, Log Analytics etc.) :

- **VNET Definition:** The network infrastructure is defined by the two variables located in `main.bicep`. If necessary update the ranges in order to fit your Azure environment constraints. The implementation of the VNet and underlying subnets is performed by the dedicated `vnet.bicep` module. The network module outputs the identifiers of the created Vnet as well as of the subnets that will be required to wire up the VNet injection and the DNS zone.

- **Container Apps Environments:** The container apps environments are implemented in the `caenv.bicep`. The VNet injection is set up by providing the adequate subnet id to the environment module as illustrated in the `main.bicep` for the caenv-backend. A similar assignation is provided for the caenv-client environment at `main.bicep`. The environment is attached to the Log Analytics workspace by setting up the Log Analytics Client Id and shared key. For sake of "technical clarity" we used the output of the law module to get the keys. **In a production environment you should consider storing the secrets in a secured storage such an Azure Key Vault**.

- **Private DNS for Backend Service:** In order to set up the DNS zone we'll need the VNet Id, the environment domain as well as the environment static IP assigned on creation time. The domain name is provided by the backend service application environment as an output, assigned from `main.bicep` and used in the dedicated `caenvdns.bicep` module. The static IP is used to set up the `wildcar A record` in, assigned from `main.bicep` and used in `caenvdns.bicep`. The VNet is provided as the output of the `vnet.bicep` module, assigned from `main.bicep` and used in the `caenvdns.bicep` module.

- **Applications:** The Container Apps are defined in `main.bicep` and realized by the dedicated `ca.bicep` module. The helloer application ingress definition can be found in `main.bicep` while the greeter has no ingress. The greeter application requires the URL to hit to be provided as a `GREETER_URL` environment variable. The value of the url is computed at `main.bicep` and assigned at `main.bicep`

> Note that the subnet address ranges can't overlap with the following reserved ranges:
> - 169.254.0.0/16
> - 172.30.0.0/16
> - 172.31.0.0/16
> - 192.0.2.0/24)

## Deploying the new applications

To deploy the full environment, you need to execute the **make** command on the `src/bicep` repository.

{% collapsible %}

To deploy the project with default values for the resource group name and region simply issue the following commands:

``` bash
cd src/bicep
make
```

If you want to customize the location or the resource group name you can use the following:

``` bash
cd src/bicep
make stackName=<my-resource-group-name> location=<my-azure-region>
```

{% endcollapsible %}

Once deployed you'll see 3 differents resource group. One containing your appication resources:

![Architecture](/media/lab3/basicrg.png)

 But also the two MC_ resource groups containing the infrastructure components managed by the Azure Container Apps platform and that shouldn't be modified. As you can see those resource groups hosts the Kubernetes component that host the container app services.

![Architecture](/media/lab3/mcrg.png)

## Testing the application

To validate that the two container apps are communicating together correctly, go to the log stream panel. On the greeter application you should see the application awaking every 10 second and colling the helloer application:

![Architecture](/media/lab3/greeterlogstream.png)

On the helloer log stream you're seeing the incoming request from the greeter.

![Architecture](/media/lab3/helloerlogstream.png)

As you can see the trace is showing that the helloer is receiving a greeting *rcv hello request* and is answering to the client over its private IP *sent response to client from 10.5.64.132*. It indicates the request is addressed from a client with IP 10.5.64.132, i.e. the request origins from the subnet-caenv-infra-client (10.5.64.0/20) where the caenv-client has been injected.
