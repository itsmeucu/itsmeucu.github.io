#!/bin/bash

find itsmeucu.github.io -mindepth 1 ! -path "itsmeucu.github.io/.git" ! -path "itsmeucu.github.io/.git/*" ! -path "itsmeucu.github.io/.idea" ! -path "itsmeucu.github.io/.idea/*" -print0 | xargs -0 rm -rf

yarn run build

python sitemap.py

cd ./itsmeucu.github.io

git add .

git commit -m "update"

git remote set-url origin git@github.com:itsmeucu/itsmeucu.github.io.git

git push -f origin main


# 退出脚本
exit 0
