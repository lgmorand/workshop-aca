---
sectionid: createproject
sectionclass: h2
title: Create Project
parent-id: lab-todoapp
---

### Login to the web console

{% collapsible %}

Each Azure Red Hat OpenShift cluster has a public hostname that hosts the OpenShift Web Console.

You can use command `az aro list` to list the clusters in your current Azure subscription.

```sh
az aro list -o table
```

> The command may not return anything if you were provided an existing cluster which is not in a subscription you have access to

Retrieve your cluster specific hostname. Replace `<cluster name>` and `<resource group>` by those specific to your environment.

```sh
az aro show -n <cluster name> -g <resource group> --query "consoleProfile" -o tsv
```

You should get back something like `console-openshift-console.apps.rt80g8x5.eastus.aroapp.io`. Add `https://` to the beginning of that hostname and open that link in your browser. You'll be asked to login with Azure Active Directory. If your cluster was not linked to AAD, you can retrieve the default credentials (Admin) by following [this procedure](https://docs.microsoft.com/en-us/azure/openshift/tutorial-connect-cluster)

After logging in, you should be able to see the Azure Red Hat OpenShift Web Console.

![Azure Red Hat OpenShift Web Console](media/lab1/openshift-webconsole.png)

{% endcollapsible %}

### Retrieve the login command and token

You are now connected to the OpenShift portal but we now need to find a way to be connected through the command line

{% collapsible %}

> **Note** Make sure you complete the [prerequisites](#prereq) to install the OpenShift CLI on the Azure Cloud Shell.

Once you're logged into the Web Console, click on the username on the top right, then click **Copy login command**.

![Copy login command](media/lab1/login-command.png)


Open the [Azure Cloud Shell](https://shell.azure.com) and paste the login command. You should be able to connect to the cluster.

![Login through the cloud shell](media/lab1/oc-login-cloudshell.png)

> the token you just used is a session token and is valid for 24 hours only. After that, you'll have to reconnect

{% endcollapsible %}

### Create a project

A project allows a community of users to organize and manage their content in isolation from other communities.

{% collapsible %}

It also automatically create a "namespace" and access rights around it. You can create a project with the Web portal or with the **oc new-project** command

```sh
oc new-project <PROJECT_NAME>
```

![Create new project](media/lab1/oc-newproject.png)

> You can also check in the OpenShift Web Portal that your newly created project is displayed.

{% endcollapsible %}

> **Resources**
> * [ARO Documentation - Access your services](https://docs.openshift.com/aro/getting_started/access_your_services.html)
> * [ARO Documentation - Getting started with the CLI](https://docs.openshift.com/aro/cli_reference/get_started_cli.html)
> * [ARO Documentation - Projects](https://docs.openshift.com/aro/dev_guide/projects.html)
