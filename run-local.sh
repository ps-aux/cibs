#!/usr/bin/env bash
set -e
npm run build
chmod +x lib/cli/bin.js

lib/cli/bin.js "$@"

#lib/cli/bin.js vps app \
# --dir=src/_test/deployment/DeploymentConfig/encrypted \
# --host=firmaren.garwan.io $1 \
# --copyFromRepo='gcr.io/kuar-demo/kuard-amd64'

