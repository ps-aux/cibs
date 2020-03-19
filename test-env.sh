#!/usr/bin/env bash
export DOCKER_REGISTRY_NAME=yijohor934
export DOCKER_REGISTRY_API_URL=https://index.docker.io/v1/
export DOCKER_REGISTRY_LOGIN_USERNAME=yijohor934
export DOCKER_REGISTRY_LOGIN_PASSWORD=yijohor934@mailezee.com

npx cibs docker build-and-push --build-info-build-arg
