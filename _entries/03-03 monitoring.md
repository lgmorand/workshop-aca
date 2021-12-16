---
sectionid: lab2-monitoring
sectionclass: h2
title: Monitor the application
parent-id: lab-2
---

#### Observability

Observability is critical for any application. To ensure that everything is fine but also to detect/anticipate any issue on the platform.

#### Testing the app

We already know that components have been deployed successfully. To check the platform, several visual tests can be done. Start by opening the Reddog frontend UI portal in a browser.

{% collapsible %}

Remember the schema of the reddog platform. The frontend is the `UI` Container App which is exposed internally and thus not reachable outside the cluster. In front on the UI is the Traeffik ingress controller which is the `Reddog` Container App, exposed publically.

To find the URL, in the Azure Container App environment, open the `Reddog` Container App. In the overview tab, you should find the generated FQDN URL.

![Finding the endpoint](/media/lab2/monitor/finding-endpoint.png)

Copy the URL in any browser to discover a nice dynamic dashboard.

![Running application](/media/lab2/monitor/running-app.png)

> Did you notice the delay for the page to be displayed the first time ? It is caused by the fact that the running containers are removed when the platform is not used. You are going to see that in details further in this workshop.

{% endcollapsible %}

##### Get Logs

Metrics are important but it is also important to be able to get the logs of the application to be able to debug or understand any misbehavior.


##### Get Metrics

