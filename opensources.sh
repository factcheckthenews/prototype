#!/usr/bin/env bash

# Fetch the latest from our fork of opensources
# We'll sync the fork from upstream to push out new data
curl --silent -o data/opensources.json https://raw.githubusercontent.com/factcheckthenews/opensources/master/sources/sources.json
