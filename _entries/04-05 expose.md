---
sectionid: expose
sectionclass: h2
title: Expose the application
parent-id: lab-todoapp
---

### Expose the application

Your application is now deployed with two replicas (=instances) and a service (named *cosmos-todo-svc*) has been created which means that **inside** the cluster, your application is accessible through <http://cosmos-todo-svc>, and you will be redirected to any of the replicas, the service acting as a load-balancer.

![Deployed Service](media/lab1/expose1.png)

You would like to access your application from outside your cluster, let's say from Internet. With OpenShift, you need to create a **route** to provision a URL to access your application.

{% collapsible %}

Open the terminal and ensure your are set on your project

```sh
oc project YOUR_PROJECT_NAME
```

Then use the **oc expose** command to create an URL pointing to your service

```sh
oc expose service/cosmos-todo-svc
```

Retrieve the route which has been created

```sh
oc get routes
```

You should see an URL listed

```sh
NAME              HOST/PORT                                                 PATH   SERVICES          PORT   TERMINATION   WILDCARD
cosmos-todo-svc   cosmos-todo-svc-workshop.apps.wyzs8mtl.eastus.aroapp.io          cosmos-todo-svc   8080   
```

Copy and paste this URL inside the browser. You should be able to access it and see your application

![Exposed application](media/lab1/expose.png)

{% endcollapsible %}
