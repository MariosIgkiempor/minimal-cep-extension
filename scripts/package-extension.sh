#!/bin/sh
set -xe


PLATFORM="$1"

if [ -z "$PLATFORM" ]; then
  echo "❌ Error: No platform provided."
  echo "   Usage: $0 <macos|windows>"
  exit 1
fi

if [ "$PLATFORM" = "macos" ]; then
  SIGNING_FILE_NAME="ZXPSignCmd-64bit"
elif [ "$PLATFORM" = "windows" ]; then
  SIGNING_FILE_NAME="ZXPSignCmd.exe"
else
  echo "❌ Error: Invalid platform '$PLATFORM'"
  echo "   Valid options: macos or windows"
  exit 1
fi

if [ -z "$PACKAGE_SIGNING_PASSWORD" ]; then
  echo "❌ Error: PACKAGE_SIGNING_PASSWORD environment variable is not set."
  exit 1
fi

# Use Rosetta for Apple Silicon if needed
ARCH=$(uname -m)
if [ "$PLATFORM" = "macos" ] && [ "$ARCH" = "arm64" ]; then
  CMD=(arch -x86_64)
else
  CMD=()
fi


SOURCE_CODE_DIR=$(pwd)/build
PACKAGE_DESTINATION=$(pwd)/dist
EXTENSION_NAME=myextension-${PLATFORM}.zxp
ZXP_SIGN_EXECUTABLE=$(pwd)/scripts/zxp-sign-binaries/${PLATFORM}/${SIGNING_FILE_NAME}


mkdir -p $PACKAGE_DESTINATION
rm -rf $PACKAGE_DESTINATION/$EXTENSION_NAME


"${CMD[@]}" "$ZXP_SIGN_EXECUTABLE" -selfSignedCert UK LON CompanyName Name "$PACKAGE_SIGNING_PASSWORD" "$PACKAGE_DESTINATION/certificate.p12" -validityDays 5000
"${CMD[@]}" "$ZXP_SIGN_EXECUTABLE" -sign "$SOURCE_CODE_DIR" "$PACKAGE_DESTINATION/$EXTENSION_NAME" "$PACKAGE_DESTINATION/certificate.p12" "$PACKAGE_SIGNING_PASSWORD"
