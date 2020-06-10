#!/bin/bash

search_dir=assets/map

if [ -z "$NATURE40_MAP_CACHE_REVISION" ]; then
  rev=null
else 
  rev=$NATURE40_MAP_CACHE_REVISION
fi

print_files_rec () {
  local dir=$1
  for entry in $dir/*
  do
    if [ -d $entry ]; then
      # echo "$entry/"
      if [ "$(ls -A $entry)" ]; then
        print_files_rec "$entry"
      fi
    else
      echo $'\t'{
      echo $'\t\t'revision: $rev,
      echo $'\t\t'url: \"$entry\"
      echo $'\t'},
    fi
  done
}

out_file='build/map-precache-manifest.js'

echo "BUILD MAP CACHE MANIFEST"
cd public
echo "self.__precacheManifest = (self.__precacheManifest || []).concat([" > ../$out_file
print_files_rec $search_dir >> ../$out_file
echo "])" >> ../$out_file
echo "DONE"
cd ../
