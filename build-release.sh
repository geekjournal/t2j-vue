#!/bin/bash

echo "Writing git hash+date to ./public/version.txt..."
# git log -n 1 --pretty="%h (%ad)" > ./public/version.txt
# var="$(git log -n 1 --pretty="%h (%ad)" --date=local)"
var="$(git log -n 1 --pretty="%h")"
date="$(TZ=":America/Chicago" date)"
hash="$var ($date)"
echo "${hash}" > ./public/version.txt
echo "done! ${hash}"

# sed is different from mac and linux, so not using this method anymore
# sed -i '' "s/appGitVersion:\s*.*[^,]/appGitVersion: '${var}'/g" ./src/App.vue

npm run build

# now set redirects for Netlify
echo "Copying _redirects to /dist..."
cp ./src/assets/_redirects ./dist/_redirects
echo "done!"

# copy assets into Capcitor projects, such as Android and ios
npx cap copy