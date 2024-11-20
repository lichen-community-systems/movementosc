#!/bin/sh
mkdir -p dist/release

zip -r dist/release/MovementOSC-$1-win32-x64.zip dist/MovementOSC-win32-x64 -x '*.DS_Store' -x '__MACOSX'

zip -r dist/release/MovementOSC-$1-linux-x64.zip dist/MovementOSC-linux-x64 -x '*.DS_Store' -x '__MACOSX'

mkdir -p dist/release/MovementOSC-$1-darwin-arm64/
mv dist/MovementOSC-darwin-arm64/MovementOSC.app dist/release/MovementOSC-$1-darwin-arm64/

mkdir -p dist/release/MovementOSC-$1-darwin-x64/
mv dist/MovementOSC-darwin-x64/MovementOSC.app dist/release/MovementOSC-$1-darwin-x64/
