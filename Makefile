down:
	docker-compose down

stop:
	docker-compose stop

up: build
	docker-compose up

build: files
	docker-compose build

files:
	cp frontend/src/elasticsearch/credential.prod.json frontend/src/elasticsearch/credential.json
	cp environments/docker-compose.prod.yml docker-compose.yml
	cp docker/nodejs/Dockerfile frontend/Dockerfile
	cp -r docker/config/amppubkeys docker/nginx/config
	cp -r docker/config/cert docker/nginx/config

sitemap:
	cd frontend && node src/sitemap/sitemap.js

dev: files-dev
	cd frontend && npm run dev

files-dev:
	cp frontend/src/elasticsearch/credential.dev.json frontend/src/elasticsearch/credential.json
