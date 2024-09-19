#!/bin/bash
cd frontend
npm i
cd ..
cd backend
npm i
cd ..
docker-compose down
docker-compose up -d
docker-compose up --build
