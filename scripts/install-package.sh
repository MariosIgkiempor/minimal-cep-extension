#!/bin/sh
set -xe

PLATFORM="$1"

if [ -z "$PLATFORM" ]; then
  echo "❌ Error: No platform provided."
  echo "   Usage: $0 <macos|windows>"
  exit 1
fi

PACKAGE_LOCATION=$(pwd)/dist
PACKAGE_NAME=myextension-${PLATFORM}.zxp
INSTALLER="/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS/UnifiedPluginInstallerAgent"

"$INSTALLER" --remove myextension
"$INSTALLER" --install $PACKAGE_LOCATION/$PACKAGE_NAME
