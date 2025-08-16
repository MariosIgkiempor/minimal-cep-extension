#!/bin/sh
set -xe

SOURCE_CODE_DIR=$(pwd)/build
PACKAGE_DESTINATION=$(pwd)/dist
EXTENSION_NAME=myextension
ZXP_SIGN_EXECUTABLE=$(pwd)/scripts/zxp-sign-binaries/ZXPSignCmd-64bit

mkdir -p $PACKAGE_DESTINATION
rm -rf $PACKAGE_DESTINATION/$EXTENSION_NAME.zxp

$ZXP_SIGN_EXECUTABLE -selfSignedCert UK LON myextension myextension MockPassword $PACKAGE_DESTINATION/certificate.p12
$ZXP_SIGN_EXECUTABLE -sign $SOURCE_CODE_DIR $PACKAGE_DESTINATION/$EXTENSION_NAME.zxp $PACKAGE_DESTINATION/certificate.p12 MockPassword
