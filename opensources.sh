#!/usr/bin/env bash

# Fetch the latest from our fork of opensources
# We'll sync the fork from upstream to push out new data
curl --silent -o data/credible.json https://raw.githubusercontent.com/factcheckthenews/opensources/master/credible/credible.json
curl --silent -o data/notCredible.json https://raw.githubusercontent.com/factcheckthenews/opensources/master/notCredible/notCredible.json