DOCKER=docker

.PHONY: install build

install:
	bundle install

upgrade:
	gem update --system

build:
	jekyll build

serve:
	$(DOCKER) run --rm \
		--volume="$(shell pwd):/srv/jekyll:Z" \
		--publish [::1]:4000:4000 \
		jekyll/jekyll \
		jekyll serve
