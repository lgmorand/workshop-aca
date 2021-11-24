---
sectionid: todoscaling
sectionclass: h2
title: Scaling the application
parent-id: lab-todoapp
---

### Scale the application

You are expecting a lot of users connecting to your application and to handle the load, you want to scale the number of instances to 5.

{% collapsible %}

Open the terminal and use the **oc scale** command

```sh
oc scale deployment/cosmos-todo --replicas=5
```

Now check that new pods have been created. They are all automatically "registered" and usable by the service *cosmos-todo-svc*

```sh
kubectl get pods -n YOUR-PROJECT-NAMESPACE
```

You should see your five pods, deployed, configured and perfectly running

```sh
XXXXX:~$ kubectl get pods -n workshop
NAME                           READY   STATUS    RESTARTS   AGE
cosmos-todo-5fb4888fcb-8kz5b   1/1     Running   0          12s
cosmos-todo-5fb4888fcb-bpwqv   1/1     Running   0          28m
cosmos-todo-5fb4888fcb-df7fn   1/1     Running   0          12s
cosmos-todo-5fb4888fcb-rnzg2   1/1     Running   0          28m
cosmos-todo-5fb4888fcb-vtf4s   1/1     Running   0          12s
```

{% endcollapsible %}

That's it for the first part. You learnt to build a container image, to publish the image, to create a full CI/CD pipeline, implementing Infrastructure as Code to create resources, deployed your application, scaled it and make it accessible from Internet. Not bad, isn't it ?

Let's move to the second lab to go deeper in some concepts.
