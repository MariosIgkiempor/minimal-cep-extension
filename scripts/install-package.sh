#!/bin/sh
set -xe

PACKAGE_LOCATION=$(pwd)/dist
PACKAGE_NAME=myextension.zxp
INSTALLER="/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS/UnifiedPluginInstallerAgent"

"$INSTALLER" --remove myextension
"$INSTALLER" --install $PACKAGE_LOCATION/$PACKAGE_NAME