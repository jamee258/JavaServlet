#!/usr/bin/env bash

echo "Compiling and packaging application in war file"
cd ../..
mvn -X clean package war:war