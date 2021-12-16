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

Let's create and deploy a second version of the Hello World application with a different layout. 