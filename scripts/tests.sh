#!/bin/bash

set -euxo pipefail

nyc --reporter=lcov npm test