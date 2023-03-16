#!/usr/bin/env sh

#abort on errors
set -e

#build
npm run build

#navigate into the build output directory
cd dist

#place .nojekll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy backend page - add upload image function'

# if you are deploying to https://lhy131120.github.io
# git push -f git@github.com:lhy131120/lhy131120.github.io.git main

# if you are deploying to https://lhy131120.github.io/vue3-2022-week7
git push -f https://github.com/lhy131120/vue3-2022-week7.git main:gh-pages

cd -