---
sectionid: lab3-intro
sectionclass: h2
title: Scenario context
parent-id: lab-3
---

For this lab, you need to run a container that can pull messages for an Azure Queue.

### Requirements

- It needs to scale based on the number of items in the Azure Queue
- If there's nothing to process, it should scale to zero to save cost
- I need flexibility in how I write my code and the container base image I use
- It needs to manage an Azure Storage connection string
- It's part of a larger microservice architecture

