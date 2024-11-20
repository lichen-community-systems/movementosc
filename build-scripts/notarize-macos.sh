#!/bin/sh

mkdir -p dist/notarization

# Zip up the application for the notarization server.
echo "Preparing application for notarization..."
ditto -c -k --keepParent dist/$1/MovementOSC.app dist/notarization/$2

# Submit it for notarization.
echo "Submitting application for notarization..."
xcrun notarytool submit dist/notarization/$2 --keychain-profile "$APPLE_NOTARIZATION_KEYCHAIN_PROFILE" --wait && xcrun stapler staple dist/$1/MovementOSC.app && xcrun stapler validate dist/$1/MovementOSC.app
