#!/usr/bin/env bash
#
# To run a single group of tests:
#   ./run-tests.sh -f test-front.page.js
#
NIGHTWATCH_MOD_BASE=./node_modules/nightwatch;

if [ ! -e  $NIGHTWATCH_MOD_BASE ]
then
  npm install
fi

${NIGHTWATCH_MOD_BASE}/bin/nightwatch $@
