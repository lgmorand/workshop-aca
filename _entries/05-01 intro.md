---
sectionid: lab4-intro
sectionclass: h2
title: Scenario context
parent-id: lab-4
---

In this lab, you need to roll out an update of your application.

### Requirements

You need a coordinated with no-down-time upgrade:

- You need to smoke test changes in production before sending live traffic (Blue/green)
- You need to gradually shift traffic to a new version of your application (canary deployment)
- You need to ensure only the latest version of your application is live at any moment in time
