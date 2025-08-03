#!/bin/bash

# Install client and build
cd client
npm install
npm run build

# Move build to server
echo "Removing current build";
rm -rf ../server/build
echo "Moving build from client to server";
mv build ../server/

# Install server deps
echo "installing server dependecies";
cd ../server
npm install
