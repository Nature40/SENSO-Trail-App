#!/bin/bash
echo "$PUBLIC_URL"

SOURCE_URL=""

if [ -n "$PUBLIC_URL" ]
  then SOURCE_URL=${PUBLIC_URL//\//\\\/}
  else SOURCE_URL='\/SENSO-Trail-App\/'
fi

SOURCE_URL+="assets\/map"
echo "$SOURCE_URL"
sed -i "s/\/assets\/map/$SOURCE_URL/" build/assets/map/index.html 
