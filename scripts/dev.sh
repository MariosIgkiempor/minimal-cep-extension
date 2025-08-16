#!/bin/sh
set -xe

EXTENSIONS_FOLDER="/Library/Application Support/Adobe/CEP/extensions"
DEV_SYMLINK_FOLDER="$EXTENSIONS_FOLDER/myextension-dev"
EXTENSION_PACKAGE_FOLDER="$EXTENSIONS_FOLDER/myextension"

cleanup() {
    echo "🗑️ Remove symlink to dev extension and .debug file"
    sudo rm -rf "$DEV_SYMLINK_FOLDER"
    rm ./build/.debug
}

devWatch() {
    pnpm run concurrently \
        "pnpm tsc --watch" \
        "pnpm test:watch" \
        "cd server && pnpm run dev" \
        "cd frontend && pnpm run dev" \
        "tail -f ~/Library/Logs/CSXS/*.log" \
        "sleep 3 && echo \"✅ You can now open Illustrator and run the extension from Windows > Extensions.\""
}

echo "👷 Creating build folder"
mkdir -p ./build

trap cleanup EXIT

read -n 1 -s -r -p "❗ Please close Adobe Illustrator and press any key to continue..."
echo

echo "❌ Removing myextension packaged extension"
sudo rm -rf "$EXTENSION_PACKAGE_FOLDER"
echo

echo "🐛 Copying debug profile to enable localhost debug servers"
cp ./.debug ./build/.debug

echo "🔀 Copying Adobe-specific files to the build folder"
cp -r ./CSXS ./build
cp -r ./jsx ./build
cp -r ./js ./build
cp -r ./images ./build
echo

echo "🔗 Symlinking this repo folder to the Illustrator extension folder so it will be available."
sudo rm -rf "$DEV_SYMLINK_FOLDER"
sudo ln -sf "$(pwd)/build" "$DEV_SYMLINK_FOLDER"
echo


devWatch
