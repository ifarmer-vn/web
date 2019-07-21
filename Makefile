down:
	docker-compose down

stop:
	docker-compose stop

up: build
	docker-compose up

build: files
	docker-compose build

files:
	cp environments/docker-compose.dev.yml docker-compose.yml
	cp docker/nodejs/Dockerfile frontend/Dockerfile
