#!/bin/bash
if [ "$1" == "--zip" ]; then
    zip -r "../$(basename "$PWD").zip" ./
    exit 0
fi
if [ "$1" == "--pull" ]; then
    git stash
    git pull origin main
    git stash pop
fi
if [ "$2" == "--no-start" ];then
    exit 0
fi;
npm i
cd frontend
npm i
cd ..
cd backend
npm i
cd ..
docker-compose up -d
docker-compose up --build
docker-compose down
