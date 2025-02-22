#!/bin/bash

find  -mindepth 1 ! -path "itsmeucu.github.io/.git" ! -path "itsmeucu.github.io/.git/*" ! -path "itsmeucu.github.io/.idea" ! -path "itsmeucu.github.io/.idea/*" -print0 | xargs -0 rm -rf

yarn run build

python sitemap.py

cd ./itsmeucu.github.io

git init

git remote add origin git@github.com:itsmeucu/itsmeucu.github.io.git

git add .

git commit -m "Initial commit"

git push -u --force origin main



# 退出脚本
exit 0
