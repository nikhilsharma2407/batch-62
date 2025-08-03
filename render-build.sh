#!/bin/bash

# Install client and build
cd client
npm install
npm run build

# Move build to server
rm -rf ../server/build
mv build ../server/

# Install server deps
cd ../server
npm install
