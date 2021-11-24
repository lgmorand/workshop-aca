---
sectionid: lab2-logging
sectionclass: h2
title: Logging and Metrics
parent-id: lab-clusterapp
---

Assuming you can access the application via the Route provided and are still logged into the CLI (please go back to part 2 if you need to do any of those) we'll start to use this application.  As stated earlier, this application will allow you to "push the buttons" of OpenShift and see how it works.  We will do this to test the logs.

Click on the *Home* menu item and then click in the message box for "Log Message (stdout)" and write any message you want to output to the *stdout* stream.  You can try "**All is well!**".  Then click "Send Message".

![Logging stdout](/media/lab2/8-ostoy-stdout.png)

Click in the message box for "Log Message (stderr)" and write any message you want to output to the *stderr* stream. You can try "**Oh no! Error!**".  Then click "Send Message".

![Logging stderr](/media/lab2/9-ostoy-stderr.png)

### View logs directly from the pod

{% collapsible %}

Go to the CLI and enter the following command to retrieve the name of your frontend pod which we will use to view the pod logs:

```sh
$ oc get pods -o name
pod/ostoy-frontend-679cb85695-5cn7x
pod/ostoy-microservice-86b4c6f559-p594d
```

So the pod name in this case is **ostoy-frontend-679cb85695-5cn7x**.  Then run `oc logs ostoy-frontend-679cb85695-5cn7x` and you should see your messages:

```sh
$ oc logs ostoy-frontend-679cb85695-5cn7x
[...]
ostoy-frontend-679cb85695-5cn7x: server starting on port 8080
Redirecting to /home
stdout: All is well!
stderr: Oh no! Error!
```

You should see both the *stdout* and *stderr* messages.

{% endcollapsible %}

### Monitoring applications with OpenShift

OpenShift offers the capacity to monitor logs and metrics of your applications deployed. 
Logging collections and representations are enabled by the Elastic Search / FluentD / Kibana stack also known as EFK. 
Metrics collections are allowed thanks to Prometheus. Dashboard are provisionned by Graphana and alerts are enabled with AlertManager.
Those monitoring tools are fully integred and set to be consumed easily through the Web console and endpoint exposed.

#### Logging
{% collapsible %}
To view logs emitted by pods, we go on the left panel, under **Workloads**, **Pods**, click on a Pod and we finally click on "Logs" :

![Docker registry connection](/media/lab2/logs.png)

{% endcollapsible %}

#### Metrics 

{% collapsible %}

OpenShift collects metrics (CPU,RAM,Storage and custom metrics) on the pod level with Prometheus. OpenShift relies on it to ensure scalability of OpenShift core services and applications thanks to quota and limits consumptions of CPU and RAM.
An embedded view of metrics is available as following on the Web console :
Under **Workloads**, **Pods**, click on a pod and the default **Overview** displays metrics :

![Docker registry connection](/media/lab2/metrics.png)

We can compute queries through the Web console by clicking on the graph :

![Docker registry connection](/media/lab2/prometheus.png)

We can go to the Prometheus UI through the link in a red rectangle.

Alert Manager, Graphana UI and Prometheus UI are also available on the left panel :

![Docker registry connection](/media/lab2/monitoring.png)

{% endcollapsible %}