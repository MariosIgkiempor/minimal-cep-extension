#!/bin/sh
set -xe

echo "🗑️ Clearing existing build artifacts..."
rm -rf ./build/
rm -rf ./dist/

echo "Installing dependencies..."
pnpm install --frozen-lockfile

# trap 'kill 0' SIGINT makes Ctrl+C kill the whole subshell
(trap 'kill 0' SIGINT;
    (cd server && pnpm run build) & (cd frontend && pnpm run build)
)

echo "📄 Copying static assets to the build folder"
cp -r ./js ./build/js
cp -r ./jsx ./build/jsx
cp -r ./CSXS ./build/CSXS
cp -r ./images ./build/images
