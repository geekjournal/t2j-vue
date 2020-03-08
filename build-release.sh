#!/bin/bash

# source local variables if we have them defined
echo "🎾 Sourcing .env file if found ..."
. .env
echo "🎾 Sourcing .env.local file if found ..."
. .env.local

echo "🎾 Writing git hash+date to ./public/version.txt..."
# git log -n 1 --pretty="%h (%ad)" > ./public/version.txt
# var="$(git log -n 1 --pretty="%h (%ad)" --date=local)"
var="$(git log -n 1 --pretty="%h")"
date="$(TZ=":America/Chicago" date)"
hash="$var ($date)"
echo "🎾 ${hash}" > ./public/version.txt
echo "🎾 done! ${hash}"

########################
# Build website
########################

echo "🎾 Building website ..."
cd ./website-vuepress
echo "🎾 PWD: "
pwd

if [ ! -d "./node_modules" ]
then
    echo "  🎾 Running npm install for vuepress-website..."
    npm install
    echo "  🎾 Done!"
fi

npm run build
cd ..
# see https://askubuntu.com/questions/86822/how-can-i-copy-the-contents-of-a-folder-to-another-folder-in-a-different-directo
echo "🎾 Done! Website built to ./website-vuepress/src/.vuepress/dist/"


########################
# Build Tournament Web App
########################

# sed is different from mac and linux, so not using this method anymore
# sed -i '' "s/appGitVersion:\s*.*[^,]/appGitVersion: '${var}'/g" ./src/App.vue
echo "🎾 Building tournament app ..."
echo "🎾 PWD: "
pwd
npm run build
echo "🎾 Done! Tournament app finished building."

########################
# Copy website into root deployment folder
########################

echo "🎾 Copying vuepress website into tournament website folder ..."
echo "🎾 PWD: "
pwd
cp -a ./website-vuepress/src/.vuepress/dist/. ./dist/
# see https://askubuntu.com/questions/86822/how-can-i-copy-the-contents-of-a-folder-to-another-folder-in-a-different-directo
echo "🎾 Done! Website deployed to ./dist/"

########################
# Setup Netlify redirects
########################

# now set redirects for Netlify
echo "🎾 Copying _redirects to /dist..."
cp ./src/assets/_redirects ./dist/_redirects
echo "🎾 done!"

# Move website info to root of dist folder
# echo "Copying website contents into dist..."
# cp ./website-vuepress/* ./dist/
# echo "done!"

