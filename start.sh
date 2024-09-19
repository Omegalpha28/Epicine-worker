#!/bin/bash
if [ "$1" == "--pull" ]; then
    git stash
    git pull origin main
    git stash pop
fi
cd frontend
npm i
cd ..
cd backend
npm i
cd ..
docker-compose down
docker-compose up -d
docker-compose up --build
