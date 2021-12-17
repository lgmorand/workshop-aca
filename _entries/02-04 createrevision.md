---
sectionid: lab1-revision
sectionclass: h2
title: Create a revision
parent-id: lab-1
---

A revision is an immutable snapshot of a container app. The first revision is automatically created when you deploy your container app. New revisions will be automatically created when a container app's template configuration changes. Indeed, while revisions are immutable, they're affected by changes to global configuration values, which apply to all revisions.

Revisions are most useful when you enable ingress to make your container app accessible via HTTP. Revisions are often used when you want to direct traffic from one snapshot of your container app to the next. Typical traffic direction strategies include A/B testing and BlueGreen deployment.

The following diagram shows a container app with two revisions.

![Revision App](/media/lab1/revisionpond.png)

Note that changes made to a container app fall under one of two categories: revision-scope and application-scope changes:

- Revision-scope changes are any change that triggers a new revision (e.g Changes to containers, Add or update scaling rules, Changes to Dapr settings...),
- Application-scope changes don't create revisions (e.g Changes to traffic splitting rules, Turning ingress on or off, Changes to secret values...).

### Create your first revision

Let's create and deploy a new version of the Hello World application with a different layout. To do so you will have to deploy a new container within our application, meaning that we're doing a revision-scope change. This new version of our application can be found on docker hub `mavilleg/acarevision-helloworld:acarevision-hellowold`.

Once this new revision is provisionned we will configure an even split of the traffic between the two revision

{% collapsible %}
Go to the revisions management blade on the left inside of the apps panel.
Click on "Create a new revisions"

![Revision soluce](/media/lab1/addrevision.png)

Then click on "Add" in order to pull the new image that will be used to create the new revision.

![Revision soluce](/media/lab1/addrevision1.png)

Finally, you can loadbalance the traffic by modifying the traffic paramater under the Revision management panel.  
{% endcollapsible %}

> Note that new revisions remain active until you deactivate them, or you set your container app to automatically deactivate old revisions.

- Inactive revisions remain as a snapshot record of your container app in a certain state.
- You are not charged for inactive revisions.
- Up to 100 revisions remain available before being purged.

That's how you can configure revision to be able to have A/B testing scenario or blue-green deployment scenario.  
