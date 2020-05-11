#!/bin/sh

echo 'copy service worker'
cp build/service-worker.js build/service-worker.js.bak

cd build
PRECACHE_MANIFEST=$(ls precache-manifest*)
cd ../
sed "s/PRECACHE_MANIFEST/$PRECACHE_MANIFEST/" src/serviceWorker/service-worker.js > build/service-worker.js
