---
sectionid: lab1-create
sectionclass: h2
title: Create a revision
parent-id: lab-1
---




A revision is an immutable snapshot of a container app. The first revision is automatically created when you deploy your container app. New revisions will be automatically created when a container app's template configuration changes. Indeed, while revisions are immutable, they're affected by changes to global configuration values, which apply to all revisions.

Revisions are most useful when you enable ingress to make your container app accessible via HTTP. Revisions are often used when you want to direct traffic from one snapshot of your container app to the next. Typical traffic direction strategies include A/B testing and BlueGreen deployment.

The following diagram shows a container app with two revisions.

![Revision App](/media/lab1/revisionpond.png)


### Create your first revision

Let's create and deploy a second version of the Hello World application with a different layout and split traffic between the two revisions. The first revision will be the one already created in the first steps. The second one will have to be pulled from `mcr.microsoft.com/azuredocs/aci-helloworld:latest`. 

The scenario here above presumes the container app is in following state:
- Ingress is enabled, which makes the container app available via HTTP.
- The first revision is deployed as Revision 1.
- After the container was updated, a new revision was activated as Revision 2.
- Traffic splitting rules are configured so that Revision 1 receives 50% of the requests, while Revision 2 receives the remaining 50%.

{% collapsible %}
Go to the revisions management blade on the left inside of the apps panel. 
Click on "Create a new revisions" 

![Revision soluce](/media/lab1/addrevision.png)

Then click on "Add" in order to pull the new image that will be used to create the new revision. 

![Revision soluce](/media/lab1/addrevision1.png)
{% endcollapsible %}

Now that you have two differents revision running you can configure the traffic splitting rules and test that you have both application running under the same endpoint. 

Note that new revisions remain active until you deactivate them, or you set your container app to automatically deactivate old revisions.
- Inactive revisions remain as a snapshot record of your container app in a certain state.
- You are not charged for inactive revisions.
- Up to 100 revisions remain available before being purged.
