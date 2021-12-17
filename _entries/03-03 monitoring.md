---
sectionid: lab2-monitoring
sectionclass: h2
title: Monitor the platform
parent-id: lab-2
---

#### Observability

Observability is critical for any application. To ensure that everything is fine but also to detect/anticipate any issue on the platform, you should be able to see from one place, whatever happens on your solution.

#### Testing the app

We already know that components have been deployed successfully but are they fully working ? To check the platform, several visual tests can be done. Start by opening the Reddog frontend `UI` portal in a browser.

{% collapsible %}

Remember the architecture schema of the Reddog platform. The frontend is the `UI` Container App which is exposed **internally** and thus not reachable outside the (managed) kubernetes cluster. In front on the `UI` is the `Traeffik` ingress controller which is the `Reddog` Container App, exposed publically (Internet).

To find the URL of the portal, in the Azure Container App environment, open the `Reddog` Container App. In the overview tab, you should find the generated FQDN URL.

![Finding the endpoint](/media/lab2/monitor/finding-endpoint.png)

Copy the URL in any browser to discover a nice dynamic dashboard :

![Running application](/media/lab2/monitor/running-app.png)

> Did you notice the delay for the page to be displayed the first time ? It is caused by the fact that the running containers are removed when the platform is not used. You are going to see that in details further in this workshop.

{% endcollapsible %}

##### Get Logs

Metrics are important but it is also important to be able to get the logs of the application to be able to debug or understand any misbehavior.

In Azure Container Apps, logging agents are able to capture all stdout/stderror messages sent by containers. Then the messages are pushed to Azure Log Analytics, allowing you to have in one place, without any specific tooling, all logging in one place.

Try to retrieve the logs on the `UI` container. You can do it using command line or through the portal

{% collapsible %}

On the Azure Portal, open Logs Analytics. You can use the left part of the screen to see the tables and columns and build a query using Kusto language.

The query to get the logs of the `UI` container is :

``` bash
ContainerAppConsoleLogs_CL 
| where ContainerAppName_s == 'ui'
```

![Get Logs using CLI](/media/lab2/monitor/logs-ui.png)

The second way of doing it is to use the command line and the Azure CLI. (it may ask you to install a CLI extension first).

``` bash
az monitor log-analytics query \
  --workspace <LOG_ANALYTICS_WORKSPACE_CLIENT_ID> \
  --analytics-query "ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'ui' | project ContainerAppName_s, Log_s, TimeGenerated | take 3" \
  --out table
```

Here, the query is more complex to select the columns to diplay and the number of lines we want to return.

![Get Logs using CLI](/media/lab2/monitor/logs-cli.png)

{% endcollapsible %}

That's it. No need to install specific monitoring tool (i.e. Prometheus) nor need to connect interactively to your container to retrieve its logs.

##### Get Metrics

Application Insights, a feature of Azure Monitor, is an extensible Application Performance Management (APM) service for developers and DevOps professionals. Use it to monitor your live applications. It will automatically detect performance anomalies, and includes powerful analytics tools to help you diagnose issues and to understand what users actually do with your app.

Lucky for us, Application Insights has been automatically deployed and uses the metrics/logs stored automatically in Log Analytics by Azure Container Apps. As you can see if you dig a little big, Application Insights can help to see metrics, erros, users flow and so much more.

Start by opening Application Insights and watch main metrics of the platform.

{% collapsible %}

In the resource group, look for the Application Insights resource. Once you open it, you can see main metrics such as failures (should be empty), the average response time and the requests per second.

![Overview metrics](/media/lab2/monitor/overview-metrics.png)

If you click on one chart (i.e. response time), you'd be brought to performance tab where you can see specific metrics for each micro-service.

![Detailed performance](/media/lab2/monitor/performance.png)

{% endcollapsible %}

Another way to get the health of your platform is to use the "magic map" feature of Application Insights to get an overview of the whole platform. Find and analyze the application's map.

{% collapsible %}

On the left part, open the `Application Map` menu. From the logs only, it is capable of drawing a map of your microservices platform, showing interactions between components, average performance and even failure rates when error happen.

![App Insights - application map](/media/lab2/monitor/logs-app-insights-maps.png)

{% endcollapsible %}

Use the map to quickly get the logs of a specific micro-service, for instance, the receipts generator service:

{% collapsible %}
On the map, click on one micro-services, then in the side panel which opens, click on "View logs".

![App Insights - get logs](/media/lab2/monitor/logs-app-insights-logs-app.png)

It should open Logs analytics and automatically generate for you the query which was used to draw this micro-services on the map.

![Display specific logs](/media/lab2/monitor/service-logs.png)

{% endcollapsible %}

It's just the overview of observability but it shows how well integrated monitoring is within Azure Container Apps.
