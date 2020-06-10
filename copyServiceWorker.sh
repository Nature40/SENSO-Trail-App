#!/bin/sh

echo 'COPY SERVICE WORKER'
cp build/service-worker.js build/service-worker.js.bak
echo 'DONE'

echo 'REPLACE MANIFEST BLANK'
cd build
PRECACHE_MANIFEST=$(ls precache-manifest*)
cd ../
sed "s/PRECACHE_MANIFEST/$PRECACHE_MANIFEST/" src/serviceWorker/service-worker.js > build/service-worker.js
echo 'DONE'
