#!/usr/bin/env bash
#
# To run a single group of tests:
#   ./run-tests.sh -f test-front.page.js
#
./node_modules/nightwatch/bin/nightwatch $@
