---
sectionid: contributors
sectionclass: h1
title: Contributors
is-parent: yes
---

The following people (sorted in aphabetical order) have contributed to this workshop, thank you!

<div class="github-contributors">
{% assign contributors = site.github.contributors | sort: "login" %}
{% for contributor in contributors %}
  <div class="github-contributor">
    <img class="github-avatar" alt="Profile picture of {{ contributor.login }}" src="{{ contributor.avatar_url }}"/>
    <span>
      <a href="{{ contributor.html_url }}">@{{ contributor.login }}</a>
    </span>
  </div>
{% endfor %}
</div>

The workshop relies on the great work done by others:

- [https://github.com/azure/reddog-code/](https://github.com/azure/reddog-code/)
- [https://github.com/azure/reddog-containerapps](https://github.com/azure/reddog-containerapps/)
- [https://github.com/zlatko-ms/az-capps-private](https://github.com/zlatko-ms/az-capps-private)

But of course, let's not forget the Product Group who works hard to improve Azure Container Apps day after day.
