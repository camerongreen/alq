#!/usr/bin/env bash
#
# To run a single group of tests:
#   ./run-tests.sh -f test-front.page.js
#
NIGHTWATCH_MOD_BASE=./node_modules/nightwatch;

# If we don't have nightwatch, means we haven't run npm install, so do it
if [ ! -e  $NIGHTWATCH_MOD_BASE ]
then
  npm install
fi

${NIGHTWATCH_MOD_BASE}/bin/nightwatch "$@"
