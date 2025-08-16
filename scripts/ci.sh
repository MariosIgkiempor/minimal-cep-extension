#!/bin/sh
set -xe

pnpm install --frozen-lockfile

# source: https://biomejs.dev/reference/cli/#biome-ci
pnpm biome ci .

echo "🔧 Running tsc in server and frontend"
pnpm tsc

echo "🐛 Running unit tests"
pnpm test
 