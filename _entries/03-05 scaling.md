---
sectionid: lab2-scaling
sectionclass: h2
title: Scalability
parent-id: lab-2
---

### Scalability

The scalability is an important part of the resiliency of an application. Your application should be able to handle an increase of the load with failing. In the cloud-native world, especially Kubernetes, scaling is done manually but can also be managed through autoscaling based on CPU/Memory usage by creation [Horizontal Pod Autoscaling (HPA)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) objects.

Azure Container Apps manages horizontal autoscaling through a set of declarative scaling rules to enrich the mechanism of HPA. By default, Azure Container Apps scale to zero and **pause billing when not in use**. As a Container App scales out, new instances of the Container App are created on-demand. Container Apps supports many scale triggers including HTTP and event-based triggers using Kubernetes Event-Driven Autoscaling (KEDA). KEDA is a rich autoscaler with many event scaler options continuously contributed by the community. For more information about supported scale triggers, see [KEDA Scalers](https://keda.sh/docs/scalers/).

The list of triggers to scale (in/out) a Container App are :

- CPU
- Memory
- HTTP requests
- Event-driver (any one supported by Keda)

#### Scale with Azure Container Apps

In Container Apps, scalability is managed through the revisions. Each revision contains scaliblity limits (min & max replicas) but can also contain rules to autoscale the application. To see the current number of replicas used by your Container App, open the Revision Management tab of the current active revision :

![Current scaling](/media/lab2/scale/current-scale.png)

In our case, the UI app has a min limit equals to 0, a max limit of 10, and no autoscaling rules.

> During the preview, the max numbers of replicas per revision is 25 but the Azure Web Portal only allows to specify 10 at the moment. Use the CLI if you need more than 10 replicas.

![UI Default scaling](/media/lab2/scale/ui-default-scaling.png)

Let's create a new revision with a new scaling rule. The revision should :

- have a suffix/name "autoscale"
- have a minimum limit of 1 replica
- have a maximum limit of 5 replicas
- have an HTTP autoscaling rule where the maximum of concurrent requests is equal to 1 (we want one replica per user)

{% collapsible %}

Open the UI Container App and the `Revision Management` tab. Click on `Create a new revision`. In the first page, specify a name suffix and click on the `Next` button.

In the scale part, configure the limits between 1 and 5 replicas.

![Define the limits](/media/lab2/scale/minmax.png)

Then add a rule with `HTTP Scaling` type and one concurrent request.

![Create a scaling rule](/media/lab2/scale/http-rule.png)

Click on the `Create` button, a new revision should be created with 100% of ingress sent to it :

![A new revision is created](/media/lab2/scale/ui-new-revision.png)

{% endcollapsible %}

Once done, your application should be ready to autoscale.

#### Overload our container

It's time to check that our container autoscales when users connect to it.

##### Install a load testing tool

The simpler way to load test our platform is to use a small command-line tool to simulate a large number of requests. You are going to use [Vegeta](https://github.com/tsenart/vegeta) but you can replace it by any other load testing tool if you prefer.

Start by installing the latest version of Vegeta

{% collapsible %}

``` bash
# download vegeta
curl -LO https://github.com/tsenart/vegeta/releases/download/v12.8.4/vegeta_12.8.4_linux_amd64.tar.gz

# unzip the app
tar -zxvf vegeta_12.8.4_linux_amd64.tar.gz

# move bin into /usr/bin
sudo mv ./vegeta /usr/bin/vegeta

# check the install
vegeta --version

```

{% endcollapsible %}

You need to create a file containing the endpoints to call. The endpoint is the exposed endpoint of the Reddog application which goes to the Traeffik app.

{% collapsible %}

Create a file named target.txt and copy the URL of your application.

``` txt
GET https://url-public-endpoint-of-reddog-app
```

{% endcollapsible %}

Then run Vegeta with the *attack* command. If no specific parameters are given, Vegeta will make 50 requests per second on the defined targets and will not stop until you stop it. You can also specify requests per sec and the duration with respective parameters rate and duration.

{% collapsible %}

Run the following command line and let Vegeta generating requests.

``` bash
vegeta attack -targets targets.txt -rate=20 and -duration=30s.
```

{% endcollapsible %}

After few seconds, check that the number of replicas of the UI Container App has increased.

{% collapsible %}

Open the `ui-autoscale` revision and in the Overview tab, check the number of current replicas

![Post load testing](/media/lab2/scale/after-load-testing.png)

{% endcollapsible %}

We can confirm that autoscaling created one replica per request (with around 20 requests in parallel), but the scaling out never went above five replicas due to the max limit defined in the revision.

Close Vegeta and any browser tab which displays the Reddog application, and within few minutes, you should be able to observe that UI container App scales down automatically to one replica because it is not overused anymore.
