#!/bin/bash

find itsmeucu.github.io -mindepth 1 ! -path "itsmeucu.github.io/.git" ! -path "itsmeucu.github.io/.git/*" ! -path "itsmeucu.github.io/.idea" ! -path "itsmeucu.github.io/.idea/*" -print0 | xargs -0 rm -rf

yarn run build

cd ./itsmeucu.github.io

git add .

git commit -m "Update"

git push -f origin main


# 退出脚本
exit 0
