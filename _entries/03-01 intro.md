---
sectionid: lab2-intro
sectionclass: h2
title: Scenario context
parent-id: lab-2
---

This first lab will guide you to install a demo application very quickly and manipulate some components of an OpenShift application

### Resources

- The source code for this app is available here: <https://github.com/openshift-cs/ostoy>
- OSToy front-end container image: <https://quay.io/aroworkshop/ostoy-frontend>
- OSToy microservice container image: <https://quay.io/aroworkshop/ostoy-microservice>
- Deployment Definition YAMLs:
  - [ostoy-fe-deployment.yaml](/yaml/ostoy-fe-deployment.yaml)
  - [ostoy-microservice-deployment.yaml](/yaml/ostoy-microservice-deployment.yaml)

> **Note** In order to simplify the deployment of the app (which you will do next) we have included all the objects needed in the above YAMLs as "all-in-one" YAMLs.  In reality though, an enterprise would most likely want to have a different yaml file for each Kubernetes object.
